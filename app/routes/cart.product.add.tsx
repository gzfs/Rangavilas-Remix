import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { v4 as uuid } from "uuid";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();
  const userSession: User = (await remixAuthenticator.isAuthenticated(request, {
    failureRedirect: "/",
  })) as User;

  const userID = await tursoDB
    .selectFrom("User")
    .where("User.email", "=", userSession.email)
    .select("User.id")
    .executeTakeFirst();

  let existingCart = (
    await tursoDB
      .selectFrom("OrderCart")
      .innerJoin("Cart", "Cart.cart_id", "OrderCart.cart_id")
      .where("Cart.user_id", "=", userID!.id)
      .select(["Cart.cart_id", "OrderCart.order_id"])
      .execute()
  ).filter((existingCartVal) => existingCartVal.order_id === null)[0];

  if (existingCart) {
    await tursoDB
      .insertInto("Cart")
      .values({
        gram_quantity: formData.gramQuantity,
        cart_id: existingCart.cart_id,
        product_id: formData.productID,
        quantity: formData.productQuantity,
        user_id: userID!.id,
      })
      .executeTakeFirst();
  } else {
    const cartID = uuid();
    await tursoDB
      .insertInto("Cart")
      .values({
        gram_quantity: formData.gramQuantity,
        cart_id: cartID,
        product_id: formData.productID,
        quantity: formData.productQuantity,
        user_id: userID!.id,
      })
      .executeTakeFirst();

    await tursoDB
      .insertInto("OrderCart")
      .values({
        id: uuid(),
        cart_id: cartID,
      })
      .executeTakeFirst();
  }

  return redirect(`/${formData.categoryName}/product/${formData.productID}`, {
    status: 302,
  });
}
