import { Table } from "antd";
import "./styles.scss";
import Loader from "@/components/Loader";
import { ErrorBoundary } from "@/components";
import type { IDocumentLines } from "@/types/order";
import { usePdfPrint } from "./hooks/usePdfPrint";

const PdfChequeInfo = () => {
  const { isLoading, data, currencyRate, currencyRateLoading } = usePdfPrint();

  const columns = [
    {
      title: "№",
      dataIndex: "no",
      key: "no",
      width: 50,
      render: (_v: any, _r: any, idx: number) => <span>{idx + 1}</span>,
    },
    {
      title: "Товар",
      dataIndex: "itemDescription",
      key: "itemDescription",
      render: (_v: any, record: IDocumentLines) => (
        <>
          <div>
            <div>{record?.whsName}</div>
            <hr />
            <div>{record?.itemDescription}</div>
          </div>
        </>
      ),
    },
    {
      title: "Кол-во",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
    },
    {
      title: "Цена",
      dataIndex: "price",
      key: "price",
      width: 120,
      render: (_v: any, record: IDocumentLines) => (
        <span>
          {record?.quantity} {record.currency}
        </span>
      ),
    },
    {
      title: "Общая цена",
      dataIndex: "lineTotal",
      key: "lineTotal",
      width: 150,
    },
  ];

  return (
    <div className="pdf-cheque-info">
      <h2 className="company">OOO "MEGA AUTO PARTS SERVICE"</h2>

      {isLoading &&
      currencyRateLoading &&
      !(data as any)?.data?.length &&
      !(currencyRate as any)?.data?.length ? (
        <Loader />
      ) : (
        <>
          <div className="pdf-cheque-info-header">
            <div>
              <p>
                <b>Тел :</b> {data?.data[0].cellular}
              </p>
              <p>
                <b>Клиент :</b> {data?.data[0].cardName}
              </p>
              <p>
                <b>Продавец :</b> {data?.data[0].slpName}
              </p>
            </div>
            <div className="right">
              <p>
                <b>Курс :</b>{" "}
                {!isNaN(currencyRate.data[0].rate)
                  ? Number(currencyRate.data[0].rate)
                  : ""}
              </p>
              <p>
                <b>Дата :</b> {currencyRate.data[0].rateDate}
              </p>
            </div>
          </div>

          <ErrorBoundary>
            <Table
              bordered
              columns={columns}
              dataSource={data?.data?.length ? data.data[0].documentLines : []}
              pagination={false}
              summary={(data) => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={2}>
                    <b>Итог (кол)</b>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    {data[0].quantity}
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
              rowKey={(record) => record.lineNum}
            />
          </ErrorBoundary>

          <div className="pdf-cheque-info-footer">
            <p>
              <b>Всего (UZS) :</b>{" "}
              {!isNaN(currencyRate.data[0].rate)
                ? data?.data[0].docTotal * Number(currencyRate.data[0].rate)
                : 0}
            </p>
            <p>
              <b>Всего (USD) :</b> {data?.data[0].docTotal}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default PdfChequeInfo;
