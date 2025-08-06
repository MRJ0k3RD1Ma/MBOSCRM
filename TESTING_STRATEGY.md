# Testing Strategy

## 1. Backend Testing

### Unit Tests Setup
```typescript
// api/src/modules/client/client.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { PrismaService } from '../prisma/prisma.service';
import { HttpError } from '../../common/exception/http.error';

describe('ClientService', () => {
  let service: ClientService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    client: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      count: jest.fn(),
    },
    $transaction: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a client successfully', async () => {
      const createClientDto = {
        name: 'Test Client',
        inn: '123456789',
        phone: '+998901234567',
        address: 'Test Address',
        description: 'Test Description',
        typeId: 1,
        regionId: 1,
        districtId: 1,
      };

      const expectedClient = {
        id: 1,
        ...createClientDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      };

      mockPrismaService.client.findFirst.mockResolvedValue(null); // No existing phone
      mockPrismaService.client.create.mockResolvedValue(expectedClient);

      const result = await service.create(createClientDto, 1);

      expect(result).toEqual(expectedClient);
      expect(mockPrismaService.client.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: createClientDto.name,
          inn: createClientDto.inn,
          phone: createClientDto.phone,
          registerId: 1,
          modifyId: 1,
        }),
      });
    });

    it('should throw error if phone already exists', async () => {
      const createClientDto = {
        name: 'Test Client',
        inn: '123456789',
        phone: '+998901234567',
        address: 'Test Address',
        description: 'Test Description',
        typeId: 1,
      };

      mockPrismaService.client.findFirst.mockResolvedValue({ id: 1 }); // Existing phone

      await expect(service.create(createClientDto, 1)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return paginated clients', async () => {
      const mockClients = [
        { id: 1, name: 'Client 1', phone: '+998901234567' },
        { id: 2, name: 'Client 2', phone: '+998901234568' },
      ];

      mockPrismaService.$transaction.mockResolvedValue([mockClients, 2]);

      const result = await service.findAll({ page: 1, limit: 10 });

      expect(result).toEqual({
        total: 2,
        page: 1,
        limit: 10,
        data: mockClients,
      });
    });
  });
});
```

### Integration Tests
```typescript
// api/test/client.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/modules/prisma/prisma.service';

describe('ClientController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let authToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    
    await app.init();

    // Get auth token
    const loginResponse = await request(app.getHttpServer())
      .post('/api/user/login')
      .send({
        username: 'admin',
        password: 'admin',
      });

    authToken = loginResponse.body.accessToken;
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  beforeEach(async () => {
    // Clean up database before each test
    await prismaService.client.deleteMany({});
  });

  describe('/api/client (POST)', () => {
    it('should create a new client', () => {
      const createClientDto = {
        name: 'Test Client',
        inn: '123456789',
        phone: '+998901234567',
        address: 'Test Address',
        typeId: 1,
      };

      return request(app.getHttpServer())
        .post('/api/client')
        .set('Authorization', `Bearer ${authToken}`)
        .send(createClientDto)
        .expect(201)
        .expect((res) => {
          expect(res.body.name).toBe(createClientDto.name);
          expect(res.body.inn).toBe(createClientDto.inn);
          expect(res.body.phone).toBe(createClientDto.phone);
        });
    });

    it('should return 400 for invalid data', () => {
      const invalidClientDto = {
        name: '', // Invalid: empty name
        inn: '123', // Invalid: short INN
        phone: 'invalid-phone', // Invalid: wrong format
      };

      return request(app.getHttpServer())
        .post('/api/client')
        .set('Authorization', `Bearer ${authToken}`)
        .send(invalidClientDto)
        .expect(400);
    });

    it('should return 401 without auth token', () => {
      const createClientDto = {
        name: 'Test Client',
        inn: '123456789',
        phone: '+998901234567',
      };

      return request(app.getHttpServer())
        .post('/api/client')
        .send(createClientDto)
        .expect(401);
    });
  });

  describe('/api/client (GET)', () => {
    beforeEach(async () => {
      // Create test data
      await prismaService.client.createMany({
        data: [
          {
            name: 'Client 1',
            inn: '123456789',
            phone: '+998901234567',
            registerId: 1,
            modifyId: 1,
          },
          {
            name: 'Client 2',
            inn: '987654321',
            phone: '+998901234568',
            registerId: 1,
            modifyId: 1,
          },
        ],
      });
    });

    it('should return paginated clients', () => {
      return request(app.getHttpServer())
        .get('/api/client?page=1&limit=10')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
          expect(res.body.total).toBe(2);
          expect(res.body.page).toBe(1);
          expect(res.body.limit).toBe(10);
        });
    });

    it('should filter clients by name', () => {
      return request(app.getHttpServer())
        .get('/api/client?name=Client 1')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0].name).toBe('Client 1');
        });
    });
  });
});
```

