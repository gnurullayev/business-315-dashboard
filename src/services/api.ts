import Axios from "axios";
import { dispatch, getState } from "../store";
import { handleError } from "@/lib/apiErrorShow";

export const BASE_URL = "https://master-shina-backend.bis-apps.com/";

export const axiosInstance = Axios.create({
  baseURL: BASE_URL + "api/",

  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getState().auth.token;

    if (!config.headers.Authorization) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },

  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    if (status === 401) {
      setTimeout(() => {
        dispatch.auth.logoutAsync();
      }, 3000);
      return error;
    }
    handleError(error);
    return Promise.reject(error);
  }
);

export const API = {
  //AUTH
  login: (data: any) =>
    axiosInstance.post("auth", data).then((res) => res.data.data),
  me: () => axiosInstance.get("auth/me").then((res) => res.data),

  getDailySales: (params: any) =>
    axiosInstance
      .get("dashboards/daily-sales", { params })
      .then((res) => res.data),

  //BUSINESSPARTNERS
  postBusinessPartners: (data: any) =>
    axiosInstance.post("businesspartners", data).then((res) => res.data.data),
  getBusinessPartners: (params: any) =>
    axiosInstance.get("businesspartners", { params }).then((res) => res.data),
  getBusinessPartnersGroups: () =>
    axiosInstance.get("businesspartners/groups").then((res) => res.data),
  getCurrencyRate: () =>
    axiosInstance.get("currencies/get-currency-rate").then((res) => res.data),
  getWarehouses: () => axiosInstance.get("warehouses").then((res) => res.data),
  getBusinessPartnersInfo: (params?: any) =>
    axiosInstance
      .get("businesspartners/info", { params })
      .then((res) => res.data),

  //
  //SALES
  getSalesOrders: (params?: any) =>
    axiosInstance.get("sales/orders", { params }).then((res) => res.data),
  getSalesList: (params?: any) =>
    axiosInstance.get("sales/invoices", { params }).then((res) => res.data),
  getSalesEmployees: (params?: any) =>
    axiosInstance.get("salesemployees", { params }).then((res) => res.data),
  postSalesOrders: (data: any) =>
    axiosInstance.post("sales/orders", data).then((res) => res.data.data),
  patchSalesOrders: (data: any, id: number) =>
    axiosInstance
      .patch(`sales/orders/${id}`, data)
      .then((res) => res.data.data),
  postSalesInvoices: (data: any) =>
    axiosInstance.post("sales/invoices", data).then((res) => res.data.data),
  postSalesOrdersClose: (id: number) =>
    axiosInstance.post(`sales/orders/${id}/close`).then((res) => res.data.data),
  postSalesOrdersCancel: (id: number) =>
    axiosInstance
      .post(`sales/orders/${id}/cancel`)
      .then((res) => res.data.data),
  postSalesCancel: (data: any) =>
    axiosInstance.post("sales/credit-notes", data).then((res) => res.data.data),
  getSalesCreditNotes: (params?: any) =>
    axiosInstance.get("sales/credit-notes", { params }).then((res) => res.data),

  //ITEMS
  getInventoryItems: (params: any) =>
    axiosInstance
      .get("items/inventory-items", { params })
      .then((res) => res.data),
  getItemsData: (params: any) =>
    axiosInstance.get("items/items", { params }).then((res) => res.data),
  getOnHandItems: (params: any) =>
    axiosInstance.get("items/onhand-items", { params }).then((res) => res.data),

  //PAYMENT
  postIncomingPaymentBatch: (data: any) =>
    axiosInstance
      .post("payments/incoming-payment/batch", data)
      .then((res) => res.data.data),
  postIncomingPayment: (data: any) =>
    axiosInstance
      .post("payments/incoming-payment", data)
      .then((res) => res.data.data),
  getIncomingPaymentInvoices: (params: any) =>
    axiosInstance
      .get("payments/incoming-payments/invoices", { params })
      .then((res) => res.data),
  getVendorPaymentAccounts: (params: any) =>
    axiosInstance
      .get("payments/vendor-payments/accounts", { params })
      .then((res) => res.data),
  postVendorPayment: (data: any) =>
    axiosInstance
      .post("payments/vendor-payments", data)
      .then((res) => res.data.data),

  //PURCHASES
  getPurchaseInvoices: (params: any) =>
    axiosInstance
      .get("purchases/purchase-invoices", { params })
      .then((res) => res.data),
  getReservePurchaseInvoices: (params: any) =>
    axiosInstance
      .get("purchases/reserve-purchase-invoices", { params })
      .then((res) => res.data),
  postPurchaseInvoices: (data: any) =>
    axiosInstance
      .post("purchases/purchase-invoices", data)
      .then((res) => res.data.data),
  postPurchaseInvoicesCancel: (docEntry: any) =>
    axiosInstance
      .post(`purchases/purchase-invoices/${docEntry}/cancel`, docEntry)
      .then((res) => res.data.data),

  //CASH_ACCOUNTS
  getCashAccounts: (params: any) =>
    axiosInstance.get("cashaccounts", { params }).then((res) => res.data),

  //INVENTORY_TRANSFER_REQUESTS
  getInventoryTransferRequests: (params: any) =>
    axiosInstance
      .get("inventorytransferrequests", { params })
      .then((res) => res.data),
  postInventoryTransferRequests: (data: any) =>
    axiosInstance
      .post("inventorytransferrequests", data)
      .then((res) => res.data.data),
  patchInventoryTransferRequests: (data: any, docEntry: number) =>
    axiosInstance
      .patch(`inventorytransferrequests/${docEntry}`, data)
      .then((res) => res.data.data),

  //STOCK_TRANSFER
  getStockTransfers: (params: any) =>
    axiosInstance.get("stockTransfers", { params }).then((res) => res.data),
  postStockTransfers: (data: any) =>
    axiosInstance.post("stockTransfers", data).then((res) => res.data),
};
