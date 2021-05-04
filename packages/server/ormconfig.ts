// eslint-disable-next-line @typescript-eslint/no-var-requires
const { join } = require("path");

module.exports = {
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: true,
  database: process.env.DB_SCHEMA,
  entities: [join(__dirname, "dist/entities", "*.{ts,js}")],
  migrations: [join(__dirname, "dist/migrations", "*.{ts,js}")],
  subscribers: [join(__dirname, "dist/subscribers", "*.{ts,js}")]
};
