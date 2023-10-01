import { Kysely } from "kysely";
import { type Database } from "~/database/types";

import { LibsqlDialect } from "@libsql/kysely-libsql";

export const tursoDB = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_URL,
    authToken: process.env.AUTH_TOKEN,
  }),
});
