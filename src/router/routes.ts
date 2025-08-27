import { routes } from "@/constants/routes";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/dashboard";

import SalesLayoutPage from "@/pages/sales";
import SalesOrders from "@/features/sales/sales-orders";
import CanceledSales from "@/features/sales/canceled-sales";
import SalesReports from "@/features/sales/sales-reports";
import Sales from "@/features/sales/sales";
import PurchaseInvoices from "@/features/purchases/purchase-invoices";
import ReceivingProducts from "@/features/purchases/receiving-products";
import IncomingPayments from "@/features/payments/incoming-payments";
import OutgoingPayments from "@/features/payments/outgoing-payments";
import StockProducts from "@/features/stocks/stock-products";
import Reports from "@/pages/reports";
import Clients from "@/pages/clients";
import StocksIncomingProducts from "@/features/stocks/stocks-incoming-products";
import StocksReceivingProducts from "@/features/stocks/stocks-receiving-products";
import PurchasesLayoutPage from "@/pages/purchases";
import PaymentsLayoutPage from "@/pages/payments";
import StocksLayoutPage from "@/pages/stocks";
import StocksDeliveredProducts from "@/features/stocks/stocks-delivered-products";
import PdfChequePage from "@/pages/pdf-cheque";
import PdfOderPage from "@/pages/pdf-order-page";
import PdfWrhPdfPage from "@/pages/pdf-wrhpdf";

export const publicRoutes = [
  {
    path: routes.LOGIN,
    element: LoginPage,
  },
];

export const privateRoutes = [
  {
    path: routes.DASHBOARD,
    element: DashboardPage,
  },
  {
    path: routes.SALES_LAYOUT,
    element: SalesLayoutPage,
    children: [
      { path: routes.SALES_ORDERS, element: SalesOrders },
      { path: routes.SALES, element: Sales },
      { path: routes.CANCELED_SALES, element: CanceledSales },
      { path: routes.SALES_REPORTS, element: SalesReports },
    ],
  },
  {
    path: routes.PURCHASE_LAYOUT,
    element: PurchasesLayoutPage,
    children: [
      { path: routes.PURCHASE_INVOICES, element: PurchaseInvoices },
      { path: routes.PURCHASE_PRODUCTS, element: ReceivingProducts },
    ],
  },
  {
    path: routes.PAYMENTS_LAYOUT,
    element: PaymentsLayoutPage,
    children: [
      { path: routes.INCOMING_PAYMENTS, element: IncomingPayments },
      { path: routes.OUTGOING_PAYMENTS, element: OutgoingPayments },
    ],
  },
  {
    path: routes.STOCKS_LAYOUT,
    element: StocksLayoutPage,
    children: [
      { path: routes.STOCKS_PRODUCTS, element: StockProducts },
      {
        path: routes.STOCKS_INCOMING_PRODUCTS,
        element: StocksIncomingProducts,
      },
      {
        path: routes.STOCKS_RECEIVING_PRODUCTS,
        element: StocksReceivingProducts,
      },
      {
        path: routes.STOCKS_DELIVERED_PRODUCTS,
        element: StocksDeliveredProducts,
      },
    ],
  },
  {
    path: routes.REPORTS,
    element: Reports,
  },
  {
    path: routes.CLIENTS,
    element: Clients,
  },

  {
    path: `${routes.PDF_CHEQUE_PAGE}/:key/:id`,
    element: PdfChequePage,
  },

  {
    path: `${routes.PDF_ORDER_PAGE}/:key/:id`,
    element: PdfOderPage,
  },

  {
    path: `${routes.PDF_WRH_PDF_PAGE}/:key/:id`,
    element: PdfWrhPdfPage,
  },
];
