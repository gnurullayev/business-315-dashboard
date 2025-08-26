import { Form, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import PurchaseCreateHeader from "./PurchaseCreateHeader";
import PurchaseCreateItemsTable from "./PurchaseCreateTable";
import PurchaseCreateFooter from "./PurchaseCreateFooter";
import "./styles.scss";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { mapPurchaseCreatePayload } from "../../lib/purchaseCreate";
import { Currencies } from "@/enums";
import dayjs from "dayjs";
interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  purchaseRefetch: () => void;
}

const PurchaseCreateCreate: FC<IProps> = ({
  open,
  setOpen,
  purchaseRefetch,
}) => {
  const [formInstance] = Form.useForm();
  const userInfo = useSelector((store: RootState) => store.userData);
  const { data: docRate } = useQuery({
    queryKey: ["getCurrencyRate"],
    queryFn: async () => await API.getCurrencyRate(),
  });
  const { t } = useTranslation();

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  const { mutate: purchaseCreatesMutate, isPending: purchaseCreatesPending } =
    useMutation({
      mutationFn: (data: any) => API.postPurchaseInvoices(data),
      onSuccess: () => {
        toast.success(t("purchase.Xarid yaratildi"));
        formInstance.resetFields();
        purchaseRefetch();
        setOpen(false);
      },
    });

  useEffect(() => {
    formInstance.setFieldValue("dollarRate", docRate);
    formInstance.setFieldValue("docCurrency", Currencies.USD);
    formInstance.setFieldValue("date", dayjs());
  }, [docRate, formInstance]);

  const onFinished = (values: any) => {
    const payload = mapPurchaseCreatePayload(values);

    purchaseCreatesMutate(payload);
  };

  return (
    <Modal
      title={<p></p>}
      open={open}
      footer={null}
      onCancel={handleClose}
      width="90%"
    >
      <Form
        form={formInstance}
        className="purchase_create_form"
        onFinish={onFinished}
        initialValues={{
          items: [{}],
          dollarRate: docRate,
          slpCode: userInfo.salesPersonCode,
          docCurrency: "USD",
        }}
      >
        <ErrorBoundary>
          <PurchaseCreateHeader />
        </ErrorBoundary>

        <div className="purchase_create_form__main">
          <ErrorBoundary>
            <PurchaseCreateItemsTable />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <PurchaseCreateFooter
            loading={purchaseCreatesPending}
            handleClose={handleClose}
          />
        </ErrorBoundary>
      </Form>
    </Modal>
  );
};

export default PurchaseCreateCreate;
