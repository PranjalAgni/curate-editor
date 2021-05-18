import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Auth/Signup";
import Dashboard from "../components/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Signin from "../components/Auth/Signin";

const AppRouter = () => (
  <HashRouter>
    <Layout>
      <Switch>
        <Route exact path="/" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/dash" component={Dashboard} />
      </Switch>
    </Layout>
  </HashRouter>
);

export default AppRouter;
