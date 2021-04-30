import { ThemeProvider } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { ReactElement } from "react";
import Navbar from "../common/Navbar";
import theme from "./theme";

const Layout = ({ children }: { children: ReactElement | ReactElement[] }) => (
  <ThemeProvider theme={theme}>
    <Navbar />
    {children}
  </ThemeProvider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
