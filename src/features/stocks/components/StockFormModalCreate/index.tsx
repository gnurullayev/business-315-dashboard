import { Form, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import "./styles.scss";
import type { Dispatch, FC, SetStateAction } from "react";
import type { StockType } from "../../types";
import StockFormModalCreateHeader from "./StockFormModalCreateHeader";
import StockFormModalCreateTable from "./StockFormModalCreateTable";
import StockFormModalCreateFooter from "./StockFormModalCreateFooter";
import type { FormModeType } from "@/types";
interface IProps {
  stockType: StockType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: FormModeType;
}

const StockFormModalCreate: FC<IProps> = ({
  open,
  setOpen,
  stockType,
  mode,
}) => {
  const [formInstance] = Form.useForm();

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  const { isPending: salesOrdersPending } = useMutation({
    mutationFn: (data: any) => API.postSalesOrders(data),
    onSuccess: () => {
      // toast.success(
      //   t(stockType === "sales" ? "sales.Order yaratildi" : "Order yaratildi")
      // );
      formInstance.resetFields();
      setOpen(false);
    },
  });

  const onFinished = (_: any) => {
    // const payload = mapSalesOrderPayload(values, salesType);
    // salesOrdersMutate(payload);
  };

  return (
    <Modal
      title={<p></p>}
      open={open}
      footer={null}
      onCancel={handleClose}
      width="80%"
    >
      <Form
        form={formInstance}
        className="stock_form_create"
        onFinish={onFinished}
        initialValues={{ items: [{}], dollarRate: "12000" }}
      >
        <StockFormModalCreateHeader mode={mode} />
        <div className="stock_form_create__main">
          <StockFormModalCreateTable mode={mode} />
        </div>
        <StockFormModalCreateFooter
          loading={salesOrdersPending}
          handleClose={handleClose}
          mode={mode}
          stockType={stockType}
        />
      </Form>
    </Modal>
  );
};

export default StockFormModalCreate;
