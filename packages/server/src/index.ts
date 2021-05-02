// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv-safe").config({ allowEmptyValues: true });
import "reflect-metadata";
import debug from "debug";
import initalizeServer from "./server";
import config from "./config/index";

const debugLog = debug("ces:index");

const startServer = async () => {
  const app = await initalizeServer();
  app.listen(config.port, () => {
    debugLog(
      `Server running at http://localhost:${config.port} in ${config.env} mode`
    );
  });
};

startServer();