### Database Testing
```typescript
// api/test/database.spec.ts
import { PrismaClient } from '@prisma/client';

describe('Database', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.TEST_DATABASE_URL,
        },
      },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // Clean database
    await prisma.client.deleteMany({});
    await prisma.clientType.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('Client CRUD operations', () => {
    it('should create and retrieve a client', async () => {
      // Create user first
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'hashedpassword',
        },
      });

      // Create client
      const client = await prisma.client.create({
        data: {
          name: 'Test Client',
          inn: '123456789',
          phone: '+998901234567',
          registerId: user.id,
          modifyId: user.id,
        },
      });

      expect(client.id).toBeDefined();
      expect(client.name).toBe('Test Client');

      // Retrieve client
      const retrievedClient = await prisma.client.findUnique({
        where: { id: client.id },
      });

      expect(retrievedClient).toBeTruthy();
      expect(retrievedClient?.name).toBe('Test Client');
    });

    it('should enforce unique phone constraint', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'hashedpassword',
        },
      });

      // Create first client
      await prisma.client.create({
        data: {
          name: 'Client 1',
          inn: '123456789',
          phone: '+998901234567',
          registerId: user.id,
          modifyId: user.id,
        },
      });

      // Try to create second client with same phone
      await expect(
        prisma.client.create({
          data: {
            name: 'Client 2',
            inn: '987654321',
            phone: '+998901234567', // Same phone
            registerId: user.id,
            modifyId: user.id,
          },
        })
      ).rejects.toThrow();
    });
  });

  describe('Relationships', () => {
    it('should handle client-clientType relationship', async () => {
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          username: 'testuser',
          password: 'hashedpassword',
        },
      });

      const clientType = await prisma.clientType.create({
        data: {
          name: 'Corporate',
          creatorId: user.id,
          modifyId: user.id,
        },
      });

      const client = await prisma.client.create({
        data: {
          name: 'Test Client',
          inn: '123456789',
          phone: '+998901234567',
          typeId: clientType.id,
          registerId: user.id,
          modifyId: user.id,
        },
        include: {
          ClientType: true,
        },
      });

      expect(client.ClientType?.name).toBe('Corporate');
    });
  });
});
```

## 2. Frontend Testing

### Component Unit Tests
```typescript
// frontend/src/pages/clients/clients.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import ClientsPage from './clients';
import * as clientQueries from '../../config/queries/clients/clients-querys';

// Mock the queries
jest.mock('../../config/queries/clients/clients-querys');
const mockClientQueries = clientQueries as jest.Mocked<typeof clientQueries>;

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('ClientsPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render clients table', async () => {
    const mockClients = {
      data: [
        {
          id: 1,
          name: 'Test Client',
          inn: '123456789',
          phone: '+998901234567',
          address: 'Test Address',
          description: 'Test Description',
        },
      ],
      total: 1,
      page: 1,
      limit: 10,
    };

    mockClientQueries.useGetAllClients.mockReturnValue({
      data: mockClients,
      isLoading: false,
      error: null,
    } as any);

    mockClientQueries.useGetAllClientTypes.mockReturnValue({
      data: { data: [] },
      isLoading: false,
    } as any);

    mockClientQueries.useCreateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useUpdateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useDeleteClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    renderWithProviders(<ClientsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Client')).toBeInTheDocument();
      expect(screen.getByText('123456789')).toBeInTheDocument();
      expect(screen.getByText('+998901234567')).toBeInTheDocument();
    });
  });

  it('should open create modal when add button is clicked', async () => {
    mockClientQueries.useGetAllClients.mockReturnValue({
      data: { data: [], total: 0, page: 1, limit: 10 },
      isLoading: false,
    } as any);

    mockClientQueries.useGetAllClientTypes.mockReturnValue({
      data: { data: [] },
      isLoading: false,
    } as any);

    mockClientQueries.useCreateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useUpdateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useDeleteClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    renderWithProviders(<ClientsPage />);

    const addButton = screen.getByText('Yangi mijoz qo\'shish');
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Yangi Client')).toBeInTheDocument();
    });
  });

  it('should handle search functionality', async () => {
    const mockUseGetAllClients = jest.fn();
    mockClientQueries.useGetAllClients.mockImplementation(mockUseGetAllClients);

    mockUseGetAllClients.mockReturnValue({
      data: { data: [], total: 0, page: 1, limit: 10 },
      isLoading: false,
    });

    mockClientQueries.useGetAllClientTypes.mockReturnValue({
      data: { data: [] },
      isLoading: false,
    } as any);

    mockClientQueries.useCreateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useUpdateClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    mockClientQueries.useDeleteClient.mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    } as any);

    renderWithProviders(<ClientsPage />);

    const searchInput = screen.getByPlaceholderText('Mijoz nomi bo\'yicha qidirish');
    fireEvent.change(searchInput, { target: { value: 'Test Client' } });
    
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(mockUseGetAllClients).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Test Client',
          page: 1,
          limit: 10,
        })
      );
    });
  });
});
```

