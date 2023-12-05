import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();
  const userSession: User = (await remixAuthenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as User;

  if (formData.productID && formData.cartID && userSession) {
    await tursoDB
      .deleteFrom("Cart")
      .where("Cart.cart_id", "=", formData.cartID)
      .where("Cart.product_id", "=", formData.productID)
      .execute();

    try {
      const cartProducts = await tursoDB
        .selectFrom("Cart")
        .where("Cart.cart_id", "=", formData.cartID)
        .execute();
    } catch (e) {
      await tursoDB
        .deleteFrom("OrderCart")
        .where("OrderCart.cart_id", "=", formData.cartID)
        .execute();
    }
  }

  return redirect(`/cart?id=${formData.cartID}`, {
    status: 302,
  });
}
