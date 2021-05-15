import express from "express";
import { unprocessableEntityError } from "../../../utils/express";
import { assert } from "superstruct";
import {
  CreateUserStruct,
  ReadUserByIdStruct,
  SignInUserStruct
} from "../dtos/user.dto";

class UserMiddleware {
  private static instance: UserMiddleware;

  static getInstance() {
    if (!UserMiddleware.instance) {
      UserMiddleware.instance = new UserMiddleware();
    }
    return UserMiddleware.instance;
  }

  validateCreateUserBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.body, CreateUserStruct);
      return next();
    } catch (ex) {
      return unprocessableEntityError(ex, res, next);
    }
  }

  validateUserId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.params, ReadUserByIdStruct);
      return next();
    } catch (ex) {
      return unprocessableEntityError(ex, res, next);
    }
  }

  validateUserSignIn(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      assert(req.body, SignInUserStruct);
      return next();
    } catch (ex) {
      return unprocessableEntityError(ex, res, next);
    }
  }

  addUserAuthToken(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const sessionId = req.sessionId;
    res.setHeader("authorization", sessionId);
    return next();
  }
}

export default UserMiddleware.getInstance();
