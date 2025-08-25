import { Layout, Menu } from "antd";
import { useEffect, useState } from "react";
import "./styles.scss";
import { navigation } from "@/components/shared/navigation";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const items: any = (t: any) =>
  navigation.map((item) => ({
    key: item.key,
    icon: item.icon,
    label: <Link to={item.href}>{t(item.title)}</Link>,
  }));

const PageSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    setSelectedKey(location.pathname.split("/")[1]);
  }, [location.pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className="sidebar"
      theme="light"
    >
      <div className="demo-logo-vertical" />
      <Menu
        mode="inline"
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        style={{ height: "100%", borderInlineEnd: 0 }}
        items={items(t)}
      />
    </Sider>
  );
};

export default PageSidebar;
