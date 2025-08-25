import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
interface IProps {
  handleClose: () => void;
  loading: boolean;
}

const SalesOrderFooter: FC<IProps> = ({ loading, handleClose }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="order_create_form__comment">
        <Form.Item
          name={"comment"}
          label={t("general.comment")}
          layout="vertical"
        >
          <TextArea rows={4} />
        </Form.Item>
      </div>

      <div className="order_create_form__footer">
        <Button type="default" onClick={handleClose}>
          {t("general.back")}
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          loading={loading}
          disabled={loading}
        >
          {t("general.add")}
        </Button>
      </div>
    </>
  );
};

export default SalesOrderFooter;
