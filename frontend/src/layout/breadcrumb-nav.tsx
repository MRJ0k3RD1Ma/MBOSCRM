import { Link, useLocation } from "react-router-dom";

import { Breadcrumb } from "antd";

const nameMap: Record<string, string> = {
  dashboard: "Bosh sahifa",
  subscribes: "Obunalar",
  "sale/create": "Sotuvni amalga oshirish",
  sales: "Sotilgan mahsulotlar",
  "sales-credit": "Qarzdorliklar",
  "price-curant": "Prayskurant",
  "paid-clients": "Mijoz to‘lovlari",
  "paid-suppliers": "Yetkazuvchilarga to‘langanlar",
  "paid-other": "Boshqa to‘lovlar",
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
  "supplier-credit": "Qarzdor yetkazib beruvchilar",
  "supplier-over-paid": "Ortiqcha to‘lovlar",
  "paid-other-group": "Boshqa xarajatlar guruhi",
  payment: "To‘lov turlari",
  client: "Mijoz tafsiloti",
  feedbacks: "Fikr-mulohazalar",
  product: "Mahsulot tafsiloti",
  supplier: "Yetkazib beruvchi tafsiloti",
  arrived: "Kirim tafsiloti",
  "arrived/edit": "Kirimni tahrirlash",
  sale: "Sotuv tafsiloti",
  subscribe: "Obuna tafsiloti",
  users: "Foydalanuvchilar ro’yhati",
  profile: "Profil",
  appeals: "Murojatlar",
  simcard: "Simkartalar",
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
      const segmentKey = pathSnippets[index];
      let url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      // Redirect map for singular -> plural routes
      // This maps segments like "client" to "clients"
      const redirectMap: Record<string, string> = {
        client: "clients",
        sale: "sales",
        product: "products",
        supplier: "suppliers",
        subscribe: "subscribes",
        arrived: "arriveds",
      };

      if (redirectMap[segmentKey]) {
        // Replace the last segment with the plural form
        const newSnippets = [...pathSnippets.slice(0, index), redirectMap[segmentKey]];
        url = `/${newSnippets.join("/")}`;

        // Use state if available to persist filters (e.g. ?page=2)
        // We only append this to the list page link, not deeper segments if any
        if (location.state && (location.state as any).search) {
          url += (location.state as any).search;
        }
      }

      const name =
        nameMap[url.slice(1)] || // Check renamed URL first
        nameMap[url.replace(/\?.*/, "").slice(1)] || // Check renamed URL without query params
        nameMap[segmentKey] ||
        (Number(segmentKey) ? "Tafsilot" : segmentKey);

      return (
        <Breadcrumb.Item key={url}>
          {/* If it's the last item, don't link it (optional, but good UX) OR keep link but it's redundant */}
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    }),
  ];

  return (
    <Breadcrumb style={{ margin: "16px 24px 0" }}>{breadcrumbItems}</Breadcrumb>
  );
}
