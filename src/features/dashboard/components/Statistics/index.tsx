import { useMemo, type FC } from "react";
import "./styles.scss";
import { CircleDollarSign, ShoppingCart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { API } from "@/services/api";
import Loader from "@/components/Loader";
import { useTranslation } from "react-i18next";

interface IProps {
  filter?: { startDate: any; endDate: any };
}
const Statistics: FC<IProps> = ({ filter }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["daily-sales", filter],
    queryFn: async () => API.getDailySales(filter),
  });
  const { t } = useTranslation();

  const totalCount = useMemo(() => {
    return (data?.data || []).reduce(
      (acc: any, el: any) => {
        acc.invoiceTotal += el.invoiceTotal || 0;
        acc.paymentTotal += el.paymentTotal || 0;
        return acc;
      },
      { invoiceTotal: 0, paymentTotal: 0 }
    );
  }, [data?.data]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="dashboard_statistics">
      <div className="dashboard_statistics__card">
        <div className="dashboard_statistics__info">
          <span className="dashboard_statistics__icon dashboard_statistics__icon__blue">
            <ShoppingCart />
          </span>
          <b className="dashboard_statistics__text">
            {t("dashboard.totalSalesAmount")}
          </b>
        </div>
        <span className="dashboard_statistics__total dashboard_statistics__total__blue">
          {totalCount.invoiceTotal}
        </span>
      </div>

      <div className="dashboard_statistics__card">
        <div className="dashboard_statistics__info">
          <span className="dashboard_statistics__icon dashboard_statistics__icon__primary">
            <CircleDollarSign />
          </span>
          <b className="dashboard_statistics__text">
            {t("dashboard.totalPaymentAmount")}
          </b>
        </div>
        <span className="dashboard_statistics__total dashboard_statistics__total__primary">
          {totalCount.paymentTotal}
        </span>
      </div>
    </div>
  );
};

export default Statistics;
