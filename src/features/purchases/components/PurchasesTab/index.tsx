import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";

const items: TabsProps["items"] = [
  {
    key: routes.PURCHASE_INVOICES,
    label: <Link to={routes.PURCHASE_INVOICES}>Xaridlar</Link>,
    children: <Outlet />,
  },
  {
    key: routes.PURCHASE_PRODUCTS,
    label: <Link to={routes.PURCHASE_PRODUCTS}>Yo'ldagi tovorlar </Link>,
    children: <Outlet />,
  },
];

const PurchasesTab: React.FC = () => (
  <div className="purchases_tab">
    <Tabs defaultActiveKey={routes.PURCHASE_INVOICES} items={items} />
  </div>
);

export default PurchasesTab;
