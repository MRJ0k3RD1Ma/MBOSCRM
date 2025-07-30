// ===================== AUTH ENDPOINTS =====================
export const authEndpoints = {
  register: "user",
  login: "user/login",
  refresh: "user/refresh",
  logout: "user/logout",
};

// ===================== USER ENDPOINTS =====================
export const userEndpoints = {
  all: "user",
  me: "user/check",
  one: (id: string) => `user/${id}`,
  update: (id: string) => `user/${id}`,
};

// ===================== USER ROLE ENDPOINTS =====================
export const userRoleEndpoints = {
  create: "user/role",
  all: "user/role",
  one: (id: string) => `user/role/${id}`,
  update: (id: string) => `user/role/${id}`,
  delete: (id: string) => `user/role/${id}`,
};

// ===================== SETTINGS ENDPOINTS =====================
export const settingsEndpoints = {
  get: "settings",
  update: "settings",
};

// ===================== LOCATION ENDPOINTS =====================
export const locationEndpoints = {
  region: "location/region",
  districtByRegion: (regionId: string | number) =>
    `location/district/${regionId}`,
};

// ===================== CLIENT ENDPOINTS =====================
export const clientEndpoints = {
  create: "client",
  all: "client",
  one: (id: string) => `client/${id}`,
  update: (id: string) => `client/${id}`,
  delete: (id: string) => `client/${id}`,
};

// ===================== CLIENT TYPE ENDPOINTS =====================
export const clientTypeEndpoints = {
  create: "client/type",
  all: "client/type",
  one: (id: string) => `client/type/${id}`,
  update: (id: string) => `client/type/${id}`,
  delete: (id: string) => `client/type/${id}`,
};

// ===================== PRODUCT GROUP ENDPOINTS =====================
export const productGroupEndpoints = {
  create: "product-group",
  all: "product-group",
  one: (id: string) => `product-group/${id}`,
  update: (id: string) => `product-group/${id}`,
  delete: (id: string) => `product-group/${id}`,
};

// ===================== PRODUCT ENDPOINTS =====================
export const productEndpoints = {
  create: "product",
  all: "product",
  one: (id: string) => `product/${id}`,
  update: (id: string) => `product/${id}`,
  delete: (id: string) => `product/${id}`,
};

// ===================== PRODUCT UNIT ENDPOINTS =====================
export const productUnitEndpoints = {
  create: "product-unit",
  all: "product-unit",
  one: (id: string) => `product-unit/${id}`,
  update: (id: string) => `product-unit/${id}`,
  delete: (id: string) => `product-unit/${id}`,
};

// ===================== SUPPLIER ENDPOINTS =====================
export const supplierEndpoints = {
  create: "supplier",
  all: "supplier",
  one: (id: string) => `supplier/${id}`,
  update: (id: string) => `supplier/${id}`,
  delete: (id: string) => `supplier/${id}`,
};

// ===================== PAID SUPPLIER ENDPOINTS =====================
export const paidSupplierEndpoints = {
  create: "paidsupplier",
  all: "paidsupplier",
  one: (id: string) => `paidsupplier/${id}`,
  update: (id: string) => `paidsupplier/${id}`,
  delete: (id: string) => `paidsupplier/${id}`,
};

// ===================== PAYMENT ENDPOINTS =====================
export const paymentEndpoints = {
  create: "payment",
  all: "payment",
  one: (id: string) => `payment/${id}`,
  update: (id: string) => `payment/${id}`,
  delete: (id: string) => `payment/${id}`,
};

// ===================== ARRIVED ENDPOINTS =====================
export const arrivedEndpoints = {
  create: "arrived",
  all: "arrived",
  one: (id: string) => `arrived/${id}`,
  update: (id: string) => `arrived/${id}`,
  delete: (id: string) => `arrived/${id}`,
};

// ===================== ARRIVED PRODUCT ENDPOINTS =====================
export const arrivedProductEndpoints = {
  create: "arrived-product",
  all: "arrived-product",
  one: (id: string) => `arrived-product/${id}`,
  update: (id: string) => `arrived-product/${id}`,
  delete: (id: string) => `arrived-product/${id}`,
};
