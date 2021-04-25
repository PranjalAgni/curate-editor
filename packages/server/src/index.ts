import "reflect-metadata";
import debug from "debug";
import initalizeServer from "./server";

const debugLog = debug("ces:index");

const startServer = () => {
  const app = initalizeServer();
  const PORT = 5000;
  app.listen(PORT, () => {
    debugLog(`Server running at http://localhost:${PORT}`);
  });
};

startServer();
