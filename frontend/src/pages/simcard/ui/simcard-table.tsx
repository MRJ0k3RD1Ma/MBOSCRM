import {
  Button,
  Dropdown,
  Popconfirm,
  Table,
  Tooltip,
  type MenuProps,
} from "antd";
import { indexColumn } from "../../../components/tables/indexColumn";
import {
  useGetAllSimCards,
  useDeleteSimCard,
  type SimCard,
} from "../../../config/queries/simcard/simcard-querys";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

interface SimCardTableProps {
  page: number;
  setPage: (page: number) => void;
  clients: any;
  form: any;
  setEditing: (simcard: any | null) => void;
  setFormModalOpen: (simcard: any | null) => void;
  filters: Record<string, any>;
  search: string;
}

export default function SimCardTable({
  page,
  setPage,
  clients,
  form,
  setEditing,
  setFormModalOpen,
  filters,
  search,
}: SimCardTableProps) {
  const limit = 10;
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllSimCards({
    page,
    limit,
    ...(search ? { name: search } : {}),
    ...filters,
  });
  const deleteSimCard = useDeleteSimCard();

  const handleEdit = (record: SimCard) => {
    setEditing(record);
    form.setFieldsValue(record);
    setFormModalOpen(true);
  };

  const handleDelete = (id: number) => {
    deleteSimCard.mutate(id);
  };

  const columns = [
    indexColumn(page, limit),
    { title: "Kompaniya", dataIndex: "company", key: "company" },
    { title: "Raqami", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Mijoz",
      dataIndex: "clientId",
      key: "clientId",
      render: (clientId: number) =>
        clients?.data.find((u: any) => u.id === clientId)?.name || "–",
    },
    { title: "Izoh", dataIndex: "description", key: "description" },
    {
      title: "Aktiv qilingan sana",
      dataIndex: "activeDate",
      key: "activeDate",
      render: (text: string) => (text ? dayjs(text).format("YYYY-MM-DD") : "—"),
    },
    {
      title: "Holati",
      dataIndex: "isActive",
      key: "isActive",
      render: (val: boolean) => (
        <span
          style={{
            padding: "2px 8px",
            borderRadius: 6,
            fontWeight: 500,
            backgroundColor: val ? "#4CAF50" : "#F44336",
            color: "#ffffff",
          }}
        >
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: SimCard) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => handleEdit(record),
          },
          {
            key: "delete",
            label: (
              <Popconfirm
                title="Haqiqatan ham o‘chirmoqchimisiz?"
                okText="Ha"
                cancelText="Yo‘q"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDelete(record.id);
                }}
              >
                <span style={{ color: "red" }}>O‘chirish</span>
              </Popconfirm>
            ),
          },
          {
            key: "view",
            label: "To'liq ko'rish",
            onClick: () => navigate(`/simcard/${record.clientId}`),
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
    <>
      <Table<SimCard>
        columns={columns}
        dataSource={data?.data || []}
        loading={isLoading}
        rowKey="id"
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total || 0,
          onChange: (page) => setPage(page),
        }}
        onRow={(record) => ({
          onClick: () => navigate(`/simcard/${record.id}`),
        })}
      />
    </>
  );
}
