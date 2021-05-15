import isEmail from "is-email";
import { define } from "superstruct";

export const Email = define<string>("Email", isEmail);
