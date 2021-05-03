import authDao from "@core/daos/auth.dao";
import userDao from "@core/daos/user.dao";
import { User } from "@entities/User";
import { hashPassword } from "@utils/password";
import { SignupUser, SignupUserRes } from "@utils/types/user";
import debug from "debug";
import { Body, JsonController, Post } from "routing-controllers";

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

      const newUser = new User();
      newUser.fullName = user.fullName;
      newUser.email = user.email;
      newUser.password = await hashPassword(user.password);
      await userDao.create(newUser);
      const sessionId = await authDao.create(newUser);
      return {
        message: "OK",
        sessionId
      };
      // here user is unique
      // hash the password before saving in DB
      // save data to DB
      // create a session for the user
      // return the sessionId in cookies
      // return the response
    } catch (ex) {
      debugLog(ex);
      throw ex;
    }
  }
}

export default UserController;
