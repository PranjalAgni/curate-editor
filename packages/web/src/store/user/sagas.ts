import { AxiosResponse, AxiosError } from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "typesafe-actions";
import { makeAPICall } from "../../utils/api";
import {
  signinFailed,
  signinSuccess,
  signupFailed,
  signupSuccess
} from "./actions";
import {
  StartUserSignin,
  StartUserSignup,
  UserActionTypes,
  UserSigninFailed,
  UserSigninSuccess,
  UserSignupFailed,
  UserSignupSuccess
} from "./types";

function* handleSignupWorker(
  action: PayloadAction<UserActionTypes.START_SIGNUP, StartUserSignup>
) {
  try {
    const response: AxiosResponse = yield call(makeAPICall, {
      url: "/auth/signup",
      payload: action.payload
    });

    const result = response?.data.result as UserSignupSuccess;
    console.log("API Status: ", response?.status);
    console.log("Body: ", result);

    yield put(signupSuccess(result));
  } catch (ex) {
    const error = ex as AxiosError;
    const errors = (error?.response?.data?.error ?? []) as UserSignupFailed;
    yield put(signupFailed(errors));
  }
}

function* handleSigninWorker(
  action: PayloadAction<UserActionTypes.START_SIGNIN, StartUserSignin>
) {
  try {
    const response: AxiosResponse = yield call(makeAPICall, {
      url: "/auth/signin",
      payload: action.payload
    });

    const result = response.data?.result as UserSigninSuccess;
    console.log("Body: ", result);
    yield put(signinSuccess(result));
  } catch (ex) {
    const error = ex as AxiosError;
    const errors = (error?.response?.data?.error ?? []) as UserSigninFailed;
    yield put(signinFailed(errors));
  }
}

function* handleSignoutWorker() {
  try {
    const response: AxiosResponse = yield call(makeAPICall, {
      url: "/auth/signout"
    });

    console.log("Response: ", response.status);
  } catch (ex) {
    console.log((ex as AxiosError).response);
  }
}

function* watchForSignin() {
  yield takeLatest(UserActionTypes.START_SIGNIN, handleSigninWorker);
}

function* watchForSignup() {
  yield takeLatest(UserActionTypes.START_SIGNUP, handleSignupWorker);
}

function* watchForSignout() {
  yield takeLatest(UserActionTypes.SIGNOUT_USER, handleSignoutWorker);
}

function* userSagas() {
  yield all([watchForSignup, watchForSignin, watchForSignout].map(fork));
}

export default userSagas;
