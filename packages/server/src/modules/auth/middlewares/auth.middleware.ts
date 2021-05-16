import { userNotAuthenticated } from "@utils/express";
import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";

class AuthMiddleware {
  private static instance: AuthMiddleware;

  static getInstance() {
    if (!AuthMiddleware.instance) {
      AuthMiddleware.instance = new AuthMiddleware();
    }
    return AuthMiddleware.instance;
  }

  // async isAuth2(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     logger.info(`Inside auth interceptor for url ${req.originalUrl}`);
  //     const authHeader = req.headers["authorization"];
  //     let token = null;
  //     if (authHeader.startsWith("Bearer ")) {
  //       token = authHeader.substring(7, authHeader.length);
  //     }

  //     if (!token) {
  //       return userNotAuthenticated(res, next);
  //     }

  //     logger.info(`Extracted token: ${token}`);

  //     const user = await userService.getUserBySessionId(token);

  //     if (!user) {
  //       logger.error("No user found");
  //       return userNotAuthenticated(res, next);
  //     }

  //     logger.info("User fetched, attaching it to request object");
  //     req.user = user;
  //     req.sessionId = token;
  //     return next();
  //   } catch (error) {
  //     logger.error(error.message);
  //     return userNotAuthenticated(res, next);
  //   }
  // }

  async isAuth(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info(`Inside auth interceptor for url ${req.originalUrl}`);
      const userId = req.session.userId;

      if (!userId) {
        logger.info("User not authenticated, returning 401");
        return userNotAuthenticated(res, next);
      }

      logger.info(`Fetched userId =  ${userId}`);

      return next();
    } catch (error) {
      logger.error(error.message);
      return userNotAuthenticated(res, next);
    }
  }
}

export default AuthMiddleware.getInstance();
