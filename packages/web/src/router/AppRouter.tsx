import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Auth/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => (
  <Layout>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Signup} />
        <PrivateRoute exact path="/dash" component={Dashboard} />
      </Switch>
    </HashRouter>
  </Layout>
);

export default AppRouter;
