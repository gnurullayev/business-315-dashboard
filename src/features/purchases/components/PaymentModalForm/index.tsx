import { Button, DatePicker, Form, Input, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";

import "./styles.scss";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { UniversalSelect } from "@/components";
import TextArea from "antd/es/input/TextArea";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<number>>;
}

const PaymentModalForm: FC<IProps> = ({ open, setOpen, setReload }) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-business-partners"],
    mutationFn: (data: any) => API.postBusinessPartners(data),
    onSuccess: () => {
      toast.success("Client yaratildi");
      formInstance.resetFields();
      setReload((prev) => prev + 1);
      setOpen(false);
    },
    onError: (err: any) => {
      if (err?.response?.data?.message) {
        toast.error(`Xatolik yuz berdi: ${err?.response?.data?.message}`);
      } else {
        toast.error(`Xatolik yuz berdi: ${err.message}`);
      }
    },
  });

  const onFinished = (values: any) => {
    mutate(values);
  };

  const handleClose = () => {
    setOpen(false);
    formInstance.resetFields();
  };

  return (
    <Modal
      title={
        <h3>
          <b>Hujjat raqami: 49</b>
        </h3>
      }
      open={open}
      footer={null}
      onCancel={handleClose}
      width="40%"
    >
      <Form
        form={formInstance}
        className="payment-modal-form"
        onFinish={onFinished}
        initialValues={{ items: [{}] }}
        layout="vertical"
      >
        <div className="payment-modal-form__inner">
          <div className="payment-modal-form__item_box">
            <Form.Item
              name="dollarRate"
              label={t("client.dollarRate")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
                { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
              ]}
            >
              <Input placeholder={""} />
            </Form.Item>
            <Form.Item
              name={"date"}
              label={t("general.Sana")}
              layout="vertical"
              rules={[]}
            >
              <DatePicker placeholder={t("general.choose")} />
            </Form.Item>
          </div>

          <div className="payment-modal-form__item_box">
            <Form.Item
              name="USD"
              label={t("purchases.usd")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
                { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
              ]}
            >
              <Input placeholder={"Mijoz ismini kiriting"} />
            </Form.Item>

            <UniversalSelect
              name="cash"
              label={t("purchases.cash")}
              layout="vertical"
              request={API.getBusinessPartnersGroups}
              resDataKey="data"
              valueKey="code"
              labelKey="name"
              disabled={true}
              rules={[
                { required: true, message: t("general.enterInformation") },
              ]}
            />
          </div>

          <div className="payment-modal-form__item_box">
            <Form.Item
              name="UZS"
              label={t("purchases.uzs")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
                { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
              ]}
            >
              <Input placeholder={""} />
            </Form.Item>

            <UniversalSelect
              name="cash"
              label={t("purchases.cash")}
              layout="vertical"
              request={API.getBusinessPartnersGroups}
              resDataKey="data"
              valueKey="code"
              labelKey="name"
              disabled={true}
              rules={[]}
            />
          </div>

          <div className="payment-modal-form__item_box">
            <Form.Item
              name="click"
              label={t("purchases.click")}
              layout="vertical"
              rules={[
                { required: true, message: t("general.enterInformation") },
                { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
              ]}
            >
              <Input placeholder={""} />
            </Form.Item>

            <UniversalSelect
              name="cash"
              label={t("purchases.cash")}
              layout="vertical"
              request={API.getBusinessPartnersGroups}
              resDataKey="data"
              valueKey="code"
              labelKey="name"
              disabled={true}
              rules={[]}
            />
          </div>

          <Form.Item
            name="totalAmount"
            label={t("general.totalAmount")}
            layout="vertical"
            rules={[
              { required: true, message: t("general.enterInformation") },
              { pattern: /^[0-9]+$/, message: t("general.enterOnlyNumber") },
            ]}
          >
            <Input placeholder={""} disabled />
          </Form.Item>

          <div className="payment-modal-form__comment">
            <Form.Item
              name={"comment"}
              label={t("general.comment")}
              layout="vertical"
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div className="payment-modal-form__footer">
            <Button type="default" onClick={handleClose}>
              {t("general.back")}
            </Button>

            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
              disabled={isPending}
            >
              {t("general.add")}
            </Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default PaymentModalForm;
