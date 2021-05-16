import config from "@config/index";
import {
  CreateUserDto,
  ReadUserByIdStruct,
  ReadUserStruct,
  SignInUserDto
} from "@user/dtos/user.dto";
import InvalidCredentials from "@user/exceptions/InvalidCredentials";
import UserAlreadyExists from "@user/exceptions/UserAlreadyExists";
import UserNotFound from "@user/exceptions/UserNotFound";
import userService from "@user/services/user.service";
import { formatResponse } from "@utils/express";
import logger from "@utils/logger";
import debug from "debug";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { StatusCodes } from "http-status-codes";
import { create } from "superstruct";
const debugLog: debug.IDebugger = debug("server:user-controller");

class UserController {
  private static instance: UserController;

  static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }

    return UserController.instance;
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as CreateUserDto;
      const oldUser = await userService.getUserByEmail(data.email);
      if (oldUser) {
        throw new UserAlreadyExists(
          `User already exists: ${data.email}`,
          oldUser
        );
      }

      const user = await userService.create(data);
      req.session.userId = user.userId;
      debugLog(user);
      return formatResponse({
        res,
        result: {
          id: user.userId,
          email: user.email
        }
      });
    } catch (ex) {
      logger.error(ex.message);
      if (ex instanceof UserAlreadyExists) {
        res.status(StatusCodes.CONFLICT);
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return next(createError(res.statusCode, ex.message));
    }
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = create(req.query, ReadUserStruct);
      const userList = await userService.getAllUsers(data);
      return formatResponse({
        res,
        result: userList
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = create(req.params, ReadUserByIdStruct);

      const user = await userService.findUserById(userId);
      return formatResponse({
        res,
        result: user
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }

  async signinUser(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body as SignInUserDto;

      const signedInUser = await userService.signinUser(data);
      req.session.userId = signedInUser.userId;
      return formatResponse({
        res,
        result: {
          id: signedInUser.userId,
          email: signedInUser.email,
          name: signedInUser.fullName
        }
      });
    } catch (ex) {
      logger.error(ex.message);
      if (ex instanceof InvalidCredentials) {
        res.status(StatusCodes.FORBIDDEN);
      } else if (ex instanceof UserNotFound) {
        res.status(StatusCodes.NOT_FOUND);
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      }

      return next(createError(res.statusCode, ex.message));
    }
  }

  async signoutUser(req: Request, res: Response, next: NextFunction) {
    try {
      await req.session.destroy((err) => {
        res.clearCookie(config.cookie.name);
        if (err) throw new Error("Error occured, while deleting session");
        logger.info("Successfully logged out user");
      });

      return formatResponse({
        res,
        result: {
          success: true
        }
      });
    } catch (ex) {
      logger.error(ex.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR);
      return next(createError(StatusCodes.INTERNAL_SERVER_ERROR, ex.message));
    }
  }
}

export default UserController.getInstance();
