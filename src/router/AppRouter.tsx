import { privateRoutes, publicRoutes } from "./routes";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router-dom";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

const renderRoute = (el: any, isPrivate = false) => {
  const Wrapper = isPrivate ? PrivateRoute : PublicRoute;

  return (
    <Route
      key={el.path}
      path={el.path}
      element={
        <Wrapper>
          <el.element />
        </Wrapper>
      }
    >
      {el.children &&
        el.children.map((child: any) => (
          <Route
            key={child.path}
            path={child.path}
            element={<child.element />}
          />
        ))}
    </Route>
  );
};

const AppRoute = () => {
  return (
    <Routes>
      {publicRoutes.map((el) => renderRoute(el, false))}
      {privateRoutes.map((el) => renderRoute(el, true))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoute;
