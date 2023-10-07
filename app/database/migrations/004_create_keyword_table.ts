import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<any> {
  await db.schema
    .createTable("keywordproduct")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("keyword_id", "text", (c) => c.notNull())
    .addColumn("product_id", "text", (c) => c.notNull())
    .execute();

  await db.schema
    .createIndex("keywordproduct_productID_index")
    .on("keywordproduct")
    .column("product_id")
    .execute();

  await db.schema
    .createIndex("keywordproduct_keywordID_index")
    .on("keywordproduct")
    .column("keyword_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
