import { CommonRoutesConfig } from "@common/common.routes.config";
import { loggerStreamWrite } from "@utils/logger";
import compression from "compression";
import cors from "cors";
import debug from "debug";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import connectRedis from "connect-redis";
import connectDB from "./loaders/db";
import loadRoutes from "./loaders/routes";
import config from "./config";
import redisClient from "@utils/redis";

const initalizeApp = async (): Promise<express.Application> => {
  const app: express.Application = express();
  const debugLog: debug.IDebugger = debug("server:app");
  const RedisStore = connectRedis(session);

  await connectDB();

  // If we are behind some reverse proxy like Nginx then we can trust this X-Forwarded-For header
  // Read More: https://stackoverflow.com/questions/39930070/nodejs-express-why-should-i-use-app-enabletrust-proxy
  app.set("trust proxy", 1);

  app.use(
    session({
      name: config.cookie.name,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true
      }),
      cookie: {
        maxAge: config.cookie.maxAge, // 1 day
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: !config.isDev // cookie only works in https
      },
      saveUninitialized: false,
      secret: config.session.secret,
      resave: false
    })
  );

  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true
    })
  );
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
