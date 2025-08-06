# Xavfsizlik Tuzatishlari

## 1. Backend Xavfsizlik Tuzatishlari

### Authentication Guard Tuzatish
```typescript
// api/src/common/auth/roles/roles.guard.ts
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

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

      const storedTokenVersion = getTokenVersion(validUser.id);
      const storedRefreshTokenVersion = getRefreshTokenVersion(validUser.id);

      if (validUser.tokenVersion !== storedTokenVersion) {
        HttpError({ code: 'TOKEN_INVALIDATED', statusCode: 401 });
      }

      request.user = {
        ...validUser,
        refreshTokenVersion: storedRefreshTokenVersion,
      };

      // TUZATISH: Agar role talab qilinmasa, faqat authentication tekshir
      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      // Role tekshirish
      return requiredRoles.includes(validUser.role);
    } catch (error) {
      if (error.message == 'jwt expired')
        HttpError({ code: 'JWT_EXPIRED', statusCode: 401 });
      if (error instanceof JsonWebTokenError)
        HttpError({ code: 'JWT_INVALID', statusCode: 401 });
      throw error;
    }
  }
}
```

### Rate Limiting Qo'shish
```typescript
// api/src/main.ts
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// app.module.ts da qo'shish
ThrottlerModule.forRoot({
  ttl: 60,
  limit: 10,
}),

// Global guard sifatida qo'shish
{
  provide: APP_GUARD,
  useClass: ThrottlerGuard,
},
```

### Security Headers Qo'shish
```typescript
// api/src/main.ts
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    }
  }));

  // CORS sozlamalari
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
}
```

### Input Validation Kuchaytirish
```typescript
// api/src/common/pipes/validation.pipe.ts
import { ValidationPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty } from 'class-validator';

export class SanitizeHtml {
  static transform = Transform(({ value }) => {
    if (typeof value === 'string') {
      // HTML taglarni olib tashlash
      return value.replace(/<[^>]*>/g, '');
    }
    return value;
  });
}

// DTO'larda ishlatish
export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  @SanitizeHtml.transform
  name: string;
}
```

## 2. Frontend Xavfsizlik Tuzatishlari

### Token Refresh Logic Tuzatish
```typescript
// frontend/src/config/api.ts
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;
    const status = error.response?.status;
    const errorData = error.response?.data as any;
    const errorMessage = errorData?.message || errorData?.error;

    const tokenErrors = ["JWT_EXPIRED", "Unauthorized", "TOKEN_INVALIDATED"];
    const isTokenError = status === 401 && tokenErrors.includes(errorMessage);

    // Infinite loop oldini olish
    if (isTokenError && !originalRequest._retry && !originalRequest.url?.includes('/refresh')) {
      originalRequest._retry = true;

      try {
        const refreshToken = TokenManager.getRefreshToken();
        if (!refreshToken) {
          throw new Error('No refresh token');
        }

        const res = await api.post("/user/refresh", { refreshToken });
        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          TokenManager.setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosPrivate(originalRequest);
        }
      } catch (refreshError) {
        TokenManager.clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    if (isTokenError && originalRequest._retry) {
      TokenManager.clearTokens();
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
```

### Input Sanitization
```typescript
// frontend/src/utils/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, { ALLOWED_TAGS: [] });
};

export const sanitizeHtml = (html: string): string => {
  return DOMPurify.sanitize(html);
};

// Form componentlarida ishlatish
const handleInputChange = (value: string) => {
  const sanitizedValue = sanitizeInput(value);
  setValue(sanitizedValue);
};
```

### Error Boundary Qo'shish
```typescript
// frontend/src/components/ErrorBoundary.tsx
import React from 'react';
import { Result, Button } from 'antd';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Result
          status="500"
          title="500"
          subTitle="Kechirasiz, nimadir xato ketdi."
          extra={
            <Button type="primary" onClick={() => window.location.reload()}>
              Sahifani yangilash
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
```

## 3. Database Xavfsizlik

### Connection Security
```typescript
// api/prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // SSL connection
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL")
}

// .env
DATABASE_URL="postgresql://user:password@localhost:5432/db?sslmode=require"
```

### Query Optimization
```typescript
// api/src/modules/client/client.service.ts
async findAll(dto: FindAllClientQueryDto) {
  const { limit = 10, page = 1, name } = dto;

  // SQL Injection himoyasi
  const where: Prisma.ClientWhereInput = {
    isDeleted: false,
  };

  if (name?.trim()) {
    // Parametrized query ishlatish
    where.name = { 
      contains: name.trim().replace(/[%_]/g, '\\$&'), // Escape special chars
      mode: 'insensitive' 
    };
  }

  // Transaction ishlatish
  const [data, total] = await this.prisma.$transaction([
    this.prisma.client.findMany({
      where,
      skip: (page - 1) * limit,
      take: Math.min(limit, 100), // Limit cheklash
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.client.count({ where }),
  ]);

  return { total, page, limit, data };
}
```

## 4. Environment Variables Xavfsizligi

### Backend .env
```env
# api/.env
NODE_ENV=production
PORT=3000

# Strong secrets
ACCESS_TOKEN_SECRET=your-very-strong-secret-key-here-min-32-chars
REFRESH_TOKEN_SECRET=another-very-strong-secret-key-here-min-32-chars
PASSPHRASE=encryption-passphrase-min-32-chars

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db?sslmode=require

# CORS
FRONTEND_URL=https://yourdomain.com
```

### Frontend .env
```env
# frontend/.env
VITE_API_URL=https://api.yourdomain.com/api
VITE_APP_NAME=CRM System
```

## 5. Qo'shimcha Xavfsizlik Choralari

### API Rate Limiting
```typescript
// api/src/decorators/throttle.decorator.ts
import { Throttle } from '@nestjs/throttler';

// Login endpoint uchun
@Throttle(5, 60) // 5 requests per minute
@Post('login')
async login(@Body() loginDto: LoginUserDto) {
  return this.userService.login(loginDto);
}
```

### Password Policy
```typescript
// api/src/common/validators/password.validator.ts
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsStrongPassword(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isStrongPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          return typeof value === 'string' && strongPasswordRegex.test(value);
        },
        defaultMessage() {
          return 'Password must be at least 8 characters long and contain uppercase, lowercase, number and special character';
        },
      },
    });
  };
}
```

Bu tuzatishlarni amalga oshirgandan so'ng loyihangiz xavfsizlik jihatidan ancha yaxshi bo'ladi.