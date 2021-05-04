import config from "@config/index";
import logger from "@utils/logger";
import debug from "debug";
import { Connection, createConnection } from "typeorm";

const debugLog = debug("server:loaders-db");

const loadDB = async (): Promise<Connection> => {
  const db = await createConnection();
  if (config.isDev) {
    // await db.synchronize();
    debugLog("DB synced");
  }

  logger.info("DB connected");

  return db;
};

export default loadDB;
