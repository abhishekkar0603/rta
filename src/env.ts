import { config } from "dotenv";

const appConfig = process.env.NODE_ENV !== "production" ? config : null;

if (appConfig) appConfig();

export const PORT = process.env.PORT || 5000;
