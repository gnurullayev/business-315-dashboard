import React from "react";
import { Tabs } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const items = (t: any) => {
  return [
    {
      key: routes.SALES_ORDERS,
      label: (
        <Link to={routes.SALES_ORDERS}>{t("navigation.salesOrders")}</Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.SALES,
      label: <Link to={routes.SALES}>{t("navigation.sales")}</Link>,
      children: <Outlet />,
    },
    {
      key: routes.CANCELED_SALES,
      label: (
        <Link to={routes.CANCELED_SALES}>{t("navigation.canceledSales")}</Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.SALES_REPORTS,
      label: (
        <Link to={routes.SALES_REPORTS}>{t("navigation.salesReports")}</Link>
      ),
      children: <Outlet />,
    },
  ];
};

const SalesTab: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const activeKey = location.pathname.split("/")[2];

  return (
    <div className="sales_tab">
      <Tabs
        defaultActiveKey={routes.SALES_ORDERS}
        activeKey={activeKey}
        items={items(t)}
      />
    </div>
  );
};

export default SalesTab;
