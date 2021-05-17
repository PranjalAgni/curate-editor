import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { ApplicationState } from "../store/";

export default function PrivateRoute({ children, ...rest }: RouteProps) {
  const { isAuthenticated, email } = useSelector(
    (state: ApplicationState) => state.user
  );

  if (!isAuthenticated || !email) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}
