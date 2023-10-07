import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();

  await tursoDB
    .deleteFrom("Product")
    .where("Product.id", "=", formData.productID)
    .execute();
  await tursoDB
    .deleteFrom("KeywordProduct")
    .where("KeywordProduct.product_id", "=", formData.productID)
    .execute();
  await tursoDB
    .deleteFrom("Image")
    .where("Image.product_id", "=", formData.productID)
    .execute();

  return redirect("/admin/products", {
    status: 302,
  });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  if (!userSession.is_admin)
    return redirect("/", {
      status: 302,
    });

  return json({});
}
