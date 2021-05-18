import React from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const [isAuth] = useAuth();

  if (!isAuth) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}
