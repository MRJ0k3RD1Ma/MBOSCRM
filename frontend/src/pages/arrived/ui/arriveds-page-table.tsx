import { Button, Dropdown, Table, Tooltip, type MenuProps } from "antd";
import {
  useDeleteArrived,
  useGetAllArrived,
  type Arrived,
} from "../../../config/queries/arrived/arrived-qureys";

import { MoreOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { indexColumn } from "../../../components/tables/indexColumn";
import { useNavigate, useLocation } from "react-router-dom";

export default function ArrivedsPageTable({
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
  const navigate = useNavigate();
  const location = useLocation();
  const { data, isLoading } = useGetAllArrived({
    page,
    limit: 10,
    ...(search ? { name: search } : {}),
    ...filters,
  });

  const deleteArrived = useDeleteArrived();
  const handleDelete = (id: number) => {
    deleteArrived.mutate(id, {});
  };
  const columns = [
    indexColumn(page, 10),
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    { title: "Kod", dataIndex: "code" },
    { title: "Mahsulotlar", dataIndex: "ArrivedProduct",render:(products:any)=> products.map((product:any)=>`${product.Product.name} - ${product.count}X`).join(", ")},
    { title: "Izoh", dataIndex: "description" },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Arrived) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => navigate(`/arrived/edit/${row.id}`),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => handleDelete(row.id),
          },
          {
            key: "view",
            label: "Tafsilotlar",
            onClick: () =>
              navigate(`/arrived/${row.id}`, {
                state: { search: location.search },
              }),
          },
        ];

        return (
          <div onClick={(e) => e.stopPropagation()}>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <Tooltip title="Boshqarish">
                <Button icon={<MoreOutlined />} />
              </Tooltip>
            </Dropdown>
          </div>
        );
      },
    },
  ];

  return (
    <div className="arriveds-page-table">
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
        onRow={(record) => ({
          onClick: (e) => {
            if (
              (e.target as HTMLElement).closest("button") ||
              (e.target as HTMLElement).closest("svg")
            )
              return;
            navigate(`/arrived/${record.id}`, {
              state: { search: location.search },
            });
          },
        })}
      />
    </div>
  );
}
