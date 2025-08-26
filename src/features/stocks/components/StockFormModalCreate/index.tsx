import { Form, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { API } from "@/services/api";
import "./styles.scss";
import { type Dispatch, type FC, type SetStateAction } from "react";
import type { StockType } from "../../types";
import StockFormModalCreateHeader from "./StockFormModalCreateHeader";
import StockFormModalCreateTable from "./StockFormModalCreateTable";
import StockFormModalCreateFooter from "./StockFormModalCreateFooter";
import type { FormModeType } from "@/types";
import { FormMode } from "@/enums";
import type { IStock } from "@/types/stock";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components";
import { mapStockPayload, mapStockTransferPayload } from "../../lib";
import { toast } from "react-toastify";
import { useStockFormSetValues } from "../../hooks/useStockFormSetValues";
interface IProps {
  stockType: StockType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReload: any;
  mode: FormModeType;
  showStock?: IStock | null;
}

const StockFormModalCreate: FC<IProps> = ({
  open,
  setOpen,
  stockType,
  mode,
  showStock,
  setReload,
}) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();

  useStockFormSetValues({ formInstance, showStock, open });

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  const { isPending: stockPending, mutate } = useMutation({
    mutationFn: (data: any) => {
      if (mode === FormMode.CREATE)
        return API.postInventoryTransferRequests(data);
      return API.patchInventoryTransferRequests(
        data,
        showStock?.docEntry as number
      );
    },
    onSuccess: () => {
      toast.success(
        t(
          mode === FormMode.CREATE
            ? "Tovar boshqa omborga ko'chirildi"
            : "Tovar ko'chirish yangilandi"
        )
      );
      handleClose();
      setReload((prev: any) => prev + 1);
    },
  });

  const { isPending: stockTransfersPending, mutate: stockTransfersMutate } =
    useMutation({
      mutationFn: (data: any) => API.postStockTransfers(data),
      onSuccess: () => {
        toast.success("Birja o'tkazmasi qabul qilindi");
        handleClose();
        setReload((prev: any) => prev + 1);
      },
    });

  const handleStockTransfers = () => {
    const payload = mapStockTransferPayload(showStock as IStock);
    stockTransfersMutate(payload);
  };

  const onFinished = (values: any) => {
    const payload = mapStockPayload(values, mode);
    mutate(payload);
  };

  return (
    <Modal
      title={
        mode === FormMode.EDIT && (
          <h3>
            <b>{`${t("general.docNumber")}: ${showStock?.docEntry}`}</b>
          </h3>
        )
      }
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
        <ErrorBoundary>
          <StockFormModalCreateHeader mode={mode} />
        </ErrorBoundary>

        <div className="stock_form_create__main">
          <ErrorBoundary>
            <StockFormModalCreateTable mode={mode} stockType={stockType} />
          </ErrorBoundary>
        </div>

        <ErrorBoundary>
          <StockFormModalCreateFooter
            loading={stockPending}
            handleClose={handleClose}
            mode={mode}
            stockType={stockType}
            handleStockTransfers={handleStockTransfers}
            stockTransfersPending={stockTransfersPending}
          />
        </ErrorBoundary>
      </Form>
    </Modal>
  );
};

export default StockFormModalCreate;