### Hook Testing
```typescript
// frontend/src/hooks/useCleanup.test.ts
import { renderHook } from '@testing-library/react';
import { useCleanup } from './useCleanup';

describe('useCleanup', () => {
  it('should call cleanup functions on unmount', () => {
    const cleanup1 = jest.fn();
    const cleanup2 = jest.fn();

    const { result, unmount } = renderHook(() => useCleanup());

    // Add cleanup functions
    result.current(cleanup1);
    result.current(cleanup2);

    // Unmount component
    unmount();

    // Verify cleanup functions were called
    expect(cleanup1).toHaveBeenCalledTimes(1);
    expect(cleanup2).toHaveBeenCalledTimes(1);
  });

  it('should not call cleanup functions if component is still mounted', () => {
    const cleanup = jest.fn();

    const { result } = renderHook(() => useCleanup());

    result.current(cleanup);

    // Cleanup should not be called yet
    expect(cleanup).not.toHaveBeenCalled();
  });
});
```

### API Integration Tests
```typescript
// frontend/src/config/queries/clients/clients-querys.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetAllClients, useCreateClient } from './clients-querys';
import axiosPrivate from '../../api';

// Mock axios
jest.mock('../../api');
const mockAxiosPrivate = axiosPrivate as jest.Mocked<typeof axiosPrivate>;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('Client Queries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('useGetAllClients', () => {
    it('should fetch clients successfully', async () => {
      const mockResponse = {
        data: {
          data: [
            {
              id: 1,
              name: 'Test Client',
              inn: '123456789',
              phone: '+998901234567',
            },
          ],
          total: 1,
          page: 1,
          limit: 10,
        },
      };

      mockAxiosPrivate.get.mockResolvedValue(mockResponse);

      const { result } = renderHook(
        () => useGetAllClients({ page: 1, limit: 10 }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(result.current.data).toEqual(mockResponse.data);
      expect(mockAxiosPrivate.get).toHaveBeenCalledWith(
        'client',
        { params: { page: 1, limit: 10 } }
      );
    });

    it('should handle fetch error', async () => {
      const mockError = new Error('Network error');
      mockAxiosPrivate.get.mockRejectedValue(mockError);

      const { result } = renderHook(
        () => useGetAllClients({ page: 1, limit: 10 }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toEqual(mockError);
    });
  });

  describe('useCreateClient', () => {
    it('should create client successfully', async () => {
      const mockResponse = {
        data: {
          id: 1,
          name: 'New Client',
          inn: '123456789',
          phone: '+998901234567',
        },
      };

      mockAxiosPrivate.post.mockResolvedValue(mockResponse);

      const { result } = renderHook(() => useCreateClient(), {
        wrapper: createWrapper(),
      });

      const clientData = {
        name: 'New Client',
        inn: '123456789',
        phone: '+998901234567',
        address: 'Test Address',
        typeId: 1,
      };

      result.current.mutate(clientData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockAxiosPrivate.post).toHaveBeenCalledWith('client', clientData);
    });
  });
});
```

## 3. End-to-End Testing

