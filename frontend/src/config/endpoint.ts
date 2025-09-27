export const authEndpoints = {
  register: "user",
  login: "user/login",
  refresh: "user/refresh",
  logout: "user/logout",
};

export const userEndpoints = {
  create: "user",
  all: "user",
  me: "user/check",
  one: (id: string) => `user/${id}`,
  update: (id: string) => `user/${id}`,
  delete: (id: string) => `user/${id}`,
};

export const userRoleEndpoints = {
  create: "user/role",
  all: "user/role",
  one: (id: string) => `user/role/${id}`,
  update: (id: string) => `user/role/${id}`,
  delete: (id: string) => `user/role/${id}`,
};

export const settingsEndpoints = {
  get: "settings",
  update: "settings",
};
export const statisticsEndpoints = {
  get: "statistics",
};

export const locationEndpoints = {
  region: "location/region",
  districtByRegion: (regionId: string | number) =>
    `location/district/${regionId}`,
};

export const clientEndpoints = {
  create: "client",
  all: "client",
  one: (id: string) => `client/${id}`,
  update: (id: string) => `client/${id}`,
  delete: (id: string) => `client/${id}`,
};

export const clientTypeEndpoints = {
  create: "client/type",
  all: "client/type",
  one: (id: string) => `client/type/${id}`,
  update: (id: string) => `client/type/${id}`,
  delete: (id: string) => `client/type/${id}`,
};

export const productGroupEndpoints = {
  create: "product-group",
  all: "product-group",
  one: (id: string) => `product-group/${id}`,
  update: (id: string) => `product-group/${id}`,
  delete: (id: string) => `product-group/${id}`,
};

export const productEndpoints = {
  create: "product",
  all: "product",
  one: (id: string) => `product/${id}`,
  update: (id: string) => `product/${id}`,
  delete: (id: string) => `product/${id}`,
};

export const productUnitEndpoints = {
  create: "product-unit",
  all: "product-unit",
  one: (id: string) => `product-unit/${id}`,
  update: (id: string) => `product-unit/${id}`,
  delete: (id: string) => `product-unit/${id}`,
};

export const supplierEndpoints = {
  create: "supplier",
  all: "supplier",
  one: (id: string) => `supplier/${id}`,
  update: (id: string) => `supplier/${id}`,
  delete: (id: string) => `supplier/${id}`,
};

export const paidSupplierEndpoints = {
  create: "paidsupplier",
  all: "paidsupplier",
  one: (id: string) => `paidsupplier/${id}`,
  update: (id: string) => `paidsupplier/${id}`,
  delete: (id: string) => `paidsupplier/${id}`,
};

export const paidClientEndpoints = {
  create: "paid-client",
  all: "paid-client",
  one: (id: string) => `paid-client/${id}`,
  update: (id: string) => `paid-client/${id}`,
  delete: (id: string) => `paid-client/${id}`,
};

export const paymentEndpoints = {
  create: "payment",
  all: "payment",
  one: (id: string) => `payment/${id}`,
  update: (id: string) => `payment/${id}`,
  delete: (id: string) => `payment/${id}`,
};

export const arrivedEndpoints = {
  create: "arrived",
  all: "arrived",
  one: (id: string) => `arrived/${id}`,
  update: (id: string) => `arrived/${id}`,
  delete: (id: string) => `arrived/${id}`,
};

export const arrivedProductEndpoints = {
  create: "arrived-product",
  all: "arrived-product",
  one: (id: string) => `arrived-product/${id}`,
  update: (id: string) => `arrived-product/${id}`,
  delete: (id: string) => `arrived-product/${id}`,
};

export const saleEndpoints = {
  create: "sale",
  all: "sale",
  one: (id: string) => `sale/${id}`,
  update: (id: string) => `sale/${id}`,
  delete: (id: string) => `sale/${id}`,
};

export const saleProductEndpoints = {
  create: "sale-product",
  all: "sale-product",
  one: (id: string) => `sale-product/${id}`,
  update: (id: string) => `sale-product/${id}`,
  delete: (id: string) => `sale-product/${id}`,
};

export const subscribeEndpoints = {
  all: "subscribe",
  one: (id: string) => `subscribe/${id}`,
  create: "subscribe",
  update: (id: string) => `subscribe/${id}`,
  delete: (id: string) => `subscribe/${id}`,
};

export const serverEndpoints = {
  all: "server",
  one: (id: string) => `server/${id}`,
  create: "server",
  update: (id: string) => `server/${id}`,
  delete: (id: string) => `server/${id}`,
};

export const paidServerEndpoints = {
  all: "paid-server",
  one: (id: string) => `paid-server/${id}`,
  create: "paid-server",
  update: (id: string) => `paid-server/${id}`,
  delete: (id: string) => `paid-server/${id}`,
};

export const paidOtherEndpoints = {
  all: "paid-other",
  one: (id: string) => `paid-other/${id}`,
  create: "paid-other",
  update: (id: string) => `paid-other/${id}`,
  delete: (id: string) => `paid-other/${id}`,
};

export const paidOtherGroupEndpoints = {
  all: "paid-other/group",
  one: (id: string) => `paid-other/group/${id}`,
  create: "paid-other/group",
  update: (id: string) => `paid-other/group/${id}`,
  delete: (id: string) => `paid-other/group/${id}`,
};

export const saleFeedbackEndpoints = {
  all: "sale-feedback",
  one: (id: string) => `sale-feedback/id/${id}`,
  oneByAlias: (alias: string) => `sale-feedback/alias/${alias}`,
  create: "sale-feedback",
  update: (alias: string) => `sale-feedback/${alias}`,
  updateState: (alias: string) => `sale-feedback/${alias}/state`,
  delete: (id: string) => `sale-feedback/${id}`,
};

export const saleTodoEndpoints = {
  all: "sale-todo",
  create: "sale-todo",
  one: (id: string) => `sale-todo/${id}`,
  update: (id: string) => `sale-todo/${id}`,
  delete: (id: string) => `sale-todo/${id}`,
};

export const todoEndpoints = {
  all: "todo",
  create: "todo",
  one: (id: string) => `todo/${id}`,
  update: (id: string) => `todo/${id}`,
  delete: (id: string) => `todo/${id}`,
};

export const smsEndpoints = {
  all: "sms",
  create: "sms",
  one: (id: string) => `sms/${id}`,
  update: (id: string) => `sms/${id}`,
  delete: (id: string) => `sms/${id}`,
};

export const appealEndpoints = {
  all: "appeal",
  one: (id: string) => `appeal/${id}`,
  create: "appeal",
  update: (id: string) => `appeal/${id}`,
  delete: (id: string) => `appeal/${id}`,
};

export const simCardEndpoints = {
  all: "sim-card",
  create: "sim-card",
  one: (id: string) => `sim-card/${id}`,
  update: (id: string) => `sim-card/${id}`,
  delete: (id: string) => `sim-card/${id}`,
};
