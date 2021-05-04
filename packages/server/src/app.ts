import { CommonRoutesConfig } from "@common/common.routes.config";
import logger, { loggerStreamWrite } from "@utils/logger";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createConnection } from "typeorm";
import loadDB from "./loaders/db";
import loadRoutes from "./loaders/routes";

const initalizeApp = async (): Promise<express.Application> => {
  const app: express.Application = express();
  const debugLog: debug.IDebugger = debug("server:app");

  await loadDB();

  // If we are behind some reverse proxy like Nginx then we can trust this X-Forwarded-For header
  // Read More: https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
  app.enable("trust proxy");

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(
    morgan("combined", {
      stream: {
        write: loggerStreamWrite
      }
    })
  );

  app.get("/", (_req: express.Request, res: express.Response) => {
    res
      .status(200)
      .send(`Server running at http://localhost:${process.env.PORT}`);
  });

  const routes = loadRoutes();
  app.use("/api", routes);

  CommonRoutesConfig.applyErrorHandleMiddlewares(app);

  debugLog("Server is initalized");
  return app;
};

export default initalizeApp;
