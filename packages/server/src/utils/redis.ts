import config from "@config/index";
import Redis from "ioredis";
import logger from "./logger";

const redis = new Redis({
  host: config.redis.host,
  port: config.redis.port
});

redis.on("error", (err) => {
  logger.error(`Redis error occured: ${JSON.stringify(err)}`);
});

redis.on("connect", () => {
  logger.info(`Connected to redis successfully: ${new Date()}`);
});

export default redis;
