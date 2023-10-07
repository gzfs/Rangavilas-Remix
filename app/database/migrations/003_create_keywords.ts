import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<any> {
  await db.schema
    .createTable("keyword")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("keyword", "text", (c) => c.notNull())
    .addColumn("product_id", "text")
    .execute();

  await db.schema
    .createIndex("keyword_productID_index")
    .on("keyword")
    .column("product_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
