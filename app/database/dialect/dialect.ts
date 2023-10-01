import { PostgresDialect } from "kysely";
import { CockroachAdapter } from "./adapter";

export class CockroachDialect extends PostgresDialect {
  createAdapter(): CockroachAdapter {
    return new CockroachAdapter();
  }
}
