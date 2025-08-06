# Performance Optimization

## 1. Backend Performance Optimizations

### Database Query Optimization
```typescript
// api/src/modules/client/client.service.ts
async findAll(dto: FindAllClientQueryDto) {
  const { limit = 10, page = 1, name, districtId, regionId } = dto;

  // Efficient pagination with cursor-based approach for large datasets
  const where: Prisma.ClientWhereInput = {
    isDeleted: false,
  };

  if (name?.trim()) {
    // Use full-text search for better performance
    where.name = { 
      search: name.trim().split(' ').join(' & '),
      mode: 'insensitive' 
    };
  }

  if (districtId) where.districtId = districtId;
  if (regionId) where.regionId = regionId;

  // Parallel execution for better performance
  const [data, total] = await Promise.all([
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
        // Include related data efficiently
        ClientType: {
          select: { id: true, name: true }
        },
        District: {
          select: { id: true, name: true }
        },
        Region: {
          select: { id: true, name: true }
        }
      },
      skip: (page - 1) * limit,
      take: Math.min(limit, 100),
      orderBy: { createdAt: 'desc' },
    }),
    this.prisma.client.count({ where }),
  ]);

  return { total, page, limit, data };
}
```

### Caching Implementation
```typescript
// api/src/common/decorators/cache.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const CACHE_KEY = 'cache';
export const Cache = (ttl: number = 300) => SetMetadata(CACHE_KEY, ttl);

// api/src/common/interceptors/cache.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  private cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const cacheKey = `${request.method}:${request.url}`;
    const ttl = Reflect.getMetadata('cache', context.getHandler()) || 300;

    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < cached.ttl * 1000) {
      return of(cached.data);
    }

    return next.handle().pipe(
      tap(data => {
        // Cache the response
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
          ttl
        });
      })
    );
  }
}

// Usage in controller
@Get()
@Cache(600) // Cache for 10 minutes
@UseInterceptors(CacheInterceptor)
findAll(@Query() query: FindAllClientQueryDto) {
  return this.clientService.findAll(query);
}
```

### Connection Pool Optimization
```typescript
// api/src/common/database/database.config.ts
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Connection pool settings in DATABASE_URL
// postgresql://user:password@localhost:5432/db?connection_limit=20&pool_timeout=20
```

### Response Compression
```typescript
// api/src/main.ts
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable compression
  app.use(compression({
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    },
    threshold: 1024, // Only compress responses > 1KB
  }));

  await app.listen(env.PORT || 3000);
}
```

## 2. Frontend Performance Optimizations

### React Query Optimization
```typescript
// frontend/src/config/queries/clients/clients-querys.ts
export const useGetAllClients = (params?: {
  page?: number;
  limit?: number;
  name?: string;
  address?: string;
  description?: string;
  phone?: string;
  inn?: string;
  districtId?: number;
}) => {
  return useQuery<ClientResponse>({
    queryKey: ["clients", params],
    queryFn: async () => {
      const { data } = await axiosPrivate.get(clientEndpoints.all, { params });
      return data;
    },
    // Performance optimizations
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    keepPreviousData: true, // For pagination
  });
};
```

### Component Memoization
```typescript
// frontend/src/components/ClientTable.tsx
import React, { memo, useMemo, useCallback } from 'react';
import { Table, Button } from 'antd';

interface Props {
  clients: Client[];
  loading: boolean;
  onEdit: (client: Client) => void;
  onDelete: (id: number) => void;
}

const ClientTable = memo<Props>(({ clients, loading, onEdit, onDelete }) => {
  // Memoize columns to prevent re-creation
  const columns = useMemo(() => [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Client) => (
        <div>
          <Button onClick={() => onEdit(record)}>Edit</Button>
          <Button danger onClick={() => onDelete(record.id)}>Delete</Button>
        </div>
      ),
    },
  ], [onEdit, onDelete]);

  // Memoize row key function
  const getRowKey = useCallback((record: Client) => record.id.toString(), []);

  return (
    <Table
      columns={columns}
      dataSource={clients}
      loading={loading}
      rowKey={getRowKey}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => 
          `${range[0]}-${range[1]} of ${total} items`,
      }}
    />
  );
});

ClientTable.displayName = 'ClientTable';
export default ClientTable;
```

