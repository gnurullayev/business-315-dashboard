import React, { type ReactNode } from "react";
import PageHeader from "./PageHeader";
import "./styles.scss";
import PageSidebar from "./PageSidebar";
import { useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  console.log(path);

  return (
    <>
      {path !== "pdf" ? (
        <div className="layout">
          <PageHeader />
          <div className="layout_inner">
            <PageSidebar />
            <main className="layout_main">{children}</main>
          </div>
        </div>
      ) : (
        <div className="pdf-layout">{children}</div>
      )}
    </>
  );
};

export default DefaultLayout;
