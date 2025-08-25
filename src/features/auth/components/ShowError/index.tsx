import { Result } from "antd";
import type { FC } from "react";

interface IProps {
  message: string | null;
}

const ShowError: FC<IProps> = ({ message }) => {
  return (
    <>
      <Result status="error" title={message} />
    </>
  );
};

export default ShowError;
