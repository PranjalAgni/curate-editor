/* eslint-disable  */
const { join } = require("path");

const resolvePath = (tag) => {
  const baseDir = process.env.NODE_ENV === "production" ? "dist" : "src";
  return join(__dirname, `${baseDir}/${tag}`, "*.{ts,js}");
};

module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  database: process.env.DB_SCHEMA,
  entities: [resolvePath("entities")],
  migrations: [resolvePath("migrations")],
  subscribers: [resolvePath("subscribers")]
};
