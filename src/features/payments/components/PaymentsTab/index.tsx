import React from "react";
import { Tabs } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { routes } from "@/constants/routes";
import "./styles.scss";
import { useTranslation } from "react-i18next";

const items = (t: any) => {
  return [
    {
      key: routes.INCOMING_PAYMENTS,
      label: (
        <Link to={routes.INCOMING_PAYMENTS}>
          {t("navigation.incomingPayments")}
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: routes.OUTGOING_PAYMENTS,
      label: (
        <Link to={routes.OUTGOING_PAYMENTS}>
          {t("navigation.outgoingPayments")}
        </Link>
      ),
      children: <Outlet />,
    },
  ];
};

const PaymentsTab: React.FC = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const activeKey = location.pathname.split("/")[2];

  return (
    <div className="payments_tab">
      <Tabs
        defaultActiveKey={routes.INCOMING_PAYMENTS}
        activeKey={activeKey}
        items={items(t)}
      />
    </div>
  );
};

export default PaymentsTab;
