import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { useState, type FC } from "react";
import PaymentModalForm from "../PaymentModalForm";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import { toast } from "react-toastify";

interface IProps {
  handleClose: () => void;
  docEntry: number;
}

const PurchaseShowModalFooter: FC<IProps> = ({ handleClose, docEntry }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: number) => API.postPurchaseInvoicesCancel(data),
    onSuccess: () => {
      toast.success("Xarid bekor qilindi");
      handleClose();
    },
  });

  const cancelPurchase = () => {
    mutate(docEntry);
  };

  return (
    <div className="order_create_form__footer">
      <Button type="primary" onClick={() => setOpen(true)}>
        {t("purchases.pay")}
      </Button>

      <Button
        type="default"
        onClick={cancelPurchase}
        loading={isPending}
        disabled={isPending}
      >
        {t("general.cancel")}
      </Button>
      <PaymentModalForm open={open} setOpen={setOpen} setReload={() => null} />
    </div>
  );
};

export default PurchaseShowModalFooter;
