export const indexColumn = (page: number, pageSize: number) => ({
  title: "№",
  dataIndex: "index",
  width: 60,
  render: (_: any, __: any, index: number) => (page - 1) * pageSize + index + 1,
});
