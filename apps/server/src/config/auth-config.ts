import "dotenv/config";

type AuthConfig = {
  redisHost: string;
  redisPassword: string;
  redisPort: string;
  tokenExpiryTime: number;
};

export const authConfig: AuthConfig = {
  redisHost: process.env.REDIS_HOST,
  redisPassword: process.env.REDIS_PASSWORD,
  redisPort: process.env.REDIS_PORT,
  tokenExpiryTime: 604_800,
};
