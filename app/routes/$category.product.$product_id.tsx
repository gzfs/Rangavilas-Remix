import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { tursoDB } from "~/services/db.server";
import { mergeUrls } from "./_index";
import Slider from "~/components/Slider";
import { type SVGProps, useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const pageProduct = await tursoDB
    .selectFrom("Product")
    .where("Product.id", "=", params.product_id as string)
    .rightJoin("Category", "Category.id", "Product.category_id")
    .rightJoin("Image", "Image.product_id", "Product.id")
    .select([
      "Category.name as category_name",
      "Product.id",
      "Product.description",
      "Image.url",
      "Product.name",
      "Product.is_featured",
      "Product.price",
      "Product.rating",
    ])
    .execute();

  return json({
    pageProduct: mergeUrls(pageProduct)[0],
  });
}

export function IcBaselineShoppingCart(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zM1 2v2h2l3.6 7.59l-1.35 2.45c-.16.28-.25.61-.25.96c0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12l.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2z"
      ></path>
    </svg>
  );
}

export function MdiCheck(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M21 7L9 19l-5.5-5.5l1.41-1.41L9 16.17L19.59 5.59L21 7Z"
      ></path>
    </svg>
  );
}

export function IcBaselineFavoriteBorder(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1l-.1-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05z"
      ></path>
    </svg>
  );
}

export default function Product() {
  const loaderData = useLoaderData<typeof loader>();
  const pageProduct = loaderData.pageProduct;
  const [quantitySpecVisible, setQuantitySpecVisible] =
    useState(false);
  const [quantityVisible, setQuantityVisible] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState<
    string | number
  >("Quantity");
  const [selectedQuantitySpec, setselectedQuantitySpec] =
    useState("g");
  const [customQuantity, setCustomQuantity] = useState("");

  return (
    <>
      <section className="px-10 pt-10 grid md:grid-cols-2 grid-cols-1 gap-x-10 text-[#333333]">
        <div className="grid gap-y-4 sm:gap-y-0">
          <Slider sliderImages={pageProduct.url} isRounded={true} />
          <div className="grid grid-cols-3 place-self-center sm:gap-x-2 gap-x-4">
            {pageProduct.url.map((productImage) => {
              return (
                <img
                  key={productImage}
                  src={productImage}
                  alt="Product"
                  width={120}
                  height={120}
                  className="rounded-xl col-span-1 border transition-all"
                />
              );
            })}
          </div>
        </div>
        <div className="font-Outfit sm:p-5 sm:py-0 py-10">
          <p>{pageProduct.category_name}</p>
          <p className="text-6xl font-bold">{pageProduct.name}</p>
          <p className="py-8">{pageProduct.description}</p>
          <div className="pb-5">
            <p className="font-Montserrat">MRP</p>
            <div className="flex justify-start items-center">
              <p className="text-5xl font-bold">
                ₹{pageProduct.price}
              </p>
              <p className="text-lg font-light ml-1">per kg</p>
            </div>
          </div>
          <div className="font-Outfit font-light text-sm grid grid-cols-6 sm:w-8/12 gap-3">
            <div className="relative flex flex-col col-span-4">
              <div
                className="w-full py-3 cursor-pointer active:bg-[#F4ECEC] border border-[#333333]  rounded-xl text-center"
                onClick={() => {
                  setQuantityVisible(!quantityVisible);
                  setQuantitySpecVisible(false);
                }}
              >
                {selectedQuantity}
              </div>
              <div
                className="absolute border border-[#333333] bg-white w-full rounded-xl top-[120%] fadeIn"
                style={{
                  display: quantityVisible ? "block" : "none",
                }}
              >
                {[100, 200].map((desiredQuant) => {
                  return (
                    <div
                      className="px-6 py-3 cursor-pointer active:bg-[#F4ECEC]  w-full text-center rounded-xl"
                      key={desiredQuant}
                      onClick={() => {
                        setselectedQuantity(desiredQuant);
                        setQuantityVisible(false);
                      }}
                    >
                      {desiredQuant}
                    </div>
                  );
                })}
                <div className="grid grid-cols-3 m-2 gap-2">
                  <input
                    type="text"
                    placeholder="Custom"
                    className="outline-none border border-[#333333] rounded-xl px-3 py-3 col-span-2"
                    onChange={(eV) => {
                      setCustomQuantity(eV.target.value);
                      eV.target.value = "";
                    }}
                  />
                  <button
                    className="bg-[#333333] rounded-xl flex justify-center items-center px-3 col-span-1"
                    onClick={() => {
                      setselectedQuantity(parseInt(customQuantity));
                      setQuantityVisible(false);
                    }}
                  >
                    <MdiCheck className="text-white text-3xl" />
                  </button>
                </div>
              </div>
            </div>
            <div className="relative flex flex-col col-span-2">
              <div
                className="px-6 h-full py-2.5 text-center cursor-pointer active:bg-[#F4ECEC] border border-black w-full rounded-xl"
                onClick={() => {
                  setQuantitySpecVisible(!quantitySpecVisible);
                  setQuantityVisible(false);
                }}
              >
                {selectedQuantitySpec}
              </div>
              <div
                className="absolute border border-black bg-white rounded-xl top-[120%] fadeIn w-full"
                style={{
                  display: quantitySpecVisible ? "block" : "none",
                }}
              >
                {["g", "kg"].map((desiredQuant) => {
                  return (
                    <div
                      className="px-7 py-3 cursor-pointer active:bg-[#F4ECEC] text-center rounded-xl"
                      key={desiredQuant}
                      onClick={() => {
                        setselectedQuantitySpec(desiredQuant);
                        setQuantitySpecVisible(false);
                      }}
                    >
                      {desiredQuant}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="py-3 text-sm flex items-center justify-start">
            <div className="w-[5px] h-[5px] rounded-full bg-red-700"></div>
            <p className="ml-2">Extra delivery fee will be added</p>
          </div>
          <div className="grid grid-cols-6 gap-x-2">
            <button className="text-center py-3 sm:col-span-3 col-span-5 w-full rounded-xl bg-[#3b4fc2] hover:bg-white hover:text-[#3b4fc2] border border-white hover:border-[#3b4fc2] transition-colors text-white flex justify-center items-center mt-8">
              <IcBaselineShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button className="text-center py-3 col-span-1 w-full rounded-xl hover:bg-[#F16F6F] bg-white text-[#F16F6F] border hover:border-white border-[#F16F6F] transition-colors hover:text-white flex justify-center items-center mt-8">
              <IcBaselineFavoriteBorder />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
