import { type FC } from "react";
import { Table } from "antd";
import { PhoneFilled } from "@ant-design/icons";
import "./styles.scss";
import { usePdfPrint } from "../pdf-cheque/hooks/usePdfPrint";
import { Loader } from "lucide-react";
import { ErrorBoundary } from "@/components";
import type { IDocumentLines, IOrder } from "@/types/order";

const PdfOrderPageInfo: FC = () => {
  const { isLoading, data, currencyRate, currencyRateLoading } = usePdfPrint();
  const columns = [
    {
      title: "№",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (_v: any, _r: IDocumentLines, idx: number) => (
        <span>{idx + 1}</span>
      ),
    },
    {
      title: "Mahsulot nomi",
      dataIndex: "itemDescription",
      key: "itemDescription",
    },
    {
      title: "O'lch.bir",
      dataIndex: "ugpName",
      key: "ugpName",
      width: 100,
    },
    { title: "Soni", dataIndex: "quantity", key: "quantity", width: 100 },
    {
      title: "Narx",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (value: number, record: IDocumentLines) => (
        <span>
          {value} {record.currency}
        </span>
      ),
    },
    {
      title: "Summa",
      dataIndex: "lineTotal",
      key: "lineTotal",
      width: 120,
      render: (value: number, record: IDocumentLines) => (
        <span>
          {value} {record.currency}
        </span>
      ),
    },
  ];

  let totalQuantity = 0;
  let totalPrice = 0;
  let totalLine = 0;

  if (data?.length && data[0].documentLines) {
    data[0].documentLines.forEach((docLine) => {
      totalLine += docLine.lineTotal;
      totalPrice += docLine.price;
      totalQuantity += docLine.quantity;
    });
  }

  return (
    <div className="pdf-order-page-info">
      <h2 className="company">OOO "MEGA AUTO PARTS SERVICE"</h2>
      {isLoading &&
      currencyRateLoading &&
      !data?.length &&
      !(currencyRate as any)?.length ? (
        <Loader />
      ) : (
        <>
          <div className="pdf-order-page-info-header">
            <div className="left">
              <div className="phone-box">
                <PhoneFilled className="phone-icon" />
                <span>
                  <b>Tel :</b> 983004547
                </span>
              </div>
              <p>
                <b>Klient :</b> {(data as IOrder[])[0].cardName}
              </p>
              <p>
                <b>Klient tel :</b> {(data as IOrder[])[0].cellular}
              </p>
            </div>
            <div className="right">
              <p>
                <b>Курс :</b>{" "}
                {!isNaN(currencyRate[0]?.rate)
                  ? Number(currencyRate[0]?.rate)
                  : ""}
              </p>
              <p>
                <b>Check № :</b> {(data as IOrder[])[0].docNum}
              </p>
              <p>
                <b>Sana :</b> {currencyRate[0]?.rateDate}
              </p>
            </div>
          </div>

          <ErrorBoundary>
            <Table<IDocumentLines>
              bordered
              columns={columns}
              dataSource={data?.length ? data[0].documentLines : []}
              pagination={false}
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}>
                    <b>Jami (soni)</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    {totalQuantity}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    {totalPrice} {(data as IOrder[])[0].docCurrency}
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    {totalLine} {(data as IOrder[])[0].docCurrency}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
              rowKey={(record) => record.lineNum}
            />
          </ErrorBoundary>

          <div className="note">
            <p>
              Xurmatli mijoz, iltimos, qarzingizni{" "}
              <b>{(data as IOrder[])[0].docDueDate}</b> gacha to‘lashni
              unutmang!
            </p>
          </div>

          <div className="comment">
            <p>
              <b>Izoh :{(data as IOrder[])[0].comments}</b>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfOrderPageInfo;
