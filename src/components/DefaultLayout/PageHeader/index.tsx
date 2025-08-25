import { Dropdown, Layout, type MenuProps } from "antd";
import { Logo } from "@/assets/images";
import { DownOutlined } from "@ant-design/icons";
import "./styles.scss";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { dispatch } from "@/store";
import { useSelector } from "react-redux";
import type { User } from "@/types/user";

const { Header } = Layout;
interface PageHeaderProps {
  title?: string;
}

const items: MenuProps["items"] = [
  {
    key: "logout",
    label: "Chiqish",
  },
];

const PageHeader: React.FC<PageHeaderProps> = () => {
  const user: User = useSelector((state: any) => state.userData?.user);
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    dispatch.auth.logoutAsync();
  };

  return (
    <Header className="header">
      <div className="header_logo">
        <img src={Logo} alt="logo" />
      </div>

      <div className="header_right">
        <LanguageSwitcher />

        <Dropdown menu={{ items, onClick: handleMenuClick }}>
          <div className="header_right__dropdown">
            <span className="header_right__user">{user.firstName?.[0]}</span>
            {user.firstName} {user.lastName}
            <DownOutlined />
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default PageHeader;
