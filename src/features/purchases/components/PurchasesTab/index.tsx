import React from "react";
import { Tabs } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const items = (t: any) => {
  return [
    {
      key: routes.PURCHASE_INVOICES,
      label: (
        <Link to={routes.PURCHASE_INVOICES}>
          {t("navigation.purchaseInvoices")}
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.PURCHASE_PRODUCTS,
      label: (
        <Link to={routes.PURCHASE_PRODUCTS}>
          {t("navigation.receivingProducts")}
        </Link>
      ),
      children: <Outlet />,
    },
  ];
};

const PurchasesTab: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const activeKey = location.pathname.split("/")[2];

  return (
    <div className="purchases_tab">
      <Tabs
        defaultActiveKey={routes.PURCHASE_INVOICES}
        activeKey={activeKey}
        items={items(t)}
      />
    </div>
  );
};

export default PurchasesTab;
