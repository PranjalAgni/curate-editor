import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { useExpressServer } from "routing-controllers";

const debugLog = debug("ces:server");

const initalizeServer = (): express.Application => {
  const app = express();
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan("combined"));

  debugLog("All Middlewares applied");
  useExpressServer(app, {
    routePrefix: "/api",
    controllers: [__dirname + "/controllers/*.ts"]
  });
  return app;
};

export default initalizeServer;
