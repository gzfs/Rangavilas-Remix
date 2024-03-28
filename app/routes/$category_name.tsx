import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Products from "~/components/Products";
import { tursoDB } from "~/services/db.server";
import { mergeUrls } from "~/utils/helper.server";

export async function loader({ params }: LoaderFunctionArgs){
    const initalProducts = await tursoDB
    .selectFrom("Product")
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
    .where("Category.name", "==", capitalizeFirstLetter(params.category_name as string))
    .execute();

    return json({
        initialProducts: mergeUrls(initalProducts),
        categoryName: capitalizeFirstLetter(params.category_name as string)
    })
}

export default function Category(){

    const loaderData = useLoaderData<typeof loader>();

    return <main className="mx-auto max-w-[1000px] px-10">
        <Products hydrateProducts={loaderData.initialProducts} sectionName={loaderData.categoryName as string} sectionDesc={loaderData.initialProducts[0].category_description as string} />
    </main>
}

function capitalizeFirstLetter(argString: string): string {
    return argString.charAt(0).toUpperCase() + argString.slice(1);
}