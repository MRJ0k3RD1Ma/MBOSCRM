import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

const nameMap: Record<string, string> = {
  dashboard: "Bosh sahifa",
  clients: "Mijozlar",
  "client-type": "Mijoz turlari",
  client: "Mijoz tafsiloti",
  products: "Mahsulotlar",
  "product-group": "Mahsulot guruhlari",
  "product-unit": "O‘lchov birliklari",
  product: "Mahsulot tafsiloti",
  suppliers: "Ta'minotchilar",
  supplier: "Ta'minotchi tafsiloti",
  "paid-suppliers": "To‘lov qilingan ta'minotchilar",
  payment: "To‘lov turlari",
  arriveds: "Kirimlar",
  arrived: "Kirim tafsiloti",
  "arrived/create": "Yangi kirim",
  "arrived/edit": "Kirimni tahrirlash",
  profile: "Profil",
};

export function usePageTitle() {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter(Boolean);
  const lastKey = pathSnippets.slice(0).join("/");
  const lastSegment = pathSnippets[pathSnippets.length - 1];
  return nameMap[lastKey] || nameMap[lastSegment] || "Bosh sahifa";
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

  const items = [
    <Breadcrumb.Item key="dashboard">
      <Link to="/dashboard">Bosh sahifa</Link>
    </Breadcrumb.Item>,
    ...pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
      const name =
        nameMap[pathSnippets[index]] ||
        (!isNaN(Number(pathSnippets[index]))
          ? "Tafsilot"
          : pathSnippets[index]);
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return <Breadcrumb style={{ margin: "16px 24px 0" }}>{items}</Breadcrumb>;
}
