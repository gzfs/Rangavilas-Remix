import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<any> {
  await db.schema
    .createTable("category")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("name", "text", (c) => c.notNull())
    .addColumn("description", "text", (c) => c.notNull())
    .execute();

  await db.schema
    .createTable("image")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("url", "text", (c) => c.notNull())
    .addColumn("product_id", "text")
    .addColumn("category_id", "text")
    .execute();

  await db.schema
    .createTable("product")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("rating", "decimal", (c) => c.defaultTo(0))
    .addColumn("name", "text", (c) => c.notNull())
    .addColumn("description", "text", (c) => c.notNull())
    .addColumn("price", "decimal", (c) => c.notNull())
    .addColumn("is_featured", "boolean")
    .addColumn("category_id", "text", (c) => c.notNull())
    .execute();

  await db.schema
    .createIndex("product_categoryID_index")
    .on("product")
    .column("category_id")
    .execute();

  await db.schema
    .createIndex("image_categoryID_index")
    .on("image")
    .column("category_id")
    .execute();

  await db.schema
    .createIndex("image_productID_index")
    .on("image")
    .column("product_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
