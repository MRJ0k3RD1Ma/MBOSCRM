import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllSaleProduct } from "../../../config/queries/sale/sale-product-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ProductPageSaleTable({
  productId,
}: {
  productId: number;
}) {
  const [salesPage, setSalesPage] = useState(1);
  const [salesLimit, setSalesLimit] = useState(10);

  const { data: saleProductsClient, isLoading: salesLoading } =
    useGetAllSaleProduct({
      productId,
      page: salesPage,
      limit: salesLimit,
    });
  const salesColumns = [
    indexColumn(salesPage, salesLimit),
    { title: "Shartnoma raqami", dataIndex: ["sale", "code"] },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).tz("Asia/Tashkent").format("YYYY-MM-DD") : "—",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Soni",
      dataIndex: "count",
      render: (_: any, record: any) => {
        const count = record.count || 0;
        const unitName = record.product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Obunami",
      dataIndex: ["SaleProduct", "0", "is_subscribe"],
      render: (is_subscribe: boolean) => (is_subscribe ? "Ha" : "Yo'q"),
    },
    { title: "Kiritdi", dataIndex: ["register", "name"] },
  ];
  return (
    <div className="product-page-sale-table">
      <Table
        loading={salesLoading}
        columns={salesColumns}
        dataSource={saleProductsClient?.data}
        rowKey="id"
        pagination={{
          current: salesPage,
          pageSize: salesLimit,
          total: saleProductsClient?.total || 0,
          onChange: (p, ps) => {
            setSalesPage(p);
            setSalesLimit(ps);
          },
        }}
      />
    </div>
  );
}
