import { Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Link to={"/"} type="primary">
        Bosh sahifage qaytish
      </Link>
    }
  />
);

export default NotFound;
