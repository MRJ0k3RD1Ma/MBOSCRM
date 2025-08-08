import { useState } from "react";
import { Button, Card, Input, Space, Table } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useGetAllProducts,
  type Product,
} from "../../config/queries/products/products-querys";
import { useGetAllProductUnits } from "../../config/queries/products/product-unit-querys";
import { useGetAllProductGroups } from "../../config/queries/products/product-gorup-querys";
import ProductsFilterModal from "../products/ui/products-filter-modal";

export default function ArrivedsCredit() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllProducts({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
    type: "DEVICE",
  });

  const { data: unitsData } = useGetAllProductUnits();
  const { data: groupData } = useGetAllProductGroups();

  const columns = [
    { title: "Nomi", dataIndex: "name", key: "name" },
    { title: "Shtrix kodi", dataIndex: "barcode", key: "barcode" },
    {
      title: "Guruh ID",
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
        return `${row.reminderFirst} , ${unitName}`;
      },
    },
    { title: "Sotuv narxi", dataIndex: "price", key: "price" },
    { title: "Turi", dataIndex: "type", key: "type" },
  ];

  return (
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Space>
          <Input.Search
            placeholder="Mahsulot nomi bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </Space>
      </Space>
      <ProductsFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={(values) => {
          setFilters(values);
          setPage(1);
        }}
        initialValues={filters}
        reminder={false}
      />
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
    </Card>
  );
}
