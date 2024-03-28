import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { tursoDB } from "~/services/db.server";
import { mergeUrls } from "../utils/helper.server";
import Slider from "~/components/Slider";
import { type SVGProps, useState } from "react";

export async function loader({ params }: LoaderFunctionArgs) {
  const pageProduct = await tursoDB
    .selectFrom("Product")
    .where("Product.id", "=", params.product_id as string)
    .rightJoin("Category", "Category.id", "Product.category_id")
    .rightJoin("KeywordProduct", "KeywordProduct.product_id", "Product.id")
    .rightJoin("Keyword", "Keyword.id", "KeywordProduct.keyword_id")
    .rightJoin("Image", "Image.product_id", "Product.id")
    .select([
      "Product.id",
      "Product.name",
      "Product.is_featured",
      "Product.description",
      "Product.price",
      "Product.rating",
      "Category.name as category_name",
      "Category.description as category_description",
      "Image.url",
      "Keyword.keyword",
    ])
    .execute();

  return json({
    pageProduct: mergeUrls(pageProduct)[0],
  });
}

export function IcBaselineShoppingCart(props: SVGProps<SVGSVGElement>) {
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

export default function Product() {
  const loaderData = useLoaderData<typeof loader>();
  const pageProduct = loaderData.pageProduct;
  const [quantitySpecVisible, setQuantitySpecVisible] = useState(false);
  const [quantityVisible, setQuantityVisible] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState<string | number>(
    "Single Product Quantity"
  );
  const [selectedQuantitySpec, setselectedQuantitySpec] = useState("g");
  const [customQuantity, setCustomQuantity] = useState("");
  const [groupQuant, setGroupQuant] = useState(1);
  const addProductFetcher = useFetcher();

  return (
    <>
      <section className="px-10 pt-10 grid md:grid-cols-2 grid-cols-1 gap-x-10 text-[#333333] max-w-[1500px] mx-auto">
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
        <div className="font-Outfit sm:p-5 sm:py-0 py-10 grid place-content-between w-full">
          <p>{pageProduct.category_name}</p>
          <p className="text-6xl font-bold ml-[-3px]">{pageProduct.name}</p>
          <div className="flex items-center w-fit mt-2">
            {pageProduct.keyword.map((kw) => {
              return (
                <div
                  className="flex items-center w-fit border px-2 py-1 border-red-700 rounded-lg mr-2 text-xs"
                  key={kw}
                >
                  <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
                  <p className="ml-2">
                    {kw.split("_")[0].slice(0, 1).toUpperCase() +
                      kw.split("_")[0].slice(1)}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="py-4">{pageProduct.description}</p>
          <div className="pb-5">
            <p className="font-Montserrat">MRP</p>
            <div className="flex justify-start items-center">
              <p className="text-5xl font-bold">₹{pageProduct.price}</p>
              <p className="text-lg font-light ml-1">per kg</p>
            </div>
          </div>
          <div className="font-Outfit font-light text-sm grid grid-cols-8 gap-3">
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
            <input
              className="col-span-2 border border-[#333333] rounded-xl outline-none px-5"
              defaultValue={groupQuant}
              min={1}
              onChange={(eV) => {
                setGroupQuant(parseInt(eV.target.value));
              }}
              type="number"
              placeholder="Quantity"
            />
          </div>
          <div className="py-3 text-sm flex items-center justify-start">
            <div className="w-[5px] h-[5px] rounded-full bg-red-700"></div>
            <p className="ml-2">Extra delivery fee will be added</p>
          </div>
          <div className="grid grid-cols-7 gap-x-2 h-fit place-items-center">
            <div className="col-span-2 grid place-items-start w-full">
              <p className="text-sm">TOTAL PRICE</p>
              <p className="text-4xl font-bold">
                ₹
                {calculateTotalPrice(
                  pageProduct.price as number,
                  selectedQuantitySpec,
                  selectedQuantity
                )! * groupQuant}
              </p>
            </div>
            <addProductFetcher.Form
              action="/cart/product/add"
              className="w-full col-span-5"
              method="POST"
              onSubmit={(eV) => {
                eV.preventDefault();
                if (pageProduct && typeof selectedQuantity == "number")
                  addProductFetcher.submit(
                    JSON.stringify({
                      productID: pageProduct.id,
                      productQuantity: groupQuant,
                      gramQuantity: selectedQuantity,
                      categoryName: pageProduct.category_name,
                    }),
                    {
                      action: "/cart/product/add",
                      encType: "application/json",
                      method: "POST",
                      preventScrollReset: true,
                    }
                  );
              }}
            >
              <button className="text-center w-full h-fit py-3.5 rounded-full bg-[#3b4fc2] hover:bg-white hover:text-[#3b4fc2] border border-white hover:border-[#3b4fc2] transition-colors text-white flex justify-center items-center">
                <IcBaselineShoppingCart />
                <span>Add to Cart</span>
              </button>
            </addProductFetcher.Form>
          </div>
        </div>
      </section>
    </>
  );
}

export function calculateTotalPrice(
  baseValue: number,
  quantitySpec: string,
  desiredQuantity: number | string
) {
  switch (quantitySpec) {
    case "g":
      const pricePerGram = baseValue / 1000;
      return typeof desiredQuantity === "number"
        ? desiredQuantity * pricePerGram
        : 100 * pricePerGram;
    case "kg":
      return typeof desiredQuantity === "number"
        ? desiredQuantity * baseValue
        : 1 * baseValue;
  }
}
