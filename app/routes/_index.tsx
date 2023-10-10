import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Categories from "~/components/Categories";
import Products from "~/components/Products";
import Slider from "~/components/Slider";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";
import {
  type OutputElementType,
  mergeUrls,
} from "~/utils/helper.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Rangavilas" },
    { name: "description", content: "Sweets and Savories Shop" },
  ];
};

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    loaderArgs.request
  )) as User;

  const sliderImages = (
    await tursoDB
      .selectFrom("Image")
      .select(["Image.url", "Image.category_id", "Image.product_id"])
      .execute()
  )
    .filter((sliderImage) => {
      return (
        sliderImage.category_id === null &&
        sliderImage.product_id === null
      );
    })
    .map((sliderImage) => {
      return sliderImage.url;
    });

  const initalProducts = await tursoDB
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

  const productCategories = await tursoDB
    .selectFrom("Category")
    .rightJoin("Image", "Image.category_id", "Category.id")
    .select(["Category.description", "Category.name", "Image.url"])
    .where("Category.id", "!=", "Null")
    .execute();

  return json({
    userSession,
    sliderImages,
    initalProducts: mergeUrls(initalProducts),
    productCategories,
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();
  console.log(loaderData.sliderImages);

  return (
    <>
      <Slider
        sliderImages={loaderData.sliderImages}
        isRounded={false}
      />
      <section className="mx-auto max-w-[1000px] px-10">
        <Categories prouctCategories={loaderData.productCategories} />
        <Products
          sectionName="Mixture"
          sectionDesc="We are also known for our Indian snacks, savories ( Farsan And Namkeen), Fast Foods, Chaats, Punjabi and South Indian cuisines and delicious Lassi"
          hydrateProducts={
            loaderData.initalProducts as OutputElementType[]
          }
        />
      </section>
    </>
  );
}
