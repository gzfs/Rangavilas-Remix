import { Link, useFetcher } from "@remix-run/react";
import { type SVGProps } from "react";
import { type OutputElementType } from "../../utils/helper.server";

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

export function MaterialSymbolsCancel(
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
        d="m8.4 17l3.6-3.6l3.6 3.6l1.4-1.4l-3.6-3.6L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4l3.6 3.6L7 15.6L8.4 17Zm3.6 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
}

export default function ProductCard({
  productData,
}: {
  productData: OutputElementType;
}) {
  const productDeleteFetcher = useFetcher();
  return (
    <div className="sm:w-[300px] relative lg:w-full w-[calc(100vw-5rem)] h-full flex flex-col rounded-2xl gap-y-3 p-4 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <productDeleteFetcher.Form
        method="POST"
        action="/admin/product/delete"
        className="absolute right-[-8px] top-[-8px]"
        onSubmit={(eV) => {
          eV.preventDefault();
          productDeleteFetcher.submit(
            JSON.stringify({ productID: productData.id }),
            {
              action: "/admin/product/delete",
              method: "POST",
              encType: "application/json",
            }
          );
        }}
      >
        <button>
          <MaterialSymbolsCancel className="text-3xl text-red-600" />
        </button>
      </productDeleteFetcher.Form>
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
          className="w-full bg-cover bg-center h-[200px] cursor-pointer rounded-xl overflow-hidden"
        ></div>
      </Link>
      <div className="flex flex-col items-start font-Outfit text-[#333333] flex-grow justify-between">
        <div className="flex items-center w-fit mb-2">
          {productData.keyword.map((kw) => {
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
        <p className="text-5xl ml-[-3px] font-bold">
          {productData.name}
        </p>
        <p className="text-sm font-Montserrat font-semibold mt-2">
          {productData.category_name}
        </p>
      </div>
    </div>
  );
}
