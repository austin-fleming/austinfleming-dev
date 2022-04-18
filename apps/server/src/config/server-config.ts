import "dotenv/config";

export const serverConfig = {
  apiRoot: "/api/v1",
  cors: {
    origins: ["*"],
  },
  host: "http://localhost",
  port: process.env.SERVER_PORT,
};
