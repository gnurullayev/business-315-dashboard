import { Form, Modal } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import SalesOrderHeader from "./SalesOrderHeader";
import SalesOrderItemsTable from "./SalesOrderItemsTable";
import SalesOrderFooter from "./SalesOrderFooter";
import { mapSalesOrderPayload } from "../../lib/salesOrders";
import "./styles.scss";
import type { SalesFormType } from "../../types";
import { useEffect, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components";
interface IProps {
  salesType: SalesFormType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  ordersRefetch: () => void;
}

const SalesOrderCreate: FC<IProps> = ({
  open,
  setOpen,
  salesType,
  ordersRefetch,
}) => {
  const [formInstance] = Form.useForm();
  const { data: docRate } = useQuery({
    queryKey: ["getCurrencyRate"],
    queryFn: async () => await API.getCurrencyRate(),
  });
  const { t } = useTranslation();
  const {
    mutate,
    isPending,
    data: onhandItem,
  } = useMutation({
    mutationKey: ["onhand-items"],
    mutationFn: (params: any) => API.getOnHandItems(params),
  });

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  const { mutate: salesOrdersMutate, isPending: salesOrdersPending } =
    useMutation({
      mutationFn: (data: any) =>
        salesType == "sales"
          ? API.postSalesInvoices(data)
          : API.postSalesOrders(data),
      onSuccess: () => {
        toast.success(
          t(salesType === "sales" ? "sales.Sotuv yaratildi" : "Order yaratildi")
        );
        formInstance.resetFields();
        ordersRefetch();
        setOpen(false);
      },
    });

  useEffect(() => {
    formInstance.setFieldValue("dollarRate", docRate);
  }, [docRate, formInstance]);

  const onFinished = (values: any) => {
    const payload = mapSalesOrderPayload(values, salesType);

    salesOrdersMutate(payload);
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
        className="order_create_form"
        onFinish={onFinished}
        initialValues={{ items: [{}], dollarRate: docRate }}
      >
        <ErrorBoundary>
          <SalesOrderHeader />
        </ErrorBoundary>

        <div className="order_create_form__main">
          <ErrorBoundary>
            <SalesOrderItemsTable
              formInstance={formInstance}
              mutate={mutate}
              isPending={isPending}
              onhandItem={onhandItem}
            />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <SalesOrderFooter
            loading={salesOrdersPending}
            handleClose={handleClose}
          />
        </ErrorBoundary>
      </Form>
    </Modal>
  );
};

export default SalesOrderCreate;
