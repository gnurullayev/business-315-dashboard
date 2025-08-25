import { useEffect, useState, type FC } from "react";
import { Button, Table } from "antd";
import type { ClientPageType, IClientsFilter } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import { FormMode } from "@/enums";
import { Eye } from "lucide-react";
import { useTranslation } from "react-i18next";
import Paginations from "@/components/Pagination";
import "./styles.scss";
import { ErrorBoundary } from "@/components";
import ClientModalForm from "../ClientModalForm";
import type { IClient } from "@/types/client";
import ActiveReconciliationModal from "../ActiveReconciliationModal";

interface IProps {
  filter: IClientsFilter;
  clientPageType: ClientPageType;
}

const ClientsList: FC<IProps> = ({ filter, clientPageType }) => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [showClientOpen, setShowClientOpen] = useState(false);
  const [showClient, setShowClient] = useState<IClient | null>(null);
  const [activeReconciliationModalOpen, setActiveReconciliationModalOpen] =
    useState(false);

  const columns = [
    {
      title: t("clients.customerName"),
      dataIndex: "cardName",
      key: "cardName",
    },
    {
      title: t("clients.responsiblePerson"),
      dataIndex: "cardFName",
      key: "cardFName",
    },
    {
      title: t("clients.inn"),
      dataIndex: "licTradNum",
      key: "licTradNum",
    },
    {
      title: t("clients.phoneNumber"),
      dataIndex: "Cellular",
      key: "Cellular",
    },

    {
      title: t("clients.balance"),
      dataIndex: "balance",
      key: "balance",
    },
    {
      title: t("clients.customerGroup"),
      dataIndex: "groupCode",
      key: "groupCode",
    },
    {
      title: t("general.actions"),
      key: "action",
      render: (_: any, record: any) => (
        <div className="client_list_actions">
          {clientPageType === "sales-reports" && (
            <Button
              type="default"
              onClick={() => {
                setActiveReconciliationModalOpen(true);
                setShowClient(record);
              }}
            >
              {t("clients.activeReconciliation")}
            </Button>
          )}

          <Button
            type="primary"
            onClick={() => {
              setShowClientOpen(true);
              setShowClient(record);
            }}
          >
            <Eye />
          </Button>
        </div>
      ),
    },
  ];

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["sales-orders", filter, page],
    queryFn: async () =>
      await API.getSalesOrders({ ...filter, skip: page, pageSize: 10 }),
  });

  useEffect(() => {
    refetch();
  }, [filter]);

  const onChange = (value: any) => {
    setPage((value -= 1));
    refetch();
  };

  return (
    <div className="clients_list">
      <Table
        columns={columns}
        dataSource={data?.data ? data?.data : []}
        loading={isLoading}
        pagination={false}
      />
      <Paginations
        onChange={onChange}
        isLoading={isLoading}
        isDataLength={data?.data?.length < 10}
      />

      <ErrorBoundary>
        <ClientModalForm
          open={showClientOpen}
          setOpen={setShowClientOpen}
          setReload={() => null}
          mode={FormMode.EDIT}
          showClient={showClient}
          setShowClient={setShowClient}
          clientPageType={clientPageType}
        />
      </ErrorBoundary>
      <ErrorBoundary>
        <ActiveReconciliationModal
          open={activeReconciliationModalOpen}
          setOpen={setActiveReconciliationModalOpen}
        />
      </ErrorBoundary>
    </div>
  );
};

export default ClientsList;
