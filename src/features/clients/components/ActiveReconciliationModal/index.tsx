import { DatePicker, Form, Input, Modal } from "antd";
import "./styles.scss";
import {
  useEffect,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
} from "react";
import { useTranslation } from "react-i18next";
import { ErrorBoundary } from "@/components";
import ActiveReconciliationModalTable from "./ActiveReconciliationModalTable";
import type { IClient } from "@/types/client";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import dayjs from "dayjs";

interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  showClient?: IClient | null;
}

const initialData = {
  startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
  endDate: dayjs().format("YYYY-MM-DD"),
};

const ActiveReconciliationModal: FC<IProps> = ({
  open,
  setOpen,
  showClient,
}) => {
  const [formInstance] = Form.useForm();
  const { t } = useTranslation();
  const [filter, setFilter] = useState(initialData);

  const handleClose = () => {
    formInstance.resetFields();
    setFilter(initialData);
    setOpen(false);
  };

  const { refetch, data, isLoading } = useQuery({
    queryKey: ["getBusinessPartnersInfo", filter, showClient?.cardCode],
    queryFn: async () => {
      if (showClient?.cardCode) {
        return await API.getBusinessPartnersInfo({
          cardCode: showClient.cardCode,
          ...filter,
        });
      }
      return null;
    },
    enabled: !!showClient?.cardCode,
  });

  const onValuesChange = (values: any) => {
    console.log(values);
    const key = Object.keys(values)[0];

    setFilter({ ...filter, [key]: dayjs(values[key]).format("YYYY-MM-DD") });
  };

  useEffect(() => {
    refetch();
  }, [filter]);

  useEffect(() => {
    if (data) {
      formInstance.setFieldsValue({
        cardName: data.cardName,
        balance: data.balance,
        balanceFirstDayOfPeriod: data.balanceFirstDayOfPeriod,
        startDate: dayjs(filter.startDate),
        endDate: dayjs(filter.endDate),
      });
    }
  }, [formInstance, data]);

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
      loading={isLoading}
    >
      <Form
        form={formInstance}
        className="active_reconciliation_modal__form"
        onValuesChange={onValuesChange}
        initialValues={{}}
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
              name="startDate"
              label={t("general.startDate")}
              layout="vertical"
            >
              <DatePicker
                placeholder={t("general.choose")}
                format="MM/DD/YYYY"
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={t("general.endDate")}
              layout="vertical"
            >
              <DatePicker
                placeholder={t("general.choose")}
                format="MM/DD/YYYY"
              />
            </Form.Item>
          </div>
        </div>

        <div className="active_reconciliation_modal__form_bottom">
          <Form.Item
            name="balance"
            label={t("clients.currentLiability")}
            layout="vertical"
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="balanceFirstDayOfPeriod"
            label={t("clients.openingBalance")}
            layout="vertical"
          >
            <Input disabled />
          </Form.Item>
        </div>
      </Form>

      <ErrorBoundary>
        <ActiveReconciliationModalTable
          data={
            data?.businessPartnerInfoLines ? data?.businessPartnerInfoLines : []
          }
        />
      </ErrorBoundary>
    </Modal>
  );
};

export default ActiveReconciliationModal;
