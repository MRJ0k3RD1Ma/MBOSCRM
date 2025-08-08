import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const nameMap: Record<string, string> = {
  dashboard: "Bosh sahifa",
  subscribes: "Obunalar",
  "sale/create": "Sotuvni amalga oshirish",
  sales: "Sotilgan mahsulotlar",
  "sales-credit": "Qarzdorliklar",
  "price-curant": "Prayskurant",
  "paid-clients": "Mijoz to‘lovlari",
  "paid-suppliers": "Yetkazuvchilarga to‘langanlar",
  "paid-other": "Boshqa xarajatlar",
  "paid-server": "Server xarajatlari",
  "arrived/create": "Mahsulot qabul qilish",
  arriveds: "Skladga qabul qilingan mahsulotlar",
  "arriveds-credit": "Qoldiqlar",
  servers: "Serverlar",
  products: "Mahsulotlar ro‘yxati",
  "product-group": "Mahsulot guruhlari",
  "product-unit": "Mahsulot birliklari",
  clients: "Mijozlar ro‘yxati",
  "clients-credit": "Qarzdor mijozlar",
  "clients-over-paid": "Ortiqcha to‘lagan mijozlar",
  "client-type": "Mijoz turlari",
  suppliers: "Yetkazib beruvchilar ro‘yxati",
  "paid-suppliers-list": "To‘lov qilingan yetkazuvchilar",
  "arrived-products": "Kelgan mahsulotlar",
  "supplier-credit": "Qarzlarim",
  "supplier-over-paid": "Ortiqcha to‘lovlar",
  "paid-other-group": "Boshqa xarajatlar guruhi",
  payment: "To‘lov turlari",
  client: "Mijoz tafsiloti",
  product: "Mahsulot tafsiloti",
  supplier: "Yetkazib beruvchi tafsiloti",
  arrived: "Kirim tafsiloti",
  "arrived/edit": "Kirimni tahrirlash",
  sale: "Sotuv tafsiloti",
  subscribe: "Obuna tafsiloti",
  profile: "Profil",
};

export function usePageTitle() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(Boolean);

  const fullPath = pathSnippets.join("/");
  const lastKey = pathSnippets[pathSnippets.length - 1];

  return nameMap[fullPath] || nameMap[lastKey] || "Sahifa";
}

export default function BreadcrumbNav() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(Boolean);
  if (pathSnippets.length === 1 && pathSnippets[0] === "dashboard") {
    return (
      <Breadcrumb style={{ margin: "16px 24px 0" }}>
        <Breadcrumb.Item key="dashboard">
          <Link to="/dashboard">Bosh sahifa</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
    );
  }

  const breadcrumbItems = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Bosh sahifa</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const segmentKey = pathSnippets[index];
      const name =
        nameMap[url.slice(1)] ||
        nameMap[segmentKey] ||
        (Number(segmentKey) ? "Tafsilot" : segmentKey);

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <Breadcrumb style={{ margin: "16px 24px 0" }}>{breadcrumbItems}</Breadcrumb>
  );
}
