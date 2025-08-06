# Bug Tuzatishlari

## 1. Backend Bug Fixes

### Authentication Guard Bug Fix
```typescript
// api/src/common/auth/roles/roles.guard.ts
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      const request = context.switchToHttp().getRequest();
      let bearerToken = request.headers['authorization'];

      if (!bearerToken) {
        HttpError({ code: 'BEARER_TOKEN_NOT_PROVIDED' });
      }

      bearerToken = bearerToken.split(' ')[1];
      const validUser: any = verify(bearerToken, env.ACCESS_TOKEN_SECRET);
      
      if (!validUser) HttpError({ code: 'LOGIN_FAILED' });

      // Token version check
      const storedTokenVersion = getTokenVersion(validUser.id);
      if (validUser.tokenVersion !== storedTokenVersion) {
        HttpError({ code: 'TOKEN_INVALIDATED', statusCode: 401 });
      }

      request.user = {
        ...validUser,
        refreshTokenVersion: getRefreshTokenVersion(validUser.id),
      };

      // BUG FIX: Agar role talab qilinmasa, authentication yetarli
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      // Role check
      return requiredRoles.some(role => role === validUser.role);
    } catch (error) {
      if (error.message === 'jwt expired') {
        HttpError({ code: 'JWT_EXPIRED', statusCode: 401 });
      }
      if (error instanceof JsonWebTokenError) {
        HttpError({ code: 'JWT_INVALID', statusCode: 401 });
      }
      throw error;
    }
  }
}
```

### Error Handling Improvement
```typescript
// api/src/common/filters/all-exceptions.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string' 
        ? exceptionResponse 
        : (exceptionResponse as any).message || message;
    }

    // Log error for debugging
    console.error('Exception caught:', {
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      status,
      message,
      stack: exception instanceof Error ? exception.stack : undefined,
    });

    response.status(status).json({
      success: false,
      data: null,
      error: message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### Database Transaction Fix
```typescript
// api/src/modules/arrived/arrived.service.ts
async create(createArrivedDto: CreateArrivedDto, creatorId: number) {
  const { date, waybillNumber, supplierId, description, products } = createArrivedDto;

  // BUG FIX: Transaction ishlatish
  return await this.prisma.$transaction(async (prisma) => {
    // Supplier check
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    if (!existingSupplier) {
      throw new HttpError({
        message: `Supplier with ID ${supplierId} not found`,
      });
    }

    // Code generation
    const maxCode = await prisma.arrived.findFirst({
      where: {
        created: {
          gte: new Date(new Date().getFullYear(), 0, 1),
          lt: new Date(new Date().getFullYear() + 1, 0, 1),
        },
      },
      orderBy: { codeId: 'desc' },
    });

    const codeId = (maxCode?.codeId || 0) + 1;

    // Create arrived
    const arrived = await prisma.arrived.create({
      data: {
        date,
        code: `${new Date().getFullYear()}-${codeId.toString().padStart(4, '0')}`,
        codeId,
        waybillNumber,
        supplierId,
        description,
        registerId: creatorId,
        modifyId: creatorId,
      },
    });

    // Create products and calculate total
    let totalPrice = 0;
    for (const product of products) {
      // Product existence check
      const existingProduct = await prisma.product.findUnique({
        where: { id: product.productId },
      });

      if (!existingProduct) {
        throw new HttpError({
          message: `Product with ID ${product.productId} not found`,
        });
      }

      const arrivedProduct = await prisma.arrivedProduct.create({
        data: {
          arrivedId: arrived.id,
          productId: product.productId,
          count: product.count,
          price: product.price,
          priceCount: product.price * product.count,
        },
      });

      totalPrice += arrivedProduct.priceCount;

      // Update product counts
      await prisma.product.update({
        where: { id: product.productId },
        data: {
          countArrived: {
            increment: product.count,
          },
          countReminder: {
            increment: product.count,
          },
        },
      });
    }

    // Update arrived with total price
    return await prisma.arrived.update({
      where: { id: arrived.id },
      data: { price: totalPrice },
      include: { 
        ArrivedProduct: { 
          include: { Product: true } 
        } 
      },
    });
  });
}
```

### Validation Enhancement
```typescript
// api/src/modules/client/dto/create-client.dto.ts
import { IsPhoneNumber, IsEmail, Length, Matches } from 'class-validator';

export class CreateClientDto {
  @IsName()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  name: string;

  @IsName()
  @Matches(/^\d{9}$/, { message: 'INN must be exactly 9 digits' })
  inn: string;

  @IsName(false)
  @Length(0, 500, { message: 'Description cannot exceed 500 characters' })
  description?: string;

  @IsName(false)
  @Length(0, 200, { message: 'Address cannot exceed 200 characters' })
  address?: string;

  @IsId(false)
  regionId?: number;

  @IsId(false)
  districtId?: number;

  @ApiPropertyOptional({ example: '+998901234567' })
  @IsOptional()
  @IsPhoneNumber('UZ', { message: 'Invalid Uzbekistan phone number format' })
  phone?: string;

