const z = require("zod");

const packageJSON = require("./package.json");
const path = require("path");
const APP_ENV = process.env.APP_ENV ?? "development";
const envPath = path.resolve(__dirname, `.env.${APP_ENV}`);

require("dotenv").config({
  path: envPath,
});

/**
 * static variabales shared in different environments
 */

const BUNDLE_ID = "com.atlastrip"; // ios bundle id
const PACKAGE = "com.atlastrip"; // android package name
const NAME = "AtlasTrip"; // app name

/**
 * zod schema for env variables validation
 */

const envSchema = z.object({
  APP_ENV: z.enum(["development", "staging", "production"]),
  NAME: z.string().min(1),
  BUNDLE_ID: z.string().min(1),
  PACKAGE: z.string().min(1),
  VERSION: z.string().min(1),
});

const _env = {
  APP_ENV,
  NAME: NAME,
  BUNDLE_ID,
  PACKAGE,
  VERSION: packageJSON.version,
};

const parsed = envSchema.safeParse(_env);

if (parsed.success === false) {
  console.error(
    "❌ Invalid environment variables:",
    parsed.error.flatten().fieldErrors,
    `\n❌ Missing variables in .env.${APP_ENV} file, Make sure all required variables are defined in the .env.${APP_ENV} file.`,
    `\n💡 Tip: If you recently updated the .env.${APP_ENV} file and the error still persists, try restarting the server with the -cc flag to clear the cache.`
  );
  throw new Error(
    "Invalid environment variables, Check terminal for more details "
  );
}

const Env = parsed.data;

module.exports = { Env };
