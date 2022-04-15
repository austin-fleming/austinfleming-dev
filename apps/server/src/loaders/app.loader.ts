import type { Application } from "express";
import {
  corsMiddleware,
  securityHeadersMiddleware,
  bodyParserMiddleware,
  errorLoggerMiddleware,
} from "src/middleware";
import config from "src/config";

const appLoader = (app: Application): Application => {
  // PREWARE
  app
    .use(corsMiddleware)
    .use(securityHeadersMiddleware)
    .use(bodyParserMiddleware);

  app.get(
    `${config.server.apiRoot}/health-status`,
    (request, response, next) => {
      response.status(200).json({ health_status: "OK" });
    }
  );

  // POSTWARE
  app.use(errorLoggerMiddleware);

  // return app to make function chainable
  return app;
};

export default appLoader;
