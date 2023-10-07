import {
  type LoaderFunctionArgs,
  redirect,
  json,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Heading from "~/components/Heading";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";
import { mergeUrls } from "../utils/helper.server";
import ProductCard from "~/components/CMS/ProductCard";
import { type SVGProps } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const availableProducts = await tursoDB
    .selectFrom("Product")
    .rightJoin("Category", "Category.id", "Product.category_id")
    .rightJoin(
      "KeywordProduct",
      "KeywordProduct.product_id",
      "Product.id"
    )
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
      "Image.url",
      "Keyword.keyword",
    ])
    .execute();

  if (!userSession.is_admin)
    return redirect("/", {
      status: 302,
    });

  return json({
    availableProducts: mergeUrls(availableProducts),
  });
}

export function MaterialSymbolsAddCircle(
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
        d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4v4Zm1 5q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
}

export default function AdminProductPage() {
  const { availableProducts } = useLoaderData<typeof loader>();
  return (
    <section className="mx-auto px-10 text-[#333333] max-w-[1500px]">
      <Heading
        sectionTitle="Products"
        sectionDesc="Add Product with Ease. Simplified inventory management."
      />
      <Link to="/admin/product/new">
        <div className="px-5 flex items-center py-3 mb-5 text-[#333333] font-medium font-Montserrat shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-full bg-white w-fit">
          <MaterialSymbolsAddCircle className="text-2xl" />
          <p className="ml-2 text-sm">New Product</p>
        </div>
      </Link>
      <div className="grid sm:grid-cols-4 gap-4">
        {availableProducts.map((availableProduct) => {
          return (
            <ProductCard
              productData={availableProduct}
              key={availableProduct.id}
            />
          );
        })}
      </div>
    </section>
  );
}
