import { Kysely } from "kysely";
import { type Database } from "~/database/types";

import { LibsqlDialect } from "@libsql/kysely-libsql";

export const tursoDB = new Kysely<Database>({
  dialect: new LibsqlDialect({
    url: "libsql://simple-triton-gzfs.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEwLTAxVDA5OjQ1OjIzLjMzMjk2MzI2MloiLCJpZCI6ImVkM2U4NWE4LTYwM2UtMTFlZS05OTAzLWJhZmU2NjdjODUwOCJ9.xfCnH8MBcO-KXuiXil6f795nC1Qj09kHy-0OrnncPSTEz-8T2xlceBcD2LkCcl2zCFoL2s2eaTrpbQ5NGm7-Bg",
  }),
});
