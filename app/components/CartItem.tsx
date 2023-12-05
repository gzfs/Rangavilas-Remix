import { calculateTotalPrice } from "~/routes/$category.product.$product_id";
import { MaterialSymbolsCancel } from "./CMS/ProductCard";
import { Form, useSubmit } from "@remix-run/react";

export default function CartItem({
  id,
  cart_id,
  gram_quantity,
  name,
  price,
  quantity,
  url,
}: {
  id: string;
  cart_id: string;
  quantity: number;
  gram_quantity: number;
  name: string;
  price: number;
  url: string;
}) {
  const deleteSubmit = useSubmit();
  return (
    <div className="grid grid-cols-10 md:grid-cols-12 place-items-center font-Montserrat text-sm text-[#333333]">
      <div className="rounded-3xl bg-[#333333] col-span-2 md:col-span-1 relative">
        <div
          className="w-[70px] h-[70px] bg-center bg-cover rounded-3xl"
          style={{
            backgroundImage: `url(${url})`,
          }}
        ></div>
        <Form
          action="/cart/product/delete"
          className="w-fit rounded-full absolute bottom-[-5px] right-[-5px] h-fit"
          method="POST"
          onSubmit={(eV) => {
            eV.preventDefault();
            deleteSubmit(
              JSON.stringify({
                cartID: cart_id,
                productID: id,
              }),
              {
                action: "/cart/product/delete",
                encType: "application/json",
                method: "POST",
              }
            );
          }}
        >
          <button className="bg-white w-fit rounded-full absolute bottom-[-5px] right-[-5px]">
            <MaterialSymbolsCancel className="text-red-500 text-2xl" />
          </button>
        </Form>
      </div>
      <p className="col-span-3 md:col-span-3">{name}</p>
      <p className="col-span-2">{gram_quantity}g</p>
      <p className="col-span-1 md:col-span-2">{quantity}</p>
      <p className="hidden md:block col-span-2">{price}/g</p>
      <p className="col-span-2">
        {calculateTotalPrice(price, "g", gram_quantity)! * quantity}₹
      </p>
    </div>
  );
}
