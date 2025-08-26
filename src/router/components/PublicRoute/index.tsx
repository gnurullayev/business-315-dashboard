import { routes } from "@/constants/routes";
import type { RootState } from "@/store";
import type { FC, ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface IPublicRoute {
  children: ReactNode;
}

const PublicRoute: FC<IPublicRoute> = ({ children }) => {
  const auth = useSelector((state: RootState) => state.auth);

  if (auth.isLogged && auth.token) {
    return <Navigate to={routes.DASHBOARD} replace />;
  }

  return children;
};

export default PublicRoute;