### Virtual Scrolling for Large Lists
```typescript
// frontend/src/components/VirtualTable.tsx
import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { Table } from 'antd';

interface VirtualTableProps {
  data: any[];
  height: number;
  itemHeight: number;
  columns: any[];
}

const VirtualTable: React.FC<VirtualTableProps> = ({ 
  data, 
  height, 
  itemHeight, 
  columns 
}) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <Table
        dataSource={[data[index]]}
        columns={columns}
        pagination={false}
        showHeader={false}
        size="small"
      />
    </div>
  );

  return (
    <List
      height={height}
      itemCount={data.length}
      itemSize={itemHeight}
      width="100%"
    >
      {Row}
    </List>
  );
};

export default VirtualTable;
```

### Bundle Optimization
```typescript
// frontend/vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          react: ['react', 'react-dom'],
          antd: ['antd'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          
          // Feature chunks
          auth: ['./src/pages/auth'],
          clients: ['./src/pages/clients'],
          products: ['./src/pages/products'],
          suppliers: ['./src/pages/suppler'],
        },
      },
    },
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'antd', '@tanstack/react-query'],
  },
});
```

### Image Optimization
```typescript
// frontend/src/components/OptimizedImage.tsx
import React, { useState, useCallback } from 'react';
import { Skeleton } from 'antd';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setError(true);
  }, []);

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span>Image not found</span>
      </div>
    );
  }

  return (
    <>
      {loading && (
        <Skeleton.Image 
          style={{ width, height }} 
          className={className}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${loading ? 'hidden' : 'block'}`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
    </>
  );
};

export default OptimizedImage;
```

## 3. Database Performance Optimizations

### Indexing Strategy
```sql
-- Performance indexes
CREATE INDEX CONCURRENTLY idx_client_search ON client USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
CREATE INDEX CONCURRENTLY idx_client_active ON client(id) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_client_type_region ON client(type_id, region_id) WHERE is_deleted = false;

CREATE INDEX CONCURRENTLY idx_product_search ON product USING gin(to_tsvector('english', name));
CREATE INDEX CONCURRENTLY idx_product_active ON product(id) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_product_group_unit ON product(group_id, unit_id) WHERE is_deleted = false;

CREATE INDEX CONCURRENTLY idx_arrived_date_supplier ON arrived(date DESC, supplier_id) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_arrived_product_arrived ON arrived_product(arrived_id) WHERE is_deleted = false;

-- Partial indexes for better performance
CREATE INDEX CONCURRENTLY idx_user_active ON "user"(id) WHERE is_deleted = false;
CREATE INDEX CONCURRENTLY idx_supplier_active ON suppler(id) WHERE is_deleted = false;
```

### Query Optimization
```sql
-- Optimized queries with proper joins
-- Instead of N+1 queries, use joins
SELECT 
  c.id,
  c.name,
  c.phone,
  ct.name as client_type_name,
  d.name as district_name,
  r.name as region_name
FROM client c
LEFT JOIN client_type ct ON c.type_id = ct.id AND ct.is_deleted = false
LEFT JOIN district d ON c.district_id = d.id
LEFT JOIN region r ON c.region_id = r.id
WHERE c.is_deleted = false
ORDER BY c.created_at DESC
LIMIT 10 OFFSET 0;

-- Use materialized views for complex aggregations
CREATE MATERIALIZED VIEW client_stats AS
SELECT 
  ct.id as client_type_id,
  ct.name as client_type_name,
  COUNT(c.id) as client_count,
  AVG(c.balance) as avg_balance
FROM client_type ct
LEFT JOIN client c ON ct.id = c.type_id AND c.is_deleted = false
WHERE ct.is_deleted = false
GROUP BY ct.id, ct.name;

-- Refresh materialized view periodically
REFRESH MATERIALIZED VIEW CONCURRENTLY client_stats;
```

## 4. Monitoring and Profiling

### Backend Monitoring
```typescript
// api/src/common/interceptors/performance.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request = context.switchToHttp().getRequest();
    
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        if (duration > 1000) { // Log slow requests
          console.warn(`Slow request: ${request.method} ${request.url} took ${duration}ms`);
        }
      })
    );
  }
}
```

### Frontend Performance Monitoring
```typescript
// frontend/src/utils/performance.ts
export const measurePerformance = (name: string, fn: () => void) => {
  const start = performance.now();
  fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
};

// React component performance monitoring
export const withPerformanceMonitoring = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    const renderStart = performance.now();
    
    React.useEffect(() => {
      const renderEnd = performance.now();
      if (renderEnd - renderStart > 16) { // > 1 frame at 60fps
        console.warn(`${componentName} render took ${renderEnd - renderStart}ms`);
      }
    });

    return <Component {...props} />;
  });
};
```

Bu optimizatsiyalar loyihangizning performance'ini sezilarli darajada yaxshilaydi.