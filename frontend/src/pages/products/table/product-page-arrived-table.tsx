import { Table } from "antd";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useGetAllArrivedProduct } from "../../../config/queries/arrived/arrived-product-querys";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function ProductPageArrivedTable({
  productId,
}: {
  productId: number;
}) {
  const [arrivalsPage, setArrivalsPage] = useState(1);
  const [arrivalsLimit, setArrivalsLimit] = useState(10);

  const { data: arrivedProducts, isLoading: arrivalsLoading } =
    useGetAllArrivedProduct({
      productId,
      page: arrivalsPage,
      limit: arrivalsLimit,
    });

  const arrivalsColumns = [
    indexColumn(arrivalsPage, arrivalsLimit),
    { title: "Shartnoma raqami", dataIndex: ["Arrived", "code"] },
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
        const unitName = record.Product?.ProductUnit?.name || "-";
        return `${count} ${unitName}`;
      },
    },
    {
      title: "Umumiy narxi ",
      dataIndex: "priceCount",
      render: (priceCount: number) =>
        priceCount ? priceCount.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "Kiritdi", dataIndex: ["register", "name"] },
  ];

  return (
    <div className="product-page-arrived-table">
      <Table
        loading={arrivalsLoading}
        columns={arrivalsColumns}
        dataSource={arrivedProducts?.data}
        rowKey="id"
        pagination={{
          current: arrivalsPage,
          pageSize: arrivalsLimit,
          total: arrivedProducts?.total || 0,
          onChange: (p, ps) => {
            setArrivalsPage(p);
            setArrivalsLimit(ps);
          },
        }}
      />
    </div>
  );
}
