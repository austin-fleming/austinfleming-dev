interface IGlobalConfig {
  cors: {
    origins: string[];
  };
  server: {
    apiRoot: string;
    host: string;
    port: number;
  };
}

const config: IGlobalConfig = {
  cors: {
    origins: ["*"],
  },
  server: {
    apiRoot: "/api/v1",
    host: "http://localhost",
    port: 443,
  },
};

export default config;
