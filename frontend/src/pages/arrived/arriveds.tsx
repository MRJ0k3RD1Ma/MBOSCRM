import { useState } from "react";
import {
  Button,
  Card,
  Dropdown,
  Input,
  Space,
  Table,
  Tooltip,
  type MenuProps,
  message,
} from "antd";
import { PlusOutlined, MoreOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useCreateArrived,
  useDeleteArrived,
  useGetAllArrived,
  useUpdateArrived,
  type Arrived,
  type CreateArrivedInput,
} from "../../config/queries/arrived/arrived-qureys";
import ArrivedFormModal from "./ui/arriveds-form-modal";
import ArrivedProductFormModal from "./ui/arriveds-product-form-modal";
import dayjs from "dayjs";
export default function Arriveds() {
  const navigate = useNavigate();
  const [openArrivedModal, setOpenArrivedModal] = useState(false);
  const [openProductModal, setOpenProductModal] = useState(false);
  const [editing, setEditing] = useState<Arrived | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const { data, isLoading } = useGetAllArrived({
    page,
    limit,
    ...(search ? { code: search } : {}),
  });

  const createArrived = useCreateArrived();
  const updateArrived = useUpdateArrived();
  const deleteArrived = useDeleteArrived();

  const handleSubmitArrived = (values: CreateArrivedInput) => {
    if (editing) {
      updateArrived.mutate(
        { id: editing.id, ...values, price: editing.price },
        {
          onSuccess: () => {
            message.success("Kirim yangilandi");
            setOpenArrivedModal(false);
            setEditing(null);
          },
        }
      );
    } else {
      createArrived.mutate(values, {
        onSuccess: () => {
          message.success("Yangi kirim qo‘shildi");
          setOpenArrivedModal(false);
        },
      });
    }
  };

  const handleEdit = (arrived: Arrived) => {
    setEditing(arrived);
    setOpenArrivedModal(true);
  };

  const handleDelete = (id: number) => {
    deleteArrived.mutate(id, {
      onSuccess: () => message.success("Kirim o‘chirildi"),
    });
  };

  const columns = [
    {
      title: "Sana",
      dataIndex: "date",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },

    { title: "Kod", dataIndex: "code" },
    { title: "Tovar hujjati", dataIndex: "waybillNumber" },
    { title: "Izoh", dataIndex: "description" },
    { title: "Narxi", dataIndex: "price" },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, row: Arrived) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => handleEdit(row),
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
            onClick: () => navigate(`/arrived/${row.id}`),
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
    <Card>
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Space>
          <Input.Search
            placeholder="Kod bo‘yicha qidirish"
            allowClear
            enterButton
            onSearch={(val) => {
              setSearch(val);
              setPage(1);
            }}
            style={{ maxWidth: 300 }}
          />
          <Button icon={<FilterOutlined />}>Filter</Button>
        </Space>

        <Space>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditing(null);
              setOpenArrivedModal(true);
            }}
          >
            Yangi kirim
          </Button>
          <Button
            type="default"
            icon={<PlusOutlined />}
            onClick={() => {
              setOpenProductModal(true);
            }}
          >
            Kirimga mahsulot
          </Button>
        </Space>
      </Space>

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
            )
              return;
            navigate(`/arrived/${record.id}`);
          },
        })}
        pagination={{
          current: page,
          pageSize: limit,
          total: data?.total,
          onChange: (page) => setPage(page),
        }}
      />

      <ArrivedFormModal
        open={openArrivedModal}
        onClose={() => {
          setOpenArrivedModal(false);
          setEditing(null);
        }}
        onFinish={handleSubmitArrived}
        initialValues={editing || undefined}
      />

      <ArrivedProductFormModal
        dataSource={data?.data || []}
        open={openProductModal}
        onClose={() => setOpenProductModal(false)}
      />
    </Card>
  );
}
