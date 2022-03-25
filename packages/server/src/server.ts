// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({
  allowEmptyValues: true
});
require("module-alias/register");
import config from "@config/index";
import logger from "@utils/logger";
import debug from "debug";
import path from "path";
import "reflect-metadata";
import initalizeApp from "./app";

const startServer = async () => {
  const debugLog: debug.IDebugger = debug("server");

  debugLog(path.join(__dirname, "../", ".env.development"));

  const app = await initalizeApp();

  app.listen(config.port, () => {
    logger.info(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

startServer();
