import { Card, Descriptions, Spin, Table, Tag, Typography } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetAllSubscribes,
  useGetSubscribeById,
  type Subscribe,
} from "../../config/queries/subscribe/subscribe-querys";

import dayjs from "dayjs";
import { indexColumn } from "../../components/tables/indexColumn";
import timezone from "dayjs/plugin/timezone";
import { useState } from "react";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

const { Title } = Typography;

export default function Subscribe() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { data, isLoading, isError } = useGetSubscribeById(numericId);
  const { data: allSubscribes } = useGetAllSubscribes({
    page,
    limit,
    saleId: data?.sale?.id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !data) {
    return <div>Xatolik yuz berdi yoki subscribe topilmadi.</div>;
  }
  const { client, sale } = data;

  const formatDate = (
    date: string | null | undefined,
    format = "YYYY-MM-DD HH:mm"
  ) => (date ? dayjs.utc(date).tz("Asia/Tashkent").format(format) : "-");

  const productColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    {
      title: "Mahsulot nomi",
      dataIndex: ["product", "name"],
      key: "name",
    },
    {
      title: "Soni",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Narxi",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `${price.toLocaleString("uz-UZ")} so'm`,
    },
    {
      title: "Umumiy narx",
      key: "total",
      render: (record: any) =>
        `${(record.count * record.price).toLocaleString("uz-UZ")} so'm`,
    },
  ];

  const columns = [
    indexColumn(page, limit),
    {
      title: "To‘lov sanasi",
      dataIndex: "paying_date",
      render: (date: string) =>
        dayjs.utc(date).tz("Asia/Tashkent").format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Shartnoma raqami",
      dataIndex: "sale",
      render: (sale: any) => (
        <a
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/sale/${sale.id}`);
          }}
          style={{ color: "#1677ff", cursor: "pointer" }}
        >
          {"#" + sale?.code || "Noma'lum"}
        </a>
      ),
    },
    {
      title: "Mijoz",
      dataIndex: "client",
      render: (client: any) => client?.name || "Noma'lum",
    },
    {
      title: "Sotuv",
      dataIndex: "sale",
      render: (sale: any) => sale?.id || "-",
    },
    {
      title: "Sotuvdagi mahsulotlar",
      render: (_: any, record: any) => {
        if (!record?.sale?.SaleProduct?.length) return "-";

        return record.sale.SaleProduct.map((item: any) => {
          const name = item?.product?.name || "";
          return name.length > 7 ? name.slice(0, 7) + "..." : name;
        }).join(", ");
      },
    },
    {
      title: "Narx",
      dataIndex: "price",
      render: (price: number) =>
        price ? price.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "To‘langan", dataIndex: "paid",
      render: (paid: number) =>
        paid ? paid.toLocaleString("uz-UZ") + " so'm" : "0",
    },
    {
      title: "Holat",
      dataIndex: "state",
      render: (state: string) => {
        const color = state === "PAID" && "PAYING" ? "green" : "red";
        return <Tag color={color}>{state}</Tag>;
      },
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6 space-y-6 overflow-auto h-[820px]">
      <Title level={3}>
        Obuna shartnomasi: <Link to={`/sale/${sale.id}`}>#{sale.code}</Link>
      </Title>

      <div className="flex gap-6">
        {sale && (
          <Card title="Sotuv ma'lumotlari" className="w-[40%]">
            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="ID">{sale.id}</Descriptions.Item>
              <Descriptions.Item label="Sana">
                {formatDate(sale.date, "YYYY-MM-DD")}
              </Descriptions.Item>
              <Descriptions.Item label="Code">{sale.code}</Descriptions.Item>
              <Descriptions.Item label="Ism">
                <Link to={`/client/${client.id}`}>{client.name}</Link>
              </Descriptions.Item>
              <Descriptions.Item label="Telefon ">
                {client.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Narx">{sale.price}</Descriptions.Item>
              <Descriptions.Item label="Holat">{sale.state}</Descriptions.Item>
              <Descriptions.Item label="Obuna boshlangan sana">
                {formatDate(sale.subscribe_begin_date)}
              </Descriptions.Item>
              <Descriptions.Item label="Obuna har necha kunda yaratiladi">
                {sale.subscribe_generate_day}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        )}

        {sale?.SaleProduct?.length > 0 && (
          <Card title="Sotuvdagi mahsulotlar" className="w-full">
            <Table
              className="w-full"
              columns={productColumns}
              dataSource={sale.SaleProduct}
              rowKey="id"
              pagination={false}
            />
          </Card>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <Card title="Obuna ma'lumotlari" className="w-full">
          <Descriptions bordered column={1} size="middle">
            <Descriptions.Item label="To‘lov sanasi">
              {formatDate(data.paying_date)}
            </Descriptions.Item>
            <Descriptions.Item label="Narxi">
              {data.price ? data.price.toLocaleString("uz-UZ") + " so'm" : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="To‘langan">
              {data.paid ? data.paid.toLocaleString("uz-UZ") + " so'm" : "0"}
            </Descriptions.Item>
            <Descriptions.Item label="Holati">{data.state}</Descriptions.Item>
            <Descriptions.Item label="Yaratilgan">
              {formatDate(data.createdAt)}
            </Descriptions.Item>
            <Descriptions.Item label="Yangilangan">
              {formatDate(data.updatedAt)}
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card title="Sotuvdagi mahsulotlar" className="w-full">
          <Table
            columns={columns}
            dataSource={allSubscribes?.data || []}
            loading={isLoading}
            rowKey="id"
            onRow={() => ({
              onClick: () => navigate(`/sale/${sale.id}`),
            })}
            pagination={{
              current: page,
              pageSize: limit,
              total: allSubscribes?.total,
              onChange: (page) => setPage(page),
            }}
          />
        </Card>
      </div>
    </div>
  );
}
