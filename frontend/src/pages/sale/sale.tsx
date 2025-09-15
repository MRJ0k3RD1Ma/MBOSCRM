import {
  Button,
  Card,
  Descriptions,
  Dropdown,
  Modal,
  Row,
  Space,
  Table,
  Tooltip,
  Typography,
  type MenuProps,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useGetAllProducts } from "../../config/queries/products/products-querys";
import {
  useDeleteSale,
  useGetAllSale,
  useGetSaleById,
  useUpdateSale,
  type Sale,
} from "../../config/queries/sale/sale-querys";
import { useGetAllSaleProduct } from "../../config/queries/sale/sale-product-querys";
import { useGetAllClients } from "../../config/queries/clients/clients-querys";
import { useGetAllClientTypes } from "../../config/queries/clients/client-type-querys";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import PaidClientFormModal from "../clients/ui/paid-clients-form-modal";
import { useGetAllPayments } from "../../config/queries/payment/payment-querys";
import {
  useCreatePaidClient,
  type PaidClientDto,
} from "../../config/queries/clients/paid-client-querys";
import { indexColumn } from "../../components/tables/indexColumn";
import {
  useDeleteSaleTodo,
  useGetAllSaleTodo,
  type SaleTodo,
} from "../../config/queries/sale/sale-todo-querys";
import { useGetAllSaleFeedback } from "../../config/queries/sale/sale-feedback-querys";
import SaleTodoInput from "./ui/sale-todo-input";
import SaleUpdateModal from "./ui/sale-update-modal";
import type { ColumnsType } from "antd/es/table";

const { Title } = Typography;

