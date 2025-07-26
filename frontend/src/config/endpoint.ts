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
