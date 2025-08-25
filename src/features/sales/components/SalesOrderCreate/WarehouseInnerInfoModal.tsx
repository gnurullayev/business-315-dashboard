import { Modal, Table, type TableColumnsType } from "antd";
import {  type Dispatch, type FC, type SetStateAction } from "react";
import { useTranslation } from "react-i18next";
interface IProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: any;
}

const WarehouseInnerInfoModal: FC<IProps> = ({ open, setOpen, data }) => {
  const { t } = useTranslation();

  const columns: TableColumnsType<any> = [
    {
      title: t("sales.cell"),
      dataIndex: "binCode",
      key: "binCode",
    },
    {
      title: t("sales.quantityInStock"),
      dataIndex: "onHandQuantity",
      key: "onHandQuantity",
    },
  ];

  return (
    <div>
      <Modal
        title={
          <h3>
            <b>
              {t("sales.warehouseName")} : {data?.warehouseName}
            </b>
          </h3>
        }
        open={open}
        footer={null}
        onCancel={() => setOpen(false)}
        width="50%"
      >
        <Table<any>
          columns={columns}
          dataSource={data?.binLocations?.length ? data?.binLocations : []}
          pagination={false}
        />
      </Modal>
    </div>
  );
};
export default WarehouseInnerInfoModal;
