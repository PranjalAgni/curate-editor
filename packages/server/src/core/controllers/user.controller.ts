import debug from "debug";
import { Body, JsonController, Post } from "routing-controllers";
import { SignupUser, SignupUserRes } from "user";
import userDao from "../daos/user.dao";

const debugLog = debug("ces:controllers-user");
@JsonController("/user")
class UserController {
  @Post("/signup")
  async signup(@Body() user: SignupUser): Promise<SignupUserRes> {
    try {
      const oldUser = await userDao.getUserByMail(user.email);
      if (oldUser) {
        debugLog("User already exists");
        throw new Error("User already exists");
      }

      // here user is unique
      // hash the password before saving in DB
      // save data to DB
      // create a session for the user
      // return the sessionId in cookies
      // return the response
    } catch (ex) {
      debugLog(ex);
    }

    return {
      message: "OK"
    };
  }
}

export default UserController;
