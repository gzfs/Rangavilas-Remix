import {
  type Kysely,
  type MigrationLockOptions,
  PostgresAdapter,
} from "kysely";

export class CockroachAdapter extends PostgresAdapter {
  async acquireMigrationLock(
    db: Kysely<any>,
    _opt: MigrationLockOptions
  ): Promise<void> {
    await db
      .selectFrom(_opt.lockTable)
      .selectAll()
      .forUpdate()
      .execute();
  }
}
