import { Table } from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useGetAllProductGroups } from "../../../config/queries/products/product-gorup-querys";
import { useGetAllProductUnits } from "../../../config/queries/products/product-unit-querys";
import {
  useGetAllProducts,
  type Product,
} from "../../../config/queries/products/products-querys";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ArrivedsCreditTable({
  page,
  search,
  filters,
  setPage,
}: {
  page: number;
  search: string;
  filters: Record<string, any>;
  setPage: (page: number) => void;
}) {
  const navigate = useNavigate();
  const [limit] = useState(10);

  const { data: unitsData } = useGetAllProductUnits();
  const { data: groupData } = useGetAllProductGroups();
  const { data, isLoading } = useGetAllProducts({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
    type: "DEVICE",
  });

  const columns = [
    indexColumn(page, 10),
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Shtrix kodi", dataIndex: "barcode", key: "barcode" },
    {
      title: "Guruhi",
      dataIndex: "groupId",
      key: "groupId",
      render: (groupId: number) =>
        groupData?.data.find((g) => g.id === groupId)?.name || "–",
    },
    {
      title: "Qoldiq",
      key: "reminder",
      render: (_: any, row: Product) => {
        const unitName =
          unitsData?.data.find((u) => u.id === row.unitId)?.name || "";
        return `${row.countReminder} , ${unitName}`;
      },
    },
    {
      title: "Sotuv narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    { title: "Turi", dataIndex: "type", key: "type" },
  ];
  return (
    <div className="arriveds-credit-table">
      <Table
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            ) {
              return;
            }
            navigate(`/product/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />
    </div>
  );
}
