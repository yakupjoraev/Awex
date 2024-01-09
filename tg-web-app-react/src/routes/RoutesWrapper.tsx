import React, { useContext, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "../store";
import cookies from "../services/cookies";
import Loading from "../components/Loading";
import { ROUTES } from "./routes";
import Withdraw from "../pages/Withdraw";

const Header = React.lazy(() => import("../components/Header"));
const Home = React.lazy(() => import("../pages/Home"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const SignIn = React.lazy(() => import("../pages/SignIn"));
const SignUp = React.lazy(() => import("../pages/SignUp"));
const Invoice = React.lazy(() => import("../pages/Invoice"));

const RoutesWrapper: React.FC = () => {
  const store = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = cookies.get("token");
    token && store.site.setToken(token);
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route
            index
            element={
              <React.Suspense>
                {store?.site?.token ? <Dashboard /> : <Home />}
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.LOGIN}
            element={
              <React.Suspense>
                {store.site.token ? <Navigate to={ROUTES.MAIN} /> : <SignIn />}
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.INVOICE}
            element={
              <React.Suspense>
                <Invoice />
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.WITHDRAW}
            element={
              <React.Suspense>
                {store.site.token ? <Withdraw /> : <Home />}
              </React.Suspense>
            }
          />
          <Route
            path={ROUTES.DEFAULT}
            element={<Navigate to={ROUTES.MAIN} replace />}
          />
        </Routes>
      )}
    </>
  );
};

export default RoutesWrapper;
