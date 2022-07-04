interface EnvironmentVariables {
  DATABASE_URL: string;
  JWT_SECRET: string;
  JWT_EXPIRATION_TIME: string;
  RT_JWT_SECRET: string;
  RT_JWT_EXPIRATION_TIME: string;
  MAIL_USER: string;
  MAIL_PASSWORD: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_FROM: string;
  PORT: number;
  REDIS_HOST: string;
  REDIS_PORT: number;
}
