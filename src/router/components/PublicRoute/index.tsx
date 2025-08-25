import { routes } from "@/constants/routes";
import type { AuthState } from "@/types/auth";
import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IPublicRoute {
  children: ReactNode;
}

const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  const auth: AuthState = useSelector((state: any) => state.auth);

  if (auth.isLogged && auth.token) {
    return <Navigate to={routes.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
