import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";

const items: TabsProps["items"] = [
  {
    key: routes.SALES_ORDERS,
    label: <Link to={routes.SALES_ORDERS}>Sotuvlar buyurtmasi</Link>,
    children: <Outlet />,
  },
  {
    key: routes.SALES,
    label: <Link to={routes.SALES}>Sotuvlar </Link>,
    children: <Outlet />,
  },
  {
    key: routes.CANCELED_SALES,
    label: <Link to={routes.CANCELED_SALES}>Bekor qilingan sotuvlar </Link>,
    children: <Outlet />,
  },
  {
    key: routes.SALES_REPORTS,
    label: <Link to={routes.SALES_REPORTS}>Sotuv hisobotlari </Link>,
    children: <Outlet />,
  },
];

const SalesTab: React.FC = () => (
  <div className="sales_tab">
    <Tabs defaultActiveKey={routes.SALES_ORDERS} items={items} />
  </div>
);

export default SalesTab;
