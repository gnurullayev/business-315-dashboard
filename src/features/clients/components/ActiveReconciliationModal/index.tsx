import { DatePicker, Form, Input, Modal } from "antd";
import "./styles.scss";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components";
import ActiveReconciliationModalTable from "./ActiveReconciliationModalTable";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ActiveReconciliationModal: FC<IProps> = ({ open, setOpen }) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  // useClientFormSync({ formInstance });

  const handleClose = () => {
    formInstance.resetFields();

    setOpen(false);
  };

  // const { mutate, isPending } = useMutation({
  //   mutationKey: ["post-business-partners"],
  //   mutationFn: (data: any) => API.postBusinessPartners(data),
  //   onSuccess: () => {
  //     toast.success("Client yaratildi");
  //     setReload((prev) => prev + 1);
  //     handleClose();
  //   },
  // });

  // const onFinished = (values: any) => {
  //   mutate(values);
  // };

  return (
    <Modal
      title={
        <h3>
          <b>{t("clients.addClient")}</b>
        </h3>
      }
      open={open}
      footer={null}
      onCancel={handleClose}
      width="80%"
      className="active_reconciliation_modal"
    >
      <Form
        form={formInstance}
        className="active_reconciliation_modal__form"
        // onFinish={onFinished}
        initialValues={{ items: [{}] }}
        layout="vertical"
      >
        <div className="active_reconciliation_modal__form_top">
          <Form.Item
            name="cardName"
            label={t("clients.customerName")}
            layout="vertical"
          >
            <Input disabled />
          </Form.Item>

          <div className="active_reconciliation_modal__form_top_box">
            <Form.Item
              name="term"
              label={t("general.startDate")}
              layout="vertical"
            >
              <DatePicker placeholder={t("general.choose")} />
            </Form.Item>

            <Form.Item
              name="term"
              label={t("general.endDate")}
              layout="vertical"
            >
              <DatePicker placeholder={t("general.choose")} />
            </Form.Item>
          </div>
        </div>

        <div className="active_reconciliation_modal__form_bottom">
          <Form.Item
            name="currentLiability"
            label={t("clients.currentLiability")}
            layout="vertical"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="openingBalance"
            label={t("clients.openingBalance")}
            layout="vertical"
          >
            <Input disabled />
          </Form.Item>
        </div>
      </Form>

      <ErrorBoundary>
        <ActiveReconciliationModalTable />
      </ErrorBoundary>
    </Modal>
  );
};

export default ActiveReconciliationModal;
