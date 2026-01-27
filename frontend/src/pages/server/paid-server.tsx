import { Button, Card, Select, Space, Table } from "antd";

import { FilterOutlined } from "@ant-design/icons";
import PaidServersFilterModal from "./ui/paid-servers-filter-modal";
import dayjs from "dayjs";
import { indexColumn } from "../../components/tables/indexColumn";
import { useGetAllPaidServers } from "../../config/queries/server/paid-servers-querys";
import { useGetAllServers } from "../../config/queries/server/servers-querys";
import { useState } from "react";
import { useUrlState } from "../../hooks/useUrlState";

export default function PaidServer() {
  const {
    page,
    setPage,
    filters,
    handleFilterApply,
  } = useUrlState();

  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [limit] = useState(10);
  const { data: serverData } = useGetAllServers();

  const { data, isLoading } = useGetAllPaidServers({
    page,
    limit,
    ...filters,
  });

  const columns = [
    indexColumn(page, limit),
    {
      title: "To'lov turi",
      dataIndex: ["server", "name"],
    },
    {
      title: "To'lov turi",
      dataIndex: ["paymentType", "name"],
    },
    {
      title: "Narxi",
      dataIndex: "price",
      render: (price: number) => `${price.toLocaleString()} so'm`,
    },
    {
      title: "Sanasi",
      dataIndex: "createdAt",
      render: (val: string) => dayjs(val).format("YYYY-MM-DD"),
    },
    {
      title: "Izoh",
      dataIndex: "description",
    },
  ];

  return (
    <Card>
      <Space
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
        }}
      >
        <>
          <Select
            placeholder="Serverni tanlang"
            showSearch
            allowClear
            optionFilterProp="label"
            style={{ minWidth: 200 }}
            value={filters.serverId}
            onChange={(value) => {
              handleFilterApply({ serverId: value });
            }}
          >
            {serverData?.data.map((p) => (
              <Select.Option key={p.id} value={p.id} label={p.name}>
                {p.name}
              </Select.Option>
            ))}
          </Select>
          <Button
            icon={<FilterOutlined />}
            onClick={() => setFilterModalOpen(!filterModalOpen)}
          >
            Filter
          </Button>
        </>
      </Space>

      <PaidServersFilterModal
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={handleFilterApply}
        initialValues={filters}
      />

      <Table
        columns={columns}
        dataSource={Array.isArray(data?.data) ? data.data : []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: setPage,
        }}
      />
    </Card>
  );
}
