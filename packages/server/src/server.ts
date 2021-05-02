import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { createExpressServer } from "routing-controllers";
import loaders from "./loaders/index";
const debugLog = debug("ces:server");

const initalizeServer = async (): Promise<express.Application> => {
  await loaders();
  const app = createExpressServer({
    routePrefix: "/api",
    controllers: [__dirname + "/core/controllers/*.ts"]
  });
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));

  debugLog("All Middlewares applied");
  return app;
};

export default initalizeServer;
