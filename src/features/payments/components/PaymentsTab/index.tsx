import React from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { Link, Outlet } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";

const items: TabsProps["items"] = [
  {
    key: routes.INCOMING_PAYMENTS,
    label: <Link to={routes.INCOMING_PAYMENTS}>Kirim to'lovlari</Link>,
    children: <Outlet />,
  },
  {
    key: routes.OUTGOING_PAYMENTS,
    label: <Link to={routes.OUTGOING_PAYMENTS}>Chiqim to'lovlari </Link>,
    children: <Outlet />,
  },
];

const PaymentsTab: React.FC = () => (
  <div className="payments_tab">
    <Tabs defaultActiveKey={routes.INCOMING_PAYMENTS} items={items} />
  </div>
);

export default PaymentsTab;
