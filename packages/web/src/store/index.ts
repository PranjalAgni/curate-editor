import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";
import userSagas from "./user/sagas";
import { UserState, userReducer } from "./user";

// The top-level state object
export interface ApplicationState {
  user: UserState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const createRootReducer = () =>
  combineReducers({
    user: userReducer
  });

export function* rootSaga() {
  yield all([userSagas].sort().map(fork));
}
