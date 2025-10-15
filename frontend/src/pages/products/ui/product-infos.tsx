import { Card, Descriptions } from "antd";

import dayjs from "dayjs";
import { useGetAllProductGroups } from "../../../config/queries/products/product-gorup-querys";
import { useGetAllProductUnits } from "../../../config/queries/products/product-unit-querys";

export default function ProductInfos({ product }: { product: any }) {
  const { data: productUnitId } = useGetAllProductUnits();
  const { data: productGroupId } = useGetAllProductGroups();

  return (
    <Card
      style={{ flex: 1, maxWidth: 480 }}
      title="Mahsulot haqida ma’lumotlar"
    >
      <Descriptions bordered column={1} size="small">
        <Descriptions.Item label="ID">{product.id || "-"}</Descriptions.Item>
        <Descriptions.Item label="Nomi">
          {product.name || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Shtrix kod">
          {product.barcode || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Guruh">
          {productGroupId?.data.find((p) => p.id === product.groupId)?.name ||
            "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Birligi">
          {productUnitId?.data.find((p) => p.id === product.unitId)?.name ||
            "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Kelish narxi">
          {product.priceIncome ? product.priceIncome.toLocaleString("uz-UZ") + " so'm" : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Sotish narxi">
          {product.price ? product.price.toLocaleString("uz-UZ") + " so'm" : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Skladdagi qoldiq va birligi">
          {product.countReminder}{" "}
          {productUnitId?.data.find((p) => p.id === product.unitId)?.name ||
            "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Skladdagi birinchi qoldiq">
          {product.reminderFirst || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Umumiy sotilgan soni">
          {product.countSale || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Umumiy kelgan soni">
          {product.countArrived || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Turi">
          {product.type || "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Yaratilgan">
          {product.createdAt
            ? dayjs(product.createdAt).tz("Asia/Tashkent").format("YYYY-MM-DD")
            : "Noma'lum"}
        </Descriptions.Item>
        <Descriptions.Item label="O'zgartirilgan">
          {product.updatedAt
            ? dayjs(product.updatedAt).tz("Asia/Tashkent").format("YYYY-MM-DD")
            : "Noma'lum"}
        </Descriptions.Item>
      </Descriptions>
    </Card>
  );
}
