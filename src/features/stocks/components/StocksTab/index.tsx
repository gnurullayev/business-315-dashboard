import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";

const items: TabsProps["items"] = [
  {
    key: routes.STOCKS_PRODUCTS,
    label: <Link to={routes.STOCKS_PRODUCTS}>Tovar jo'natish</Link>,
    children: <Outlet />,
  },
  {
    key: routes.STOCKS_INCOMING_PRODUCTS,
    label: <Link to={routes.STOCKS_INCOMING_PRODUCTS}>Kiruvchi tovarlar </Link>,
    children: <Outlet />,
  },
  {
    key: routes.STOCKS_RECEIVING_PRODUCTS,
    label: <Link to={routes.STOCKS_RECEIVING_PRODUCTS}>Kelgan tovarlar </Link>,
    children: <Outlet />,
  },
  {
    key: routes.STOCKS_DELIVERED_PRODUCTS,
    label: (
      <Link to={routes.STOCKS_DELIVERED_PRODUCTS}>
        Yetkazib berilgan tovarlar{" "}
      </Link>
    ),
    children: <Outlet />,
  },
];

const StocksTab: React.FC = () => (
  <div className="stocks_tab">
    <Tabs defaultActiveKey={routes.STOCKS_PRODUCTS} items={items} />
  </div>
);

export default StocksTab;
