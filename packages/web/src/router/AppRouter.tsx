import { ThemeProvider } from "@material-ui/styles";
import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Signup from "../ui/Signup";
import theme from "../theme/index";

const AppRouter = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Signup} />
      </Switch>
    </HashRouter>
  </ThemeProvider>
);

export default AppRouter;
