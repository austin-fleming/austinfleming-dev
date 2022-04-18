import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "./utils/error-handling/terminate-server";
import corsMiddleware from "./middleware/cors.middleware";
import securityHeadersMiddleware from "./middleware/security-headers.middleware";
import bodyParserMiddleware from "./middleware/body-parser.middleware";
import config from "./config";
import appLoader from "./loaders/app.loader";

/* app
  .use(corsMiddleware)
  .use(securityHeadersMiddleware)
  .use(bodyParserMiddleware);

app.get(`${config.server.apiRoot}/ping`, (request, response, next) => {
  response.status(200).json({ health_status: "OK" });
});

// TODO: will need to change to https when in production
const server: HttpServer = app.listen(config.server.port, () => {
  console.log(`Server running on ${config.server.host}:${config.server.port}`);
});

const exitHandler = terminateServer(server);
process.on("SIGINT", exitHandler(0, "SIGINT"));
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));

export default app; */

const startServer = () => {
  const app = express();

  const server: HttpServer = appLoader(app).listen(config.server.port, () => {
    console.log(
      `
      ~~~
      👂 Server running :: ${config.server.host}:${config.server.port}
      ~~~
      `
    );
  });

  app.post('/login', (request, response) => {
    
  })

  const exitHandler = terminateServer(server);
  process
    .on("SIGINT", exitHandler(0, "SIGINT"))
    .on("SIGTERM", exitHandler(0, "SIGTERM"))
    .on("uncaughtException", exitHandler(1, "Unexpected Error"))
    .on("unhandledRejection", exitHandler(1, "💥💥💥 Unhandled Promise"));

  // const exceptionCrashTest = setTimeout(() => {
  //   throw new Error("Test for uncaught exception");
  // }, 3000);

  // const rejectionCrashTest = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     reject();
  //   }, 3000);
  // });
};

startServer();
