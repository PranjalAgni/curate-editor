/* eslint-disable import/prefer-default-export */
import { action } from "typesafe-actions";

import { UserActionTypes, User } from "./types";

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
//
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.

export const setUser = (user: User) => action(UserActionTypes.SET_USER, user);
