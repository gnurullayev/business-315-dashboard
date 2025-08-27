import { type FC } from "react";
import { Table } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import "./styles.scss";
import { usePdfPrint } from "../pdf-cheque/hooks/usePdfPrint";

const PdfOrderPageInfo: FC = () => {
  const { isLoading, data, currencyRate, currencyRateLoading } = usePdfPrint();
  const columns = [
    { title: "№", dataIndex: "no", key: "no", width: 50 },
    { title: "Mahsulot nomi", dataIndex: "product", key: "product" },
    { title: "O'lch.bir", dataIndex: "unit", key: "unit", width: 100 },
    { title: "Soni", dataIndex: "qty", key: "qty", width: 100 },
    { title: "Narx", dataIndex: "price", key: "price", width: 120 },
    { title: "Summa", dataIndex: "total", key: "total", width: 120 },
  ];

  const data1 = [
    {
      key: "1",
      no: 1,
      product: "TOVAR A",
      unit: "Шт",
      qty: 1,
      price: "0 USD",
      total: "0 USD",
    },
  ];

  return (
    <div className="pdf-order-page-info">
      <h2 className="company">OOO "MEGA AUTO PARTS SERVICE"</h2>

      <div className="pdf-order-page-info-header">
        <div className="left">
          <div className="phone-box">
            <PhoneFilled className="phone-icon" />
            <span>
              <b>Tel :</b> 983004547
            </span>
          </div>
          <p>
            <b>Klient :</b> Test
          </p>
          <p>
            <b>Klient tel :</b> +998900070707
          </p>
        </div>
        <div className="right">
          <p>
            <b>Kurs :</b> 12 700
          </p>
          <p>
            <b>Check № :</b> 41
          </p>
          <p>
            <b>Sana :</b> 19.07.2025
          </p>
        </div>
      </div>

      <Table
        bordered
        columns={columns}
        dataSource={data1}
        pagination={false}
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3}>
              <b>Jami (soni)</b>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={1}>1</Table.Summary.Cell>
            <Table.Summary.Cell index={2}>0 USD</Table.Summary.Cell>
            <Table.Summary.Cell index={3}>0 USD</Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      <div className="note">
        <p>
          Xurmatli mijoz, iltimos, qarzingizni <b>19.07.2025</b> gacha to‘lashni
          unutmang!
        </p>
      </div>

      <div className="comment">
        <p>
          <b>Izoh :</b>
        </p>
      </div>
    </div>
  );
};

export default PdfOrderPageInfo;
