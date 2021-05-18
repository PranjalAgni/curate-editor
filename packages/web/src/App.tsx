import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppRouter from "./router/index";
import configureStore from "./store/configureStore";

const App = () => {
  const { store, persistor } = configureStore();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CssBaseline />
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
