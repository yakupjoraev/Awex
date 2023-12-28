import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { PropsWithChildren } from "react";
import { ROUTE } from "@constants/path-locations";

export type ProvateRouteProps = PropsWithChildren<{}>;

export function PrivateRoute(props: ProvateRouteProps) {
  const authorized = useAppSelector((state) => state.auth.user !== undefined);
  if (!authorized) {
    return <Navigate to={ROUTE.AUTH_PATH} state={{ from: null }} />;
  }
  return <>{props.children}</>;
}
