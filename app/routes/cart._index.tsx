import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import CartItem from "~/components/CartItem";
import Checkout from "~/components/Checkout";
import Heading from "~/components/Heading";
import { User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    loaderArgs.request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const userAddresses = await tursoDB
    .selectFrom("Address")
    .where("Address.user_id", "=", userSession.id)
    .selectAll()
    .execute();

  const cartID = new URL(loaderArgs.request.url).searchParams.get("id");
  let cartItems:
    | {
        id: string;
        quantity: number;
        gram_quantity: number;
        name: string;
        price: number;
        url: string;
      }[]
    | undefined;
  if (cartID) {
    cartItems = await tursoDB
      .selectFrom("Cart")
      .innerJoin("Product", "Product.id", "Cart.product_id")
      .innerJoin("Image", "Product.id", "Image.product_id")
      .where("Cart.cart_id", "=", cartID)
      .select([
        "Product.id",
        "Cart.gram_quantity",
        "Product.name",
        "Product.price",
        "Product.name",
        "Cart.quantity",
        "Image.url",
      ])
      .execute();
  }
  return json({
    cartID,
    cartItems,
    userAddresses,
  });
}

export default function Cart() {
  const loaderData = useLoaderData<typeof loader>();
  return (
    <>
      <main className="max-w-[1000px] mx-auto px-2 sm:px-0">
        <Heading
          sectionDesc="Indulge Your Cravings: A Symphony of Sweets and Savories Awaits"
          sectionTitle="Cart"
        />
        <div className="grid sm:grid-cols-3 gap-y-4">
          <div className="grid gap-y-4 col-span-2 place-self-start px-2">
            {loaderData.cartItems && loaderData.cartID
              ? mergeUrlsByProductName(loaderData.cartItems).map((cartItem) => {
                  return (
                    <CartItem
                      cart_id={loaderData.cartID as string}
                      id={cartItem.id}
                      gram_quantity={cartItem.gram_quantity}
                      name={cartItem.name}
                      price={cartItem.price}
                      quantity={cartItem.quantity}
                      url={cartItem.url[0]}
                      key={cartItem.id}
                    />
                  );
                })
              : ""}
          </div>
          <Checkout
            userAddresses={JSON.parse(JSON.stringify(loaderData.userAddresses))}
          />
        </div>
      </main>
    </>
  );
}

function mergeUrlsByProductName(
  elements: {
    quantity: number;
    gram_quantity: number;
    name: string;
    price: number;
    url: string;
    id: string;
  }[]
) {
  const mergedElements = elements.reduce(
    (
      acc: {
        quantity: number;
        gram_quantity: number;
        name: string;
        price: number;
        url: [string];
        id: string;
      }[],
      current
    ) => {
      const existingElement = acc.find((item) => item.name === current.name);

      if (existingElement) {
        existingElement.url.push(current.url);
      } else {
        acc.push({
          id: current.id,
          gram_quantity: current.gram_quantity,
          name: current.name,
          price: current.price,
          quantity: current.quantity,
          url: [current.url],
        });
      }

      return acc;
    },
    []
  );

  return mergedElements;
}
