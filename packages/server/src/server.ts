import loaders from "@loaders/index";
import { errorHandler, notFound } from "@middlewares/common/index";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { useExpressServer } from "routing-controllers";

const debugLog = debug("ces:server");

const initalizeServer = async (): Promise<express.Application> => {
  await loaders();
  let app = express();
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));

  app = useExpressServer(app, {
    routePrefix: "/api",
    defaultErrorHandler: false,
    controllers: [__dirname + "/core/controllers/*.ts"]
  });

  app.use(notFound);
  app.use(errorHandler);

  debugLog("All Middlewares applied");

  return app;
};

export default initalizeServer;