### Cypress E2E Tests
```typescript
// cypress/e2e/client-management.cy.ts
describe('Client Management', () => {
  beforeEach(() => {
    // Login before each test
    cy.login('admin', 'admin');
    cy.visit('/clients');
  });

  it('should display clients list', () => {
    cy.get('[data-testid="clients-table"]').should('be.visible');
    cy.get('[data-testid="add-client-button"]').should('be.visible');
  });

  it('should create a new client', () => {
    // Click add button
    cy.get('[data-testid="add-client-button"]').click();

    // Fill form
    cy.get('[data-testid="client-name-input"]').type('Test Client');
    cy.get('[data-testid="client-inn-input"]').type('123456789');
    cy.get('[data-testid="client-phone-input"]').type('+998901234567');
    cy.get('[data-testid="client-address-input"]').type('Test Address');

    // Submit form
    cy.get('[data-testid="submit-button"]').click();

    // Verify success
    cy.get('.ant-notification-notice-success').should('be.visible');
    cy.get('[data-testid="clients-table"]').should('contain', 'Test Client');
  });

  it('should search clients', () => {
    // Type in search input
    cy.get('[data-testid="search-input"]').type('Test Client');
    cy.get('[data-testid="search-button"]').click();

    // Verify filtered results
    cy.get('[data-testid="clients-table"]').should('contain', 'Test Client');
  });

  it('should edit a client', () => {
    // Click on first client row
    cy.get('[data-testid="clients-table"] tbody tr').first().click();

    // Click edit button
    cy.get('[data-testid="edit-button"]').click();

    // Update name
    cy.get('[data-testid="client-name-input"]').clear().type('Updated Client');

    // Submit
    cy.get('[data-testid="submit-button"]').click();

    // Verify update
    cy.get('.ant-notification-notice-success').should('be.visible');
    cy.get('[data-testid="clients-table"]').should('contain', 'Updated Client');
  });

  it('should delete a client', () => {
    // Click on first client row
    cy.get('[data-testid="clients-table"] tbody tr').first().click();

    // Click delete button
    cy.get('[data-testid="delete-button"]').click();

    // Confirm deletion
    cy.get('.ant-popconfirm-buttons .ant-btn-primary').click();

    // Verify deletion
    cy.get('.ant-notification-notice-success').should('be.visible');
  });

  it('should handle validation errors', () => {
    // Click add button
    cy.get('[data-testid="add-client-button"]').click();

    // Submit empty form
    cy.get('[data-testid="submit-button"]').click();

    // Verify validation errors
    cy.get('.ant-form-item-explain-error').should('be.visible');
  });
});
```

### Performance Testing
```typescript
// cypress/e2e/performance.cy.ts
describe('Performance Tests', () => {
  it('should load clients page within acceptable time', () => {
    const start = Date.now();
    
    cy.login('admin', 'admin');
    cy.visit('/clients');
    
    cy.get('[data-testid="clients-table"]').should('be.visible').then(() => {
      const loadTime = Date.now() - start;
      expect(loadTime).to.be.lessThan(3000); // Should load within 3 seconds
    });
  });

  it('should handle large datasets efficiently', () => {
    // Create test data
    cy.task('seedDatabase', { clients: 1000 });
    
    cy.login('admin', 'admin');
    cy.visit('/clients');
    
    // Verify pagination works
    cy.get('[data-testid="clients-table"]').should('be.visible');
    cy.get('.ant-pagination').should('be.visible');
    
    // Test search performance
    const searchStart = Date.now();
    cy.get('[data-testid="search-input"]').type('Client 500');
    cy.get('[data-testid="search-button"]').click();
    
    cy.get('[data-testid="clients-table"]').should('contain', 'Client 500').then(() => {
      const searchTime = Date.now() - searchStart;
      expect(searchTime).to.be.lessThan(2000); // Search should complete within 2 seconds
    });
  });
});
```

## 4. Test Configuration

### Jest Configuration
```javascript
// api/jest.config.js
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.spec.ts',
    '!**/*.interface.ts',
    '!**/node_modules/**',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/../test/setup.ts'],
};
```

### Frontend Test Configuration
```javascript
// frontend/jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/test/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### Test Scripts
```json
// package.json scripts
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:e2e": "cypress run",
    "test:e2e:open": "cypress open",
    "test:all": "npm run test && npm run test:e2e"
  }
}
```

Bu test strategiyasi loyihangizning barcha qismlarini qamrab oladi va sifatli kod yozishga yordam beradi.