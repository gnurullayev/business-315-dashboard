import { Table } from "antd";
import "./styles.scss";
import { usePdfPrint } from "../pdf-cheque/hooks/usePdfPrint";

const PdfWrhPdfInfo = () => {
  const { isLoading, data, currencyRate, currencyRateLoading } = usePdfPrint();
  const columns = [
    { title: "№", dataIndex: "no", key: "no" },
    { title: "Код", dataIndex: "code", key: "code" },
    { title: "Товар номи", dataIndex: "name", key: "name" },
    { title: "Улв.бир", dataIndex: "unit", key: "unit" },
    { title: "Сони", dataIndex: "qty", key: "qty" },
    { title: "Склад", dataIndex: "warehouse", key: "warehouse" },
    { title: "Ячейка", dataIndex: "cell", key: "cell" },
  ];

  const data1 = [
    {
      key: "1",
      no: 1,
      code: "test1",
      name: "TOVAR A",
      unit: "Шт",
      qty: 1,
      warehouse: "Основной склад 1",
      cell: "",
    },
  ];

  return (
    <div className="pdf-wrh-pdf-info">
      <div className="pdf-wrh-pdf-info-header">
        <div>
          <p>
            <b>Клиент : </b>Test
          </p>
          <p>
            <b>Чек №:</b>41
          </p>
        </div>
        <div className="right">
          <p>
            <b>Сотувчи : </b>Bahodir
          </p>
          <p>
            <b>Курс : </b>12 700
          </p>
          <p>
            <b>Сана : </b>19.07.2025
          </p>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data1}
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
            <Table.Summary.Cell index={2}>1</Table.Summary.Cell>
            <Table.Summary.Cell index={3} colSpan={2}></Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />

      <div className="pdf-wrh-pdf-info-footer">
        <b>Харидингиз учун рахмат!</b>
      </div>
    </div>
  );
};

export default PdfWrhPdfInfo;
