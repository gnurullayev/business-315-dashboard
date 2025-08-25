import { type FC } from "react";
import "./styles.scss";
import { Spin } from "antd";

const Loader: FC<any> = ({ familyInPageSpinner = false }) => {
  return (
    <div
      className={`ui-loader ${
        familyInPageSpinner ? "in-page-loader" : "full-page-loader"
      }`}
    >
      <div className="content">
        <Spin />
      </div>
    </div>
  );
};

export default Loader;
