import { Button, Form, Input, Modal } from "antd";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API } from "@/services/api";
import "./styles.scss";
import { type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { UniversalSelect } from "@/components";
import type { FormModeType } from "@/types";
import { FormMode } from "@/enums";
import { useClientFormSync } from "../../hooks/useClientFormSync";
import type { IClient } from "@/types/client";
import type { ClientPageType } from "../../types";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setReload: Dispatch<SetStateAction<number>>;
  setShowClient?: Dispatch<SetStateAction<IClient | null>>;
  showClient?: IClient | null;
  mode?: FormModeType;
  clientPageType?: ClientPageType;
}

const ClientModalForm: FC<IProps> = ({
  open,
  setOpen,
  setReload,
  mode = FormMode.CREATE,
  showClient,
  setShowClient,
  clientPageType = "client-info",
}) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  useClientFormSync({ formInstance, showClient });

  const handleClose = () => {
    formInstance.resetFields();
    if (setShowClient) {
      setShowClient(null);
    }
    setOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationKey: ["post-business-partners"],
    mutationFn: (data: any) => API.postBusinessPartners(data),
    onSuccess: () => {
      toast.success("Client yaratildi");
      setReload((prev) => prev + 1);
      handleClose();
    },
  });

  const onFinished = (values: any) => {
    mutate(values);
  };

  const isClientFormDisabled = clientPageType === "sales-reports";

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
      width="40%"
    >
      <Form
        form={formInstance}
        className="client_modal_form"
        onFinish={onFinished}
        initialValues={{ items: [{}] }}
        layout="vertical"
      >
        <div className="client_modal_form__inner">
          <Form.Item
            name="cardName"
            label={t("clients.customerName")}
            layout="vertical"
            rules={[{ required: true, message: t("general.enterInformation") }]}
          >
            <Input
              placeholder={"Mijoz ismini kiriting"}
              allowClear
              disabled={isClientFormDisabled}
            />
          </Form.Item>

          <Form.Item
            name="CardForeignName"
            label={t("clients.responsiblePerson")}
            layout="vertical"
            rules={[{ required: true, message: t("general.enterInformation") }]}
          >
            <Input
              placeholder={"Mas'ul shaxs"}
              allowClear
              disabled={isClientFormDisabled}
            />
          </Form.Item>

          <Form.Item
            name="FederalTaxID"
            label={t("clients.inn")}
            layout="vertical"
            rules={[{ required: true, message: t("general.enterInformation") }]}
          >
            <Input
              placeholder={"INN"}
              allowClear
              disabled={isClientFormDisabled}
            />
          </Form.Item>

          <div className="client_modal_form__item_box">
            <UniversalSelect
              name="groupCode"
              label={t("clients.customerGroup")}
              layout="vertical"
              request={API.getBusinessPartnersGroups}
              resDataKey="data"
              valueKey="code"
              labelKey="name"
              disabled={isClientFormDisabled}
              requestQueryKey={"getBusinessPartnersGroups"}
              rules={[
                { required: true, message: t("general.enterInformation") },
              ]}
            />

            <Form.Item
              name="phoneNumber"
              label={t("clients.phoneNumber")}
              layout="vertical"
              rules={[
                {
                  pattern: /^\+998\d{9}$/,
                  message: "Telefon raqam noto‘g‘ri (masalan: +998901234567)",
                },
              ]}
            >
              <Input
                placeholder={"+998901234567"}
                allowClear
                disabled={isClientFormDisabled}
              />
            </Form.Item>
          </div>

          {!isClientFormDisabled && (
            <div className="client_modal_form__footer">
              <Button type="default" onClick={handleClose}>
                {t("general.back")}
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                disabled={isPending}
              >
                {t(`general.${mode === FormMode.CREATE ? "add" : "save"}`)}
              </Button>
            </div>
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default ClientModalForm;
