import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useState, type FC } from "react";
import PaymentModalForm from "../PaymentModalForm";

interface IProps {
  handleClose: () => void;
}

const PurchaseShowModalFooter: FC<IProps> = ({ handleClose }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="order_create_form__footer">
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("purchases.pay")}
      </Button>
      <Button type="default" onClick={handleClose}>
        {t("general.cancel")}
      </Button>
      <PaymentModalForm open={open} setOpen={setOpen} setReload={() => null} />
    </div>
  );
};

export default PurchaseShowModalFooter;
