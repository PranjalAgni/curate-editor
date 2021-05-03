import { Connection, createConnection } from "typeorm";
import debug from "debug";
import config from "@config/index";

const connectDB = async (): Promise<Connection> => {
  const debugLog = debug("ces:loaders-db");
  let db = null;
  try {
    debugLog("Starting to connect DB");
    db = await createConnection();
    debugLog("Successfully DB connected");
  } catch (err) {
    debugLog(err);
  }

  if (config.isDev) await db.synchronize();
  return db;
};

export default connectDB;
