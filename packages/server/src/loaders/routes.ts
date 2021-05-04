import { AuthRoutes } from "@auth/auth.config.routes";
import { CommonRoutesConfig } from "@common/common.routes.config";
import { UserRoutes } from "@user/user.config.routes";
import express from "express";
import debug from "debug";

const debugLog = debug("server:loaders-routes");
const loadRoutes = (): express.Application => {
  const app = express();
  const routes: Array<CommonRoutesConfig> = [
    new AuthRoutes(app),
    new UserRoutes(app)
  ];
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
  return app;
};

export default loadRoutes;
