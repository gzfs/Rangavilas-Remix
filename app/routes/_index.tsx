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

  const sliderImages = [
    "https://images.unsplash.com/photo-1685825631222-6bfdc760d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    "https://images.unsplash.com/photo-1695058866572-c9a3b558d089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1695058866915-a2167e8fac65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1685346388921-26dd3ae934be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];

  const initalProducts = await tursoDB
    .selectFrom("Product")
    .rightJoin("Category", "Category.id", "Product.category_id")
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
    ])
    .execute();

  return json({
    userSession,
    sliderImages,
    initalProducts: mergeUrls(initalProducts),
  });
}

type InputElementType = {
  name: string | null;
  description: string | null;
  id: string | null;
  rating: number | null;
  price: number | null;
  is_featured: boolean | null;
  url: string;
  category_name: string | null;
};

export type OutputElementType = {
  name: string | null;
  description: string | null;
  id: string | null;
  rating: number | null;
  price: number | null;
  is_featured: boolean | null;
  url: string[];
  category_name: string | null;
};

function mergeUrls(
  inputArray: InputElementType[]
): OutputElementType[] {
  const result: { [id: string]: OutputElementType } = {};

  for (const item of inputArray) {
    if (item.id != null) {
      if (result[item.id]) {
        result[item.id].url.push(item.url);
      } else {
        result[item.id] = { ...item, url: [item.url] };
      }
    }
  }
  const outputArray = Object.values(result);

  return outputArray;
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <Slider
        sliderImages={loaderData.sliderImages}
        isRounded={false}
      />
      <section className="mx-auto max-w-[1000px] px-10">
        <Categories />
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
