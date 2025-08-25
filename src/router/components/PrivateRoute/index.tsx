import DefaultLayout from "@/components/DefaultLayout";
import { routes } from "@/constants/routes";
import type { AuthState } from "@/types/auth";
import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IPrivateRoute {
  children: ReactNode;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const auth: AuthState = useSelector((state: any) => state.auth);

  if (!auth.isLogged && !auth.token) {
    return <Navigate to={routes.LOGIN} replace />;
  }

  return <DefaultLayout>{children}</DefaultLayout>;
};

export default PrivateRoute;
