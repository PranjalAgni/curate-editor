import { CommonObject } from "../../utils/types";

export type SetUser = {
  fullName: string;
  email: string;
};

export type StartUserSignup = {
  fullName: string;
  email: string;
  password: string;
};

export type UserSignupSuccess = {
  fullName: string;
  email: string;
};

export type UserSignupFailed = {
  errors: CommonObject[];
};

export type StartUserSignin = {
  email: string;
  password: string;
};

export type UserSigninSuccess = UserSignupSuccess;

export type UserSigninFailed = UserSignupFailed;

export enum UserActionTypes {
  START_SIGNUP = "@@user/START_SIGNUP",
  SIGNUP_SUCCESS = "@@user/SIGNUP_SUCCESS",
  SIGNUP_FAILED = "@@user/SIGNUP_FAILED",
  SET_USER = "@@user/SET_USER",
  SIGNOUT_USER = "@@user/SIGNOUT_USER",
  START_SIGNIN = "@@user/START_SIGNIN",
  SIGNIN_SUCCESS = "@@user/SIGNIN_SUCCESS",
  SIGNIN_FAILED = "@@user/SIGNIN_FAILED"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UserState {
  readonly fullName: string | null;
  readonly email: string | null;
  readonly isAuthenticated: boolean;
  readonly isLoading: boolean;
  readonly errors?: CommonObject[];
}
