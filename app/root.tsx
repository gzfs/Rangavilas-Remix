import { cssBundleHref } from "@remix-run/css-bundle";
import {
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import stylesheet from "~/tailwind.css";
import { remixAuthenticator } from "./services/auth.server";
import Navbar from "./components/Navbar";
import { type User } from "./database/types";
import Footer from "./components/Footer";
import { tursoDB } from "./services/db.server";
import { useCartStore } from "./store/cartStore";

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    loaderArgs.request
  )) as User;

  let existingCart = 0;
  let existingCartID:
    | {
        cart_id: string;
        order_id: string | undefined;
      }
    | undefined = undefined;

  if (userSession) {
    const userID = await tursoDB
      .selectFrom("User")
      .where("User.email", "=", userSession.email)
      .select("id")
      .executeTakeFirst();

    existingCartID = (
      await tursoDB
        .selectFrom("OrderCart")
        .innerJoin("Cart", "Cart.cart_id", "OrderCart.cart_id")
        .innerJoin("User", "Cart.user_id", "User.id")
        .where("User.id", "==", userID!.id)
        .select(["Cart.cart_id", "OrderCart.order_id"])
        .execute()
    ).filter((existingCartVal) => existingCartVal.order_id === null)[0];

    if (existingCartID) {
      existingCart = (
        await tursoDB
          .selectFrom("Cart")
          .where("Cart.cart_id", "==", existingCartID.cart_id)
          .selectAll()
          .execute()
      ).length;
    }
  }

  return json({
    userSession,
    cartID: existingCartID?.cart_id,
    existingCart,
  });
}

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: stylesheet },
];

export default function App() {
  const loaderData = useLoaderData<typeof loader>();
  const setCardID = useCartStore((state) => state.setCartID);
  if (loaderData.cartID) setCardID(loaderData.cartID);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Navbar
          cartCount={loaderData.existingCart}
          userSession={loaderData.userSession}
        />
        <Outlet />
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
