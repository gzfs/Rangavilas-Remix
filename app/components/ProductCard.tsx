import { Link } from "@remix-run/react";
import { type SVGProps, useState } from "react";
import {} from "~/database/types";
import { type OutputElementType } from "~/routes/_index";

export function MaterialSymbolsStarRounded(
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
        d="m12 18.275l-4.15 2.5q-.275.175-.575.15t-.525-.2q-.225-.175-.35-.438t-.05-.587l1.1-4.725L3.775 11.8q-.25-.225-.312-.513t.037-.562q.1-.275.3-.45t.55-.225l4.85-.425l1.875-4.45q.125-.3.388-.45t.537-.15q.275 0 .537.15t.388.45l1.875 4.45l4.85.425q.35.05.55.225t.3.45q.1.275.038.563t-.313.512l-3.675 3.175l1.1 4.725q.075.325-.05.588t-.35.437q-.225.175-.525.2t-.575-.15l-4.15-2.5Z"
      ></path>
    </svg>
  );
}

export function IcOutlineAddShoppingCart(
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
        d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2s-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2s2-.9 2-2s-.9-2-2-2zm-8.9-5h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4l-3.87 7H8.53L4.27 2H1v2h2l3.6 7.59l-1.35 2.44C4.52 15.37 5.48 17 7 17h12v-2H7l1.1-2z"
      ></path>
    </svg>
  );
}

export default function ProductCard({
  productData,
}: {
  productData: OutputElementType;
}) {
  const [quantitySpecVisible, setQuantitySpecVisible] =
    useState(false);
  const [quantityVisible, setQuantityVisible] = useState(false);
  const [selectedQuantity, setselectedQuantity] = useState<
    string | number
  >("Quantity");
  const [selectedQuantitySpec, setselectedQuantitySpec] =
    useState("g");
  return (
    <div className="sm:w-[300px] lg:w-full w-[calc(100vw-5rem)] grid grid-rows-3 place-self-center rounded-2xl border gap-y-3 border-[#333333] overflow-hidden">
      <Link
        to={`/${productData.category_name?.toLowerCase()}/product/${
          productData.id
        }`}
        className="h-[200px] row-span-5"
      >
        <div
          style={{
            backgroundImage: `url(${productData.url[0]})`,
          }}
          className="w-full bg-cover bg-center h-[200px] cursor-pointer"
        ></div>
      </Link>

      <div className="flex flex-col items-start row-span-1 font-Outfit px-5  text-[#333333]">
        <p className="text-sm font-Montserrat font-semibold">
          {productData.category_name}
        </p>
        <p className="text-4xl font-bold">{productData.name}</p>
        <p className="flex justify-center items-center text-xl pt-2">
          {[1, 2, 3, 4, 5].map((numVal) => (
            <MaterialSymbolsStarRounded key={numVal} />
          ))}
          <span className="text-base mt-[2px] ml-2">
            {productData.rating}
          </span>
        </p>
      </div>
      <div className="font-Outfit px-5 font-light text-sm pb-3 grid grid-cols-4">
        <div className="relative flex flex-col col-span-2 ">
          <div
            className="w-full py-2.5 cursor-pointer active:bg-[#F4ECEC] border border-[#333333]  rounded-xl text-center"
            onClick={() => {
              setQuantityVisible(!quantityVisible);
              setQuantitySpecVisible(false);
            }}
          >
            {selectedQuantity}
          </div>
          <div
            className="absolute border border-[#333333] bg-white w-full rounded-xl top-[120%] fade-in"
            style={{
              display: quantityVisible ? "block" : "none",
            }}
          >
            {[100, 200].map((desiredQuant) => {
              return (
                <div
                  className="px-6 py-2.5 cursor-pointer active:bg-[#F4ECEC]  w-full text-center rounded-xl"
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
          </div>
        </div>
        <div className="relative flex flex-col col-span-1">
          <div
            className="px-6 h-full py-2 ml-2 cursor-pointer active:bg-[#F4ECEC] border border-[#333333] w-fit rounded-xl"
            onClick={() => {
              setQuantitySpecVisible(!quantitySpecVisible);
              setQuantityVisible(false);
            }}
          >
            {selectedQuantitySpec}
          </div>
          <div
            className="absolute border border-[#333333] bg-white rounded-xl top-[120%] ml-2 fade-in"
            style={{
              display: quantitySpecVisible ? "block" : "none",
            }}
          >
            {["g", "kg"].map((desiredQuant) => {
              return (
                <div
                  className="px-7 py-2.5 cursor-pointer active:bg-[#F4ECEC] text-center rounded-xl"
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
      <hr className="border-[#333333]" />
      <div className="flex justify-between items-center font-Outfit pb-5 py-3 px-5">
        <p className="text-2xl font-bold font-Montserrat text-[#333333]">
          {" "}
          ₹{productData.price}
        </p>
        <button
          className="text-center py-3 px-7 rounded-xl text-sm bg-[#F16F6F] text-white w-fit flex justify-between items-center"
          onClick={async () => {}}
        >
          <IcOutlineAddShoppingCart className="text-xl mr-3" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
}