  @IsId(false)
  typeId?: number;
}
```

## 2. Frontend Bug Fixes

### Token Refresh Infinite Loop Fix
```typescript
// frontend/src/config/api.ts
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  
  failedQueue = [];
};

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;
    const errorData = error.response?.data as any;
    const errorMessage = errorData?.message || errorData?.error;

    const tokenErrors = ["JWT_EXPIRED", "Unauthorized", "TOKEN_INVALIDATED"];
    const isTokenError = status === 401 && tokenErrors.includes(errorMessage);

    if (isTokenError && !originalRequest._retry) {
      if (isRefreshing) {
        // BUG FIX: Queue requests while refreshing
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosPrivate(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const res = await api.post("/user/refresh", { refreshToken });
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          TokenManager.setAccessToken(newAccessToken);
          processQueue(null, newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        TokenManager.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);
```

### Memory Leak Fix
```typescript
// frontend/src/hooks/useCleanup.ts
import { useEffect, useRef } from 'react';

export const useCleanup = () => {
  const cleanupFunctions = useRef<Array<() => void>>([]);

  const addCleanup = (fn: () => void) => {
    cleanupFunctions.current.push(fn);
  };

  useEffect(() => {
    return () => {
      cleanupFunctions.current.forEach(fn => fn());
      cleanupFunctions.current = [];
    };
  }, []);

  return addCleanup;
};

// Component da ishlatish
const MyComponent = () => {
  const addCleanup = useCleanup();

  useEffect(() => {
    const subscription = someObservable.subscribe();
    addCleanup(() => subscription.unsubscribe());

    const timer = setInterval(() => {}, 1000);
    addCleanup(() => clearInterval(timer));
  }, []);

  return <div>Component content</div>;
};
```

### Form Validation Enhancement
```typescript
// frontend/src/utils/validation.ts
export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+998[0-9]{9}$/;
  return phoneRegex.test(phone);
};

export const validateINN = (inn: string): boolean => {
  const innRegex = /^\d{9}$/;
  return innRegex.test(inn);
};

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
};

// Form component da ishlatish
const ClientForm = () => {
  const [form] = Form.useForm();

  const validatePhoneNumber = (_: any, value: string) => {
    if (value && !validatePhone(value)) {
      return Promise.reject(new Error('Invalid phone number format'));
    }
    return Promise.resolve();
  };

  return (
    <Form form={form}>
      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          { validator: validatePhoneNumber }
        ]}
      >
        <Input placeholder="+998901234567" />
      </Form.Item>
    </Form>
  );
};
```

### Loading State Management
```typescript
// frontend/src/hooks/useLoadingState.ts
import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean;
}

export const useLoadingState = () => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

  const setLoading = useCallback((key: string, loading: boolean) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: loading
    }));
  }, []);

  const isLoading = useCallback((key: string) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const isAnyLoading = useCallback(() => {
    return Object.values(loadingStates).some(loading => loading);
  }, [loadingStates]);

  return { setLoading, isLoading, isAnyLoading };
};

// Component da ishlatish
const MyComponent = () => {
  const { setLoading, isLoading } = useLoadingState();

  const handleSubmit = async () => {
    setLoading('submit', true);
    try {
      await submitData();
    } finally {
      setLoading('submit', false);
    }
  };

  return (
    <Button 
      loading={isLoading('submit')} 
      onClick={handleSubmit}
    >
      Submit
    </Button>
  );
};
```

## 3. Database Performance Fixes

### Query Optimization
```typescript
// api/src/modules/client/client.service.ts
async findAll(dto: FindAllClientQueryDto) {
  const { limit = 10, page = 1, name, districtId, regionId } = dto;

  // BUG FIX: Efficient query building
  const where: Prisma.ClientWhereInput = {
    isDeleted: false,
  };

  // Build where conditions efficiently
  if (name?.trim()) {
    where.name = { contains: name.trim(), mode: 'insensitive' };
  }

  if (districtId) {
    where.districtId = districtId;
  }

  if (regionId) {
    where.regionId = regionId;
  }

  // BUG FIX: Use select to limit returned fields
  const [data, total] = await this.prisma.$transaction([
    this.prisma.client.findMany({
      where,
      select: {
        id: true,
        name: true,
        inn: true,
        phone: true,
        address: true,
        description: true,
        typeId: true,
        districtId: true,
        regionId: true,
        createdAt: true,
        // Don't select sensitive fields
      },
      skip: (page - 1) * limit,
      take: Math.min(limit, 100), // Prevent large queries
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.client.count({ where }),
  ]);

  return { total, page, limit, data };
}
```

### Index Optimization
```sql
-- Database indexes for better performance
CREATE INDEX CONCURRENTLY idx_client_name ON client USING gin(to_tsvector('english', name));
CREATE INDEX CONCURRENTLY idx_client_phone ON client(phone) WHERE phone IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_client_created_at ON client(created_at DESC);
CREATE INDEX CONCURRENTLY idx_client_deleted ON client(is_deleted) WHERE is_deleted = false;

CREATE INDEX CONCURRENTLY idx_product_name ON product USING gin(to_tsvector('english', name));
CREATE INDEX CONCURRENTLY idx_product_barcode ON product(barcode) WHERE barcode IS NOT NULL;
CREATE INDEX CONCURRENTLY idx_product_group ON product(group_id);

CREATE INDEX CONCURRENTLY idx_arrived_date ON arrived(date DESC);
CREATE INDEX CONCURRENTLY idx_arrived_supplier ON arrived(supplier_id);
```

Bu tuzatishlar loyihangizni yanada barqaror va xavfsiz qiladi.