import { Store, createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { ApplicationState, createRootReducer, rootSaga } from "./index";

export default function configureStore(): Store<ApplicationState> {
  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const rootReducer = createRootReducer();
  const store = createStore(
    rootReducer,
    undefined,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
