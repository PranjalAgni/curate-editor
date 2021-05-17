import { AxiosResponse } from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "typesafe-actions";
import { makeAPICall } from "../../utils/api";
import { signupFailed, signupSuccess } from "./actions";
import {
  StartUserSignup,
  UserActionTypes,
  UserSignupFailed,
  UserSignupSuccess
} from "./types";

function* handleSignupWorker(
  action: PayloadAction<UserActionTypes.START_SIGNUP, StartUserSignup>
) {
  let response: AxiosResponse | null = null;
  try {
    response = yield call(makeAPICall, {
      url: "/auth/signup",
      payload: action.payload
    });

    const result = response?.data.result as UserSignupSuccess;
    console.log("API Status: ", response?.status);
    console.log("Body: ", result);

    yield put(signupSuccess(result));
  } catch (ex) {
    const errors = (ex?.response?.data?.error ?? []) as UserSignupFailed;
    yield put(signupFailed(errors));
  }
}

function* watchForSignup() {
  yield takeLatest(UserActionTypes.START_SIGNUP, handleSignupWorker);
}

function* userSagas() {
  yield all([fork(watchForSignup)]);
}

export default userSagas;
