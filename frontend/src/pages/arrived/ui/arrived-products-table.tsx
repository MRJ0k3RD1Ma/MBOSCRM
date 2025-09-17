import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllArrived } from "../../../config/queries/arrived/arrived-qureys";
import { useGetAllArrivedProduct } from "../../../config/queries/arrived/arrived-product-querys";
import { useGetAllProducts } from "../../../config/queries/products/products-querys";

export default function ArrivedProductsTable({
  page,
  setPage,
  search,
  filters,
}: {
  page: number;
  setPage: (page: number) => void;
  search: string;
  filters: Record<string, any>;
}) {
  const { data: arriveds } = useGetAllArrived({ page: 1, limit: 100 });
  const { data: products } = useGetAllProducts({ page: 1, limit: 100 });
  const { data, isLoading } = useGetAllArrivedProduct({
    page,
    limit: 10,
    ...(search ? { code: search } : {}),
    ...filters,
  });

  const columns = [
    indexColumn(page, 10),
    {
      title: "Yetkazib beruvchi",
      dataIndex: ["Arrived", "supplier", ["name"]],
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Kirim",
      dataIndex: "arrivedId",
      render: (id: number) => {
        const item = arriveds?.data?.find((a: any) => a.id === id);
        return item ? `${item.code}` : id;
      },
    },
    {
      title: "Mahsulot",
      dataIndex: "productId",
      render: (id: number) => {
        const product = products?.data?.find((p: any) => p.id === id);
        return product ? product.name : id;
      },
    },
    { title: "Soni", dataIndex: "count" },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
  ];

  return (
    <div className="arrived-products-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: 10,
          total: data?.total,
          onChange: setPage,
        }}
      />
    </div>
  );
}
