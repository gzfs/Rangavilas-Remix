import { json, type ActionFunctionArgs } from "@remix-run/node";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();

  if (formData.categoryId) {
    await tursoDB
      .deleteFrom("Category")
      .where("Category.id", "=", formData.categoryId)
      .execute();

    const deleteProducts = await tursoDB
      .selectFrom("Product")
      .where("Product.category_id", "=", formData.categoryId)
      .selectAll()
      .execute();

    deleteProducts.forEach(async (deleteProduct) => {
      await tursoDB
        .deleteFrom("Product")
        .where("Product.category_id", "=", formData.categoryId)
        .execute();

      await tursoDB
        .deleteFrom("Image")
        .where("Image.product_id", "=", deleteProduct.id)
        .execute();

      await tursoDB
        .deleteFrom("KeywordProduct")
        .where("KeywordProduct.product_id", "=", deleteProduct.id)
        .execute();
    });

    await tursoDB
      .deleteFrom("Image")
      .where("Image.category_id", "=", formData.categoryId)
      .execute();
  }

  return json({});
}
