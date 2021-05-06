import {
  coerce,
  defaulted,
  Infer,
  number,
  object,
  size,
  string
} from "superstruct";

import { Email } from "@utils/validators";

export const CreateUserStruct = object({
  fullName: size(string(), 3, 50),
  email: Email,
  password: string()
});

export const ReadUserStruct = object({
  sortBy: defaulted(string(), "popular"),
  page: defaulted(
    coerce(number(), string(), (value) => +value),
    1
  ),
  limit: defaulted(
    coerce(number(), string(), (value) => +value),
    10
  )
});

export const ReadUserByIdStruct = object({
  userId: coerce(number(), string(), (value) => +value)
});

export type CreateUserDto = Infer<typeof CreateUserStruct>;
export type ReadUserDto = Infer<typeof ReadUserStruct>;
export type ReadUserByIdDto = Infer<typeof ReadUserByIdStruct>;
