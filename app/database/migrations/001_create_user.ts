import { type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("user")
    .addColumn("id", "text", (c) => c.primaryKey())
    .addColumn("first_name", "text", (c) => c.notNull())
    .addColumn("last_name", "text")
    .addColumn("phone", "text")
    .addColumn("default_address_id", "text")
    .addColumn("email", "text", (c) => c.unique())
    .addColumn("is_admin", "boolean", (c) => c.notNull())
    .addColumn("image", "text")
    .execute();

  await db.schema
    .createTable("address")
    .addColumn("id", "uuid", (c) => c.primaryKey())
    .addColumn("user_id", "uuid", (c) =>
      c.references("user.id").onDelete("cascade").notNull()
    )
    .addColumn("house_number", "text", (c) => c.notNull())
    .addColumn("city", "text", (c) => c.notNull())
    .addColumn("county", "text", (c) => c.notNull())
    .addColumn("pincode", "text", (c) => c.notNull())
    .addColumn("landmark", "text")
    .addColumn("street_name", "text", (c) => c.notNull())
    .execute();

  await db.schema
    .createIndex("Address_userId_index")
    .on("address")
    .column("user_id")
    .execute();
}
export async function down(db: Kysely<any>): Promise<void> {}
