import express = require("express");
import type { Server as HttpServer } from "node:http";
import { terminateServer } from "./utils/error-handling/terminate-server";
import corsMiddleware from "./middleware/cors.middleware";
import securityHeadersMiddleware from "./middleware/security-headers.middleware";

const API_ROOT = "/api/v1";
const HOST = "http://localhost";
const PORT = 443;

const app = express();

app.use(corsMiddleware);
app.use(securityHeadersMiddleware);

app.get(`${API_ROOT}/ping`, (request, response, next) => {
  response.status(200).json({ health_status: "OK" });
});

// TODO: will need to change to https when in production
const server: HttpServer = app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
});

const exitHandler = terminateServer(server);
process.on("SIGINT", exitHandler(0, "SIGINT"));
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("uncaughtException", exitHandler(1, "Unexpected Error"));
process.on("unhandledRejection", exitHandler(1, "Unhandled Promise"));

export default app;
