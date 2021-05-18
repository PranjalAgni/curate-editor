/* eslint-disable import/prefer-default-export */
import { action } from "typesafe-actions";
import {
  SetUser,
  StartUserSignin,
  StartUserSignup,
  UserActionTypes,
  UserSigninFailed,
  UserSigninSuccess,
  UserSignupFailed,
  UserSignupSuccess
} from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const startSignup = (payload: StartUserSignup) =>
  action(UserActionTypes.START_SIGNUP, payload);

export const signupSuccess = (payload: UserSignupSuccess) =>
  action(UserActionTypes.SIGNUP_SUCCESS, payload);

export const signupFailed = (payload: UserSignupFailed) =>
  action(UserActionTypes.SIGNUP_FAILED, payload);

export const startSignin = (payload: StartUserSignin) =>
  action(UserActionTypes.START_SIGNIN, payload);

export const signinSuccess = (payload: UserSigninSuccess) =>
  action(UserActionTypes.SIGNIN_SUCCESS, payload);

export const signinFailed = (payload: UserSigninFailed) =>
  action(UserActionTypes.SIGNIN_FAILED, payload);

export const setUser = (user: SetUser) =>
  action(UserActionTypes.SET_USER, user);

export const startSignout = () => action(UserActionTypes.SIGNOUT_USER);
