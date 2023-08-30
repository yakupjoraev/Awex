import { Navigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { PropsWithChildren } from "react";

export type ProvateRouteProps = PropsWithChildren<{}>;

export function PrivateRoute(props: ProvateRouteProps) {
  const authorized = useAppSelector((state) => state.auth.user !== undefined);
  if (!authorized) {
    return <Navigate to="/auth" state={{ from: null }} />;
  }
  return <>{props.children}</>;
}
