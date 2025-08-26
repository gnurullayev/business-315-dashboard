import React from "react";
import { Tabs } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const items = (t: any) => {
  return [
    {
      key: routes.STOCKS_PRODUCTS,
      label: (
        <Link to={routes.STOCKS_PRODUCTS}>{t("navigation.stockProducts")}</Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.STOCKS_INCOMING_PRODUCTS,
      label: (
        <Link to={routes.STOCKS_INCOMING_PRODUCTS}>
          {t("navigation.incomingProducts")}
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.STOCKS_RECEIVING_PRODUCTS,
      label: (
        <Link to={routes.STOCKS_RECEIVING_PRODUCTS}>
          {t("navigation.stockReceivingProducts")}
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.STOCKS_DELIVERED_PRODUCTS,
      label: (
        <Link to={routes.STOCKS_DELIVERED_PRODUCTS}>
          {t("navigation.deliveredProducts")}
        </Link>
      ),
      children: <Outlet />,
    },
  ];
};

const StocksTab: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const activeKey = location.pathname.split("/")[2];

  return (
    <div className="stocks_tab">
      <Tabs
        defaultActiveKey={routes.STOCKS_PRODUCTS}
        activeKey={activeKey}
        items={items(t)}
      />
    </div>
  );
};

export default StocksTab;
