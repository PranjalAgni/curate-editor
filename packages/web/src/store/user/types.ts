/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */

export type User = {
  firstName: string;
  email: string;
};

export enum UserActionTypes {
  SET_USER = "@@user/SET_USER"
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface UserState {
  readonly user: User | null;
}
