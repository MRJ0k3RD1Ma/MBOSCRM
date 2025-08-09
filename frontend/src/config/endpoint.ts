// ===================== AUTH ENDPOINTS =====================
export const authEndpoints = {
  register: "user",
  login: "user/login",
  refresh: "user/refresh",
  logout: "user/logout",
};

// ===================== USER ENDPOINTS =====================
export const userEndpoints = {
  create: "user",
  all: "user",
  me: "user/check",
  one: (id: string) => `user/${id}`,
  update: (id: string) => `user/${id}`,
  delete: (id: string) => `user/${id}`,
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
// ===================== SETTINGS ENDPOINTS =====================
export const statisticsEndpoints = {
  get: "statistics",
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

// ===================== SALE ENDPOINTS =====================
export const saleEndpoints = {
  create: "sale",
  all: "sale",
  one: (id: string) => `sale/${id}`,
  update: (id: string) => `sale/${id}`,
  delete: (id: string) => `sale/${id}`,
};

// ===================== SALE PRODUCT ENDPOINTS =====================
export const saleProductEndpoints = {
  create: "sale-product",
  all: "sale-product",
  one: (id: string) => `sale-product/${id}`,
  update: (id: string) => `sale-product/${id}`,
  delete: (id: string) => `sale-product/${id}`,
};

// ===================== SUBSCRIBE ENDPOINTS =====================
export const subscribeEndpoints = {
  all: "subscribe",
  one: (id: string) => `subscribe/${id}`,
  create: "subscribe",
  update: (id: string) => `subscribe/${id}`,
  delete: (id: string) => `subscribe/${id}`,
};

// ===================== SERVER ENDPOINTS =====================
export const serverEndpoints = {
  all: "server",
  one: (id: string) => `server/${id}`,
  create: "server",
  update: (id: string) => `server/${id}`,
  delete: (id: string) => `server/${id}`,
};

// ===================== PAID SERVER ENDPOINTS =====================
export const paidServerEndpoints = {
  all: "paid-server",
  one: (id: string) => `paid-server/${id}`,
  create: "paid-server",
  update: (id: string) => `paid-server/${id}`,
  delete: (id: string) => `paid-server/${id}`,
};

// ===================== PAID OTHER ENDPOINTS =====================
export const paidOtherEndpoints = {
  all: "paid-other",
  one: (id: string) => `paid-other/${id}`,
  create: "paid-other",
  update: (id: string) => `paid-other/${id}`,
  delete: (id: string) => `paid-other/${id}`,
};

// ===================== PAID OTHER GROUP ENDPOINTS =====================
export const paidOtherGroupEndpoints = {
  all: "paid-other/group",
  one: (id: string) => `paid-other/group/${id}`,
  create: "paid-other/group",
  update: (id: string) => `paid-other/group/${id}`,
  delete: (id: string) => `paid-other/group/${id}`,
};
