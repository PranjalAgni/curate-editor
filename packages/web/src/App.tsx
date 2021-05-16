import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./router/index";
import configureStore from "./store/configureStore";

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <CssBaseline />
      <AppRouter />
    </Provider>
  );
};

export default App;
