import { Kysely } from "kysely";
import { type Database } from "~/database/types";
import { Pool } from "pg";
import { CockroachDialect } from "~/database/dialect/dialect";

export const cockroachDB = new Kysely<Database>({
  dialect: new CockroachDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});
