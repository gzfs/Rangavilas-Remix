import { FileMigrationProvider, Migrator } from "kysely";
import { promises as fs } from "fs";
import { cockroachDB } from "~/services/db.server";
import path from "path";

async function migrateToLatest() {
  const dbMigrator: Migrator = new Migrator({
    db: cockroachDB,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, "/migrations"),
    }),
  });

  const { error, results } = await dbMigrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(
        `migration "${it.migrationName}" was executed successfully`
      );
    } else if (it.status === "Error") {
      console.error(
        `failed to execute migration "${it.migrationName}"`
      );
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await cockroachDB.destroy();
}

migrateToLatest();
