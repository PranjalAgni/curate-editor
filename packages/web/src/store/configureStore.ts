import {
  Store,
  createStore,
  applyMiddleware,
  EmptyObject,
  AnyAction
} from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationState, createRootReducer, rootSaga } from "./index";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Reducer } from "react";
import { PersistPartial } from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { Persistor } from "redux-persist/es/types";

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
