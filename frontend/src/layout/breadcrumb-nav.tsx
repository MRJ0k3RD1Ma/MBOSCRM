import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const nameMap: Record<string, string> = {
  dashboard: "Bosh sahifa",
  clients: "Mijozlar",
  "client-type": "Mijoz turlari",
  "paid-clients": "To'langan mijozlar",
  client: "Mijoz tafsiloti",
  products: "Mahsulotlar",
  "product-group": "Mahsulot guruhlari",
  "product-unit": "O‘lchov birliklari",
  product: "Mahsulot tafsiloti",
  suppliers: "Ta'minotchilar",
  "paid-suppliers": "To‘langan ta'minotchilar",
  supplier: "Ta'minotchi tafsiloti",
  payment: "To‘lov turlari",
  arriveds: "Kirimlar (ombor)",
  arrived: "Kirim tafsiloti",
  "arrived/create": "Kirim qo‘shish",
  "arrived/edit": "Kirimni tahrirlash",
  sales: "Sotuvlar",
  sale: "Sotuv tafsiloti",
  subscribes: "Obunalar",
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
