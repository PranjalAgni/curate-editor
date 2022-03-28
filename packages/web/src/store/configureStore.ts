import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { Persistor } from "redux-persist/es/types";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import createSagaMiddleware from "redux-saga";
import { ApplicationState, createRootReducer, rootSaga } from "./index";

type ConfigureStoreResult = {
  store: Store<ApplicationState>;
  persistor: Persistor;
};
export default function configureStore(): ConfigureStoreResult {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = createRootReducer();
  const _persistReducer = persistReducer({ key: "root", storage }, rootReducer);
  const store = createStore(
    _persistReducer,
    undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}
