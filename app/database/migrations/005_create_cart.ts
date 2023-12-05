import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<any> {
  await db.schema
    .createTable("cart")
    .addColumn("cart_id", "text", (c) => c.notNull())
    .addColumn("user_id", "text", (c) => c.notNull())
    .addColumn("product_id", "text", (c) => c.notNull())
    .addColumn("quantity", "decimal", (c) => c.notNull())
    .addColumn("gram_quantity", "decimal", (c) => c.notNull())
    .addPrimaryKeyConstraint("id", ["cart_id", "product_id"])
    .execute();

  await db.schema
    .createIndex("cart_productID_index")
    .on("cart")
    .column("product_id")
    .execute();

  await db.schema
    .createIndex("cart_userID_index")
    .on("cart")
    .column("user_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
