import type { FormModeType } from "@/types";
import { Button } from "antd";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import type { StockType } from "../../types";
interface IProps {
  handleClose: () => void;
  loading: boolean;
  mode: FormModeType;
  stockType: StockType;
  stockTransfersPending: boolean;
  handleStockTransfers: () => void;
}

const StockFormModalCreateFooter: FC<IProps> = ({
  loading,
  handleClose,
  mode,
  stockType,
  handleStockTransfers,
  stockTransfersPending,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="stock_form_create__footer">
        {stockType === "incoming-products" && (
          <Button
            type="primary"
            loading={stockTransfersPending}
            disabled={stockTransfersPending}
            onClick={handleStockTransfers}
          >
            {t("general.receive")}
          </Button>
        )}
        {stockType === "stock-products" && (
          <>
            {mode !== "CREATE" ? (
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={loading}
              >
                {t("general.edit")}
              </Button>
            ) : (
              <>
                {" "}
                <Button type="default" onClick={handleClose}>
                  {t("general.back")}
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={loading}
                >
                  {t("general.add")}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default StockFormModalCreateFooter;
