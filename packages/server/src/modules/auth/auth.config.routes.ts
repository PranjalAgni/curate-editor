import { CommonRoutesConfig } from "@common/common.routes.config";
import userController from "@user/controllers/user.controller";
import userMiddleware from "@user/middlewares/user.middleware";
import express from "express";
import authMiddleware from "./middlewares/auth.middleware";

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "AuthRoutes");
  }

  configureRoutes(): express.Application {
    this.app.post("/auth/signup", [
      userMiddleware.validateCreateUserBody,
      userController.createUser
    ]);

    this.app.post("/auth/signin", [
      userMiddleware.validateUserSignIn,
      userController.signinUser
    ]);

    this.app.post(
      "/auth/signout",
      authMiddleware.isAuth,
      userController.signoutUser
    );

    return this.app;
  }
}
