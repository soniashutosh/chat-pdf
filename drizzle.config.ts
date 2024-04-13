import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

// as .env is not accessible here so we are loading it with dotenv package.
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  schema: "./src/lib/db/schema.ts",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;

// npx drizzle-kit push:pg -> pushes the schema into the neon database.
