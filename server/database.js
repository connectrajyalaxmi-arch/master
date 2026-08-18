import mysql from "mysql2/promise";

const environmentBeforeFileLoad = process.env.APP_ENV || "local";

if (environmentBeforeFileLoad !== "production") {
  try {
    process.loadEnvFile(".env");
  } catch {
    // Local configuration is validated below when no .env file is present.
  }
}

export const appEnvironment = process.env.APP_ENV || "local";
const supportedEnvironments = ["local", "production"];

if (!supportedEnvironments.includes(appEnvironment)) {
  throw new Error(
    `Invalid APP_ENV "${appEnvironment}". Use "local" or "production".`,
  );
}

const requiredVariables = ["DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME"];
const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(
    `Missing required database environment variables: ${missingVariables.join(", ")}`,
  );
}

const database = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  supportBigNumbers: true,
});

export const verifyDatabaseConnection = async () => {
  await database.query("SELECT 1");
};

export default database;
