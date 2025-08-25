import { Button, Modal, Table, type TableColumnsType } from "antd";
import { Eye } from "lucide-react";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import WarehouseInnerInfoModal from "./WarehouseInnerInfoModal";
interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const WarehouseInfoModal: FC<IProps> = ({ open, setOpen, data }) => {
  const { t } = useTranslation();
  const [warehouseInnerModalOpen, setWarehouseInnerModalOpen] =
    useState<boolean>(false);

  const columns: TableColumnsType<any> = [
    {
      title: t("sales.warehouseName"),
      dataIndex: "warehouseName",
      key: "warehouseName",
    },
    {
      title: t("sales.quantityInStock"),
      dataIndex: "inStock",
      key: "inStock",
    },
    {
      title: t("sales.confirmedQuantity"),
      dataIndex: "available",
      key: "available",
      render: (_: any, record: any) => {
        const available = record?.inStock - record?.committed;
        return <span>{available}</span>;
      },
    },
    {
      title: t("general.actions"),
      key: "action",
      render: (_: any, record: any) => (
        <>
          <Button
            type="primary"
            onClick={() => setWarehouseInnerModalOpen(true)}
          >
            <Eye />
          </Button>
          <WarehouseInnerInfoModal
            open={warehouseInnerModalOpen}
            setOpen={setWarehouseInnerModalOpen}
            data={record}
          />
        </>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title={
          <h3>
            <b>
              {t("sales.productName")} : {data?.itemName}
            </b>
          </h3>
        }
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width="80%"
      >
        <Table<any>
          columns={columns}
          dataSource={data?.documentLines?.length ? data?.documentLines : []}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default WarehouseInfoModal;
