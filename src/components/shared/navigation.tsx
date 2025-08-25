import { routes } from "@/constants/routes";
import {
  Box,
  CreditCard,
  HomeIcon,
  ShoppingBasket,
  ShoppingCart,
  Truck,
  UsersRound,
} from "lucide-react";

export const navigation = [
  {
    key: "dashboard",
    home: true,
    icon: <HomeIcon size={20} />,
    title: "general.dashboard",
    href: routes.DASHBOARD,
  },
  {
    key: "sales",
    icon: <ShoppingCart size={20} />,
    title: "general.sales",
    href: `${routes.SALES_LAYOUT}/${routes.SALES_ORDERS}`,
  },
  {
    key: "purchases",
    icon: <ShoppingBasket size={20} />,
    title: "general.purchases",
    href: `${routes.PURCHASE_LAYOUT}/${routes.PURCHASE_INVOICES}`,
  },

  {
    key: "payments",
    icon: <CreditCard size={20} />,
    title: "general.payments",
    href: `${routes.PAYMENTS_LAYOUT}/${routes.INCOMING_PAYMENTS}`,
  },
  {
    key: "stocks",
    icon: <Truck size={20} />,
    title: "general.stocks",
    href: `${routes.STOCKS_LAYOUT}/${routes.STOCKS_PRODUCTS}`,
  },
  {
    key: "reports",
    icon: <Box size={20} />,
    title: "general.reports",
    href: routes.REPORTS,
  },
  {
    key: "clients",
    icon: <UsersRound size={20} />,
    title: "general.clients",
    href: routes.CLIENTS,
  },
];
