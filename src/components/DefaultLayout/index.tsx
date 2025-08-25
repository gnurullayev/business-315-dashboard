import React, { type ReactNode } from "react";
import PageHeader from "./PageHeader";
import "./styles.scss";
import PageSidebar from "./PageSidebar";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="layout">
      <PageHeader />
      <div className="layout_inner">
        <PageSidebar />
        <main className="layout_main">{children}</main>
      </div>
    </div>
  );
};

export default DefaultLayout;
