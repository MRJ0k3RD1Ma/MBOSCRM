import { Card, Col, Descriptions, Row } from "antd";

import dayjs from "dayjs";
import { useGetAllSuppliers } from "../../../config/queries/supplier/supplier-querys";
import { useGetArrivedById } from "../../../config/queries/arrived/arrived-qureys";

export default function ArrivedPageInfos({
  currentId,
}: {
  currentId: number | null;
}) {
  const { data: arrived, isLoading } = useGetArrivedById(
    currentId ?? undefined
  );
  const { data: suppliers } = useGetAllSuppliers();
  const supplier = suppliers?.data?.find((p) => p.id === arrived?.supplierId);
  return (
    <Card bordered={false} loading={isLoading} className="!w-full mb-4">
      <Row gutter={16}>
        <Col span={12}>
          <Descriptions
            bordered
            column={1}
            size="small"
            title="Qabul qilingan mahsulotlar ma'lumotlari"
          >
            <Descriptions.Item label="Sana">
              {arrived?.date ? dayjs(arrived.date).format("YYYY-MM-DD") : "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Kod">{arrived?.code}</Descriptions.Item>
            <Descriptions.Item label="Nakladnoy">
              {arrived?.waybillNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Ta'minotchi">
              {suppliers?.data?.find((p) => p.id === arrived?.supplierId)
                ?.name || `ID: ${arrived?.supplierId}`}
            </Descriptions.Item>
            <Descriptions.Item label="Izoh">
              {arrived?.description}
            </Descriptions.Item>
            <Descriptions.Item label="Umumiy narx">
              {arrived?.price
                ? arrived?.price.toLocaleString("uz-UZ") + " so'm"
                : "0"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
        <Col span={12}>
          <Descriptions
            bordered
            column={1}
            size="small"
            title="Yetkazuvchi ma'lumotlari"
          >
            <Descriptions.Item label="ID">
              {supplier?.id || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Nomi">
              {supplier?.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Telefon">
              {supplier?.phone || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Qo‘shimcha telefon">
              {supplier?.phoneTwo || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Izoh">
              {supplier?.description || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Balans">
              {supplier?.balance ?? 0}
            </Descriptions.Item>
            <Descriptions.Item label="Kiritdi">
              {supplier?.register?.name || "-"}
            </Descriptions.Item>
            <Descriptions.Item label="Yaratildi">
              {supplier?.createdAt
                ? dayjs(supplier.createdAt)
                    .tz("Asia/Tashkent")
                    .format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
            <Descriptions.Item label="O’zgartirildi">
              {supplier?.updatedAt
                ? dayjs(supplier.updatedAt)
                    .tz("Asia/Tashkent")
                    .format("YYYY-MM-DD")
                : "Noma'lum"}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </Card>
  );
}
