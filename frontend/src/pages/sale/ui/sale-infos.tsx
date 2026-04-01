import { Descriptions } from "antd";
import dayjs from "dayjs";
import { useGetAllClientTypes } from "../../../config/queries/clients/client-type-querys";

export default function SaleInfos({ sale , modify}: { sale: any, modify: any }) {
  const { data: types } = useGetAllClientTypes();

  return (
    <div className="w-[30%] flex flex-col gap-6">
      <Descriptions bordered column={1} size="small" title="Sotuv ma'lumotlari">
        <Descriptions.Item label="Sana">
          {sale?.date ? dayjs(sale.date).format("YYYY-MM-DD") : "-"}
        </Descriptions.Item>
        <Descriptions.Item label="Kod">{sale?.code ?? "-"}</Descriptions.Item>
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
        <Descriptions.Item label="Yangilangan / Kim tomonidan">
          {sale?.updatedAt
            ? dayjs(sale.updatedAt).tz("Asia/Tashkent").format("YYYY-MM-DD")
            : "Noma'lum"}
            {modify ? ` / ${modify.name}` : ""}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions bordered column={1} size="small" title="Mijoz ma'lumotlari">
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
          {types?.data?.find((t) => t.id === sale?.client?.typeId)?.name ?? "—"}
        </Descriptions.Item>
        <Descriptions.Item label="Yaratilgan">
          {sale?.client?.createdAt
            ? dayjs(sale.client.createdAt)
                .tz("Asia/Tashkent")
                .format("YYYY-MM-DD")
            : "Noma'lum"}
        </Descriptions.Item>
        <Descriptions.Item label="Yangilangan">
          {sale?.client?.updatedAt
            ? dayjs(sale.client.updatedAt)
                .tz("Asia/Tashkent")
                .format("YYYY-MM-DD")
            : "Noma'lum"}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
}