export default function Sale() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paidOpen, setPaidOpen] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    if (id) setCurrentId(Number(id));
  }, [id]);
  const [page, setPage] = useState(1);
  const [pageSale, setPageSale] = useState(1);
  const limit = 5;
  const [editTodo, setEditTodo] = useState<SaleTodo | null>(null);
  const updateSale = useUpdateSale();
  const { data: sale } = useGetSaleById(currentId ?? undefined);
  const { data: saleProducts } = useGetAllSaleProduct({
    page,
    limit,
    saleId: currentId ?? undefined,
  });
  const { data: sales } = useGetAllSale({ page: 1, limit: 1000 });
  const { data: payments } = useGetAllPayments({ page: 1, limit: 1000 });
  const { data: clients } = useGetAllClients();
  const { data: products } = useGetAllProducts();
  const { data: types } = useGetAllClientTypes();
  const { data: saleTodo } = useGetAllSaleTodo({
    page: pageSale,
    limit,
    saleId: Number(id),
  });
  const { data: saleFeedback } = useGetAllSaleFeedback({
    page: 1,
    limit,
    saleId: Number(id),
  });

  const createPaidClient = useCreatePaidClient();
  const deleteSale = useDeleteSale();
  const deleteSaleTodo = useDeleteSaleTodo();

  const onClosed = () => {
    updateSale.mutate({ id: Number(currentId), state: "CLOSED" });
    setIsClosed(false);
  };

  const onSubmit = (values: PaidClientDto) => {
    createPaidClient.mutate(values);
    setPaidOpen(false);
  };

  const handleDelete = () => {
    if (!currentId) return;
    deleteSale.mutate(currentId, {
      onSuccess: () => {
        navigate("/sale");
      },
    });
  };

  const productColumns = [
    indexColumn(page, limit),
    {
      title: "Mahsulot nomi",
      dataIndex: "productId",
      render: (id: number) =>
        products?.data?.find((p) => p.id === id)?.name || `ID: ${id}`,
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
      title: "Narxi",
      dataIndex: "price",
      render: (_: number, record: any) => {
        return record.price
          ? record.price.toLocaleString("uz-UZ") + " so'm"
          : "0";
      },
    },
    {
      title: "Jami narx",
      dataIndex: "priceCount",
      render: (record: any) => {
        return record ? record.toLocaleString("uz-UZ") + " so'm" : "0";
      },
    },
  ];
  const saleTodoColumns: ColumnsType<SaleTodo> = [
    indexColumn(page, limit),
    {
      title: "Natija",
      dataIndex: "isComplated",
      render: (isComplated: boolean) => (isComplated ? "✓" : "✕"),
    },
    {
      title: "Sana",
      dataIndex: "updatedAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Qilingan ishlar",
      dataIndex: "name",
    },
  ];

  if (["TODO", "REJECT"].includes(saleFeedback?.data?.[0]?.state ?? "")) {
    saleTodoColumns.push({
      title: "Amallar",
      key: "actions",
      render: (_: any, row: SaleTodo) => {
        const items: MenuProps["items"] = [
          {
            key: "edit",
            label: "Tahrirlash",
            onClick: () => setEditTodo(row),
          },
          {
            key: "delete",
            label: "O‘chirish",
            danger: true,
            onClick: () => deleteSaleTodo.mutate(row.id),
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
    });
  }

  const saleFeedbackColumns = [
    indexColumn(page, limit),
    {
      title: "Holati",
      dataIndex: "state",
    },
    {
      title: "Qabul qilgan shaxs",
      dataIndex: "name",
    },
    {
      title: "Bajarilgan ish natijasi",
      dataIndex: "result",
    },
    {
      title: "Baho",
      dataIndex: "score",
    },
    {
      title: "Sana",
      dataIndex: "createdAt",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "izoh",
      dataIndex: "description",
    },
  ];
  console.log(saleFeedback);

  return (
    <Card style={{ width: "100%" }}>
      <Row
        justify="space-between"
        align="middle"
        style={{
          marginBottom: 24,
          borderBottom: "1px solid #303030",
          paddingBottom: "20px",
        }}
      >
        <Title level={4}>Savdo tafsilotlari</Title>
        <Space>
          {sale?.state === "RUNNING" && (
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => setIsClosed(true)}
            >
              Tugugatish
            </Button>
          )}
          <Button onClick={() => navigate(`/sale/edit/${id}`)}>
            O‘zgartirish
          </Button>
          <Button danger onClick={handleDelete}>
            O‘chirish
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setPaidOpen(true);
            }}
          >
            Yangi to‘lov qo‘shish
          </Button>
        </Space>
      </Row>

      <div className="flex gap-6">
        <div className="w-[30%] flex flex-col gap-6">
          <Descriptions
            bordered
            column={1}
            size="small"
            title="Sotuv ma'lumotlari"
          >
            <Descriptions.Item label="Sana">
              {sale?.date ? dayjs(sale.date).format("YYYY-MM-DD") : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Kod">
              {sale?.code ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Mijoz">
              {sale?.client?.name ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Umumiy narx">
              {sale?.price != null
                ? sale.price.toLocaleString("uz-UZ") + " so'm"
                : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="To‘langan">
              {sale?.dept != null
                ? sale.dept.toLocaleString("uz-UZ") + " so'm"
                : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="Qarz">
              {sale?.credit != null
                ? sale.credit.toLocaleString("uz-UZ") + " so'm"
                : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="Holati">
              {sale?.state ?? "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Yaratilgan">
              {sale?.createdAt
                ? dayjs(sale.createdAt).tz("Asia/Tashkent").format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
            <Descriptions.Item label="O'zgartirilgan">
              {sale?.updatedAt
                ? dayjs(sale.updatedAt).tz("Asia/Tashkent").format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions
            bordered
            column={1}
            size="small"
            title="Mijoz ma'lumotlari"
          >
            <Descriptions.Item label="Ismi">
              {sale?.client?.name ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="INN">
              {sale?.client?.inn ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Telefon">
              {sale?.client?.phone ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Balans">
              {sale?.client?.balance != null
                ? sale.client.balance.toLocaleString("uz-UZ") + " so'm"
                : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="Manzil">
              {sale?.client?.address ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Viloyat">
              {sale?.client?.Region?.name ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Tuman">
              {sale?.client?.District?.name ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Tavsif">
              {sale?.client?.description ?? "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Mijoz turi">
              {types?.data?.find((t) => t.id === sale?.client?.typeId)?.name ??
                "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Yaratilgan">
              {sale?.client?.createdAt
                ? dayjs(sale.client.createdAt)
                    .tz("Asia/Tashkent")
                    .format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
            <Descriptions.Item label="O'zgartirilgan">
              {sale?.client?.updatedAt
                ? dayjs(sale.client.updatedAt)
                    .tz("Asia/Tashkent")
                    .format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <div className="w-[70%] flex flex-col gap-6">
          <Card
            title="Sotilgan mahsulotlar"
            bordered={false}
            className="w-full"
            style={{ paddingBottom: 0 }}
          >
            <Table
              dataSource={saleProducts?.data || []}
              columns={productColumns}
              rowKey="id"
              pagination={{
                current: page,
                pageSize: limit,
                total: saleProducts?.total || saleProducts?.data?.length || 0,
                onChange: setPage,
              }}
            />
          </Card>
          <Card
            title="Qilingan ishlar ro‘yxati"
            bordered={false}
            style={{ paddingBottom: 0 }}
          >
            <div className="w-full flex gap-2 mb-4">
              <SaleTodoInput saleId={Number(id)} saleFeedback={saleFeedback} />
            </div>
            <Table
              dataSource={saleTodo?.data || []}
              columns={saleTodoColumns}
              className="w-full"
              rowKey="id"
              pagination={{
                current: pageSale,
                pageSize: limit,
                total: saleTodo?.total || saleTodo?.data?.length || 0,
                onChange: setPageSale,
              }}
            />
            <Table
              dataSource={saleFeedback?.data || []}
              columns={saleFeedbackColumns}
              rowKey="id"
              pagination={false}
            />
            <div className="flex gap-2 mt-4">
              {saleFeedback?.data[0]?.state === "TODO" && (
                <Button icon={<PlusOutlined />} type="primary">
                  Ishni boshlash
                </Button>
              )}

              {saleFeedback?.data[0]?.state === "RUNNING" && (
                <Button icon={<PlusOutlined />} type="primary">
                  Ish bajarib tugallanganligini belgilash
                </Button>
              )}

              {saleFeedback?.data[0]?.state === "COMPLETED" && (
                <Button icon={<PlusOutlined />} type="primary">
                  Ishni qayta bajarish
                </Button>
              )}

              {saleFeedback?.data[0]?.state === "REJECT" && (
                <Button icon={<PlusOutlined />} type="primary">
                  Ishni qayta bajarishni boshlash
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
      <PaidClientFormModal
        open={paidOpen}
        onClose={() => {
          setPaidOpen(false);
        }}
        onSubmit={onSubmit}
        clients={clients?.data || []}
        sales={sales?.data || []}
        payments={payments?.data || []}
        clientId={Number(sale?.client?.id)}
        saleId={currentId}
      />

      <Modal
        title="Tasdiqlash"
        open={isClosed}
        onOk={() => onClosed()}
        onCancel={() => setIsClosed(false)}
        okText="Ha"
        cancelText="Yo'q"
      >
        Rostdan ushbu savdoni tugatmoqchimisiz?
      </Modal>
      {editTodo && (
        <Modal
          open={true}
          title="Ishni tahrirlash"
          footer={null}
          onCancel={() => setEditTodo(null)}
          destroyOnClose
        >
          <SaleUpdateModal
            saleId={Number(id)}
            saleFeedback={saleFeedback}
            initialData={editTodo}
            onClose={() => setEditTodo(null)}
          />
        </Modal>
      )}
    </Card>
  );
}
