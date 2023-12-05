import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<any> {
  await db.schema
    .createTable("ordercart")
    .addColumn("id", "text", (c) => c.notNull().primaryKey())
    .addColumn("order_id", "text")
    .addColumn("cart_id", "text", (c) => c.notNull())
    .execute();

  await db.schema
    .createIndex("ordercart_cartID_index")
    .on("ordercart")
    .column("cart_id")
    .execute();

  await db.schema
    .createIndex("ordercart_orderID_index")
    .on("ordercart")
    .column("order_id")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {}
