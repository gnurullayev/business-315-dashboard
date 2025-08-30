import { Table } from "antd";
import "./styles.scss";
import { usePdfPrint } from "../pdf-cheque/hooks/usePdfPrint";
import { Loader } from "lucide-react";
import type { IDocumentLines } from "@/types/order";

const PdfWrhPdfInfo = () => {
  const { isLoading, data, currencyRate, currencyRateLoading } = usePdfPrint();
  const columns = [
    {
      title: "№",
      dataIndex: "no",
      key: "no",
      render: (_v: any, _r: IDocumentLines, idx: number) => (
        <span>{idx + 1}</span>
      ),
    },
    { title: "Код", dataIndex: "itemCode", key: "itemCode" },
    {
      title: "Товар номи",
      dataIndex: "itemDescription",
      key: "itemDescription",
    },
    { title: "Улв.бир", dataIndex: "ugpName", key: "ugpName" },
    { title: "Сони", dataIndex: "quantity", key: "quantity" },
    { title: "Склад", dataIndex: "whsName", key: "whsName" },
    {
      title: "Ячейка",
      dataIndex: "binLocations",
      key: "binLocations",
      render: (value: any, record: IDocumentLines) => (
        <span>{record?.u_BinCode ? record.u_BinCode : value[0]?.binCode}</span>
      ),
    },
  ];

  let totalQuantity = 0;

  if (data?.length && data[0].documentLines) {
    data[0].documentLines.forEach((docLine) => {
      totalQuantity += docLine.quantity;
    });
  }

  return (
    <div className="pdf-wrh-pdf-info">
      {isLoading &&
      currencyRateLoading &&
      !data?.length &&
      !(currencyRate as any)?.length ? (
        <Loader />
      ) : (
        <>
          <div className="pdf-wrh-pdf-info-header">
            <div>
              <p>
                <b>Клиент : </b>
                {data && data[0].cardName}
              </p>
              <p>
                <b>Чек №:</b>
                {data && data[0].docNum}
              </p>
            </div>
            <div className="right">
              <p>
                <b>Сотувчи : </b>Bahodir
              </p>
              <p>
                <b>Курс : </b>
                {!isNaN(currencyRate[0]?.rate)
                  ? Number(currencyRate[0]?.rate)
                  : ""}
              </p>
              <p>
                <b>Сана : </b>
                {currencyRate[0]?.rateDate}
              </p>
            </div>
          </div>

          <Table<IDocumentLines>
            columns={columns}
            dataSource={data?.length ? data[0].documentLines : []}
            bordered
            pagination={false}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell
                  className="first-cell"
                  index={0}
                  colSpan={3}
                ></Table.Summary.Cell>
                <Table.Summary.Cell index={1}>Итого</Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  {totalQuantity}
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3} colSpan={2}></Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            rowKey={(record) => record.lineNum}
          />
        </>
      )}

      <div className="pdf-wrh-pdf-info-footer">
        <b>Харидингиз учун рахмат!</b>
      </div>
    </div>
  );
};

export default PdfWrhPdfInfo;
