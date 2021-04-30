import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Signup from "../components/Auth/Signup";

const AppRouter = () => (
  <Layout>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Signup} />
      </Switch>
    </HashRouter>
  </Layout>
);

export default AppRouter;
