import {
  json,
  redirect,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { tursoDB } from "~/services/db.server";
import { mergeUrls } from "../utils/helper.server";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const pageProduct = await tursoDB
    .selectFrom("Product")
    .rightJoin("Category", "Category.id", "Product.category_id")
    .rightJoin("Keyword", "Keyword.product_id", "Product.id")
    .rightJoin("Image", "Image.product_id", "Product.id")
    .select([
      "Product.id",
      "Product.name",
      "Product.is_featured",
      "Product.description",
      "Product.price",
      "Product.rating",
      "Category.name as category_name",
      "Image.url",
      "Keyword.keyword",
    ])
    .execute();

  if (!userSession.is_admin)
    return redirect("/", {
      status: 302,
    });

  const mergedProducts = mergeUrls(pageProduct);

  return json({
    pageProduct: mergedProducts,
  });
}

export default function AdminPageProduct() {
  return <section>Admin Page Product</section>;
}
