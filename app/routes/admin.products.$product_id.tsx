import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useState, type SVGProps, useEffect } from "react";
import { type Keyword, type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";
import { v4 as uuid } from "uuid";
import { mergeUrls } from "~/utils/helper.server";
import { symmetricDifferenceByKeywordId } from "~/utils/set.server";

export async function action({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.json();
  const productID = params.product_id as string;
  await tursoDB
    .updateTable("Product")
    .where("Product.id", "=", productID)
    .set({
      category_id: formData.productCategory,
      description: formData.productDesc,
      id: productID,
      is_featured: false,
      name: formData.productName,
      price: parseInt(formData.productPrice),
      rating: 0,
    })
    .execute();

  const productTags = await tursoDB
    .selectFrom("KeywordProduct")
    .where("KeywordProduct.product_id", "=", productID)
    .selectAll()
    .execute();

  const newTags = formData.productTags
    .filter((productTag: any) =>
      productTags.find((pT) => pT.keyword_id !== productTag.id)
    )
    .map((kw: any) => {
      return {
        id: uuid(),
        keyword_id: kw.id,
        product_id: productID,
      };
    });

  const oldTags = formData.productTags
    .filter((productTag: any) =>
      productTags.find((pT) => pT.keyword_id === productTag.id)
    )
    .map((kw: any) => {
      return {
        id: uuid(),
        keyword_id: kw.id,
        product_id: productID,
      };
    });

  const deletedTags = symmetricDifferenceByKeywordId(
    productTags,
    oldTags
  );

  console.log(deletedTags);

  if (deletedTags) {
    deletedTags.forEach(async (deletedTag) => {
      await tursoDB
        .deleteFrom("KeywordProduct")
        .where(
          "KeywordProduct.product_id",
          "=",
          deletedTag!.product_id
        )
        .where(
          "KeywordProduct.keyword_id",
          "=",
          deletedTag?.keyword_id as string
        )
        .execute();
    });
  }

  if (newTags) {
    newTags.forEach(async (newTag: any) => {
      await tursoDB
        .insertInto("KeywordProduct")
        .values({
          id: newTag.id,
          keyword_id: newTag.keyword_id,
          product_id: productID,
        })
        .execute();
    });
  }

  return redirect("/admin/products", {
    status: 302,
  });
}

export async function loader({
  request,
  params,
}: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  if (!userSession.is_admin)
    return redirect("/", {
      status: 302,
    });

  const availableCategories = await tursoDB
    .selectFrom("Category")
    .selectAll()
    .execute();

  const availableTags = await tursoDB
    .selectFrom("Keyword")
    .selectAll()
    .execute();

  const pageProduct = await tursoDB
    .selectFrom("Product")
    .where("Product.id", "=", params.product_id as string)
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

  return json({
    availableCategories,
    availableTags,
    pageProduct: mergeUrls(pageProduct)[0],
  });
}

export function MaterialSymbolsUpload(
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
        d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16h-2Zm-5 4q-.825 0-1.413-.588T4 18v-3h2v3h12v-3h2v3q0 .825-.588 1.413T18 20H6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsAddBoxRounded(
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
        d="M11 13v3q0 .425.288.713T12 17q.425 0 .713-.288T13 16v-3h3q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11h-3V8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8v3H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13h3Zm-6 8q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.588 1.413T19 21H5Z"
      ></path>
    </svg>
  );
}

export default function AddProduct() {
  const { availableCategories, availableTags, pageProduct } =
    useLoaderData<typeof loader>();

  const finalSubmit = useSubmit();

  const [productName, setProductName] = useState(
    pageProduct.name as string
  );
  const [productDesc, setProductDesc] = useState(
    pageProduct.description as string
  );
  const [productTags, setProductTags] = useState<Keyword[]>(
    availableTags.filter((availableTag) => {
      return pageProduct.keyword.find((kw) => {
        return kw === availableTag.keyword;
      });
    })
  );
  const [productCategory, setProductCategory] = useState(
    availableCategories.find(
      (availableCategory) =>
        availableCategory.name === pageProduct.category_name
    )?.id
  );
  const [productPrice, setProductPrice] = useState(
    pageProduct.price as number
  );
  const [tagsVisible, setTagsVisible] = useState(false);

  useEffect(() => {
    if (
      availableTags?.every((availableTag) => {
        return productTags?.includes(availableTag);
      })
    ) {
      setTagsVisible(false);
    }
  }, [productTags, availableTags]);

  const formNav = useNavigation();

  return (
    <section className="max-w-[1000px] mx-auto py-10 px-5 sm:px-10">
      <Form
        method="POST"
        onSubmit={(eV) => {
          eV.preventDefault();
          finalSubmit(
            JSON.stringify({
              productName,
              productDesc,
              productCategory,
              productTags,
              productPrice,
            }),
            {
              encType: "application/json",
              method: "POST",
            }
          );
        }}
      >
        <p className="py-8 font-Outfit text-5xl font-bold text-[#333333]">
          Details
        </p>
        <div className="grid sm:grid-cols-2 gap-4 font-Montserrat">
          <div className="flex flex-col w-full">
            <p className="text-xs w-fit mb-1">Name</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="name"
              value={productName}
              required
              onChange={(eV) => {
                setProductName(eV.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs w-fit mb-1">Description</p>
            <input
              type="text"
              value={productDesc}
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="desc"
              required
              onChange={(eV) => {
                setProductDesc(eV.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-fit relative">
            <p className="text-xs w-fit pb-2">Tags</p>
            <div className="flex items-center">
              <MaterialSymbolsAddBoxRounded
                className="text-3xl text-[#333333] cursor-pointer"
                onClick={() => {
                  setTagsVisible(!tagsVisible);
                }}
              />
              {productTags
                ? productTags.map((productTag) => {
                    return (
                      <div
                        className="flex items-center cursor-pointer w-fit border px-2 py-1 border-red-700 rounded-lg mr-2 text-xs"
                        key={productTag.id}
                        onClick={() => {
                          if (productTag.keyword !== "product") {
                            setProductTags(
                              productTags.filter((pT) => {
                                return pT.id !== productTag.id;
                              })
                            );
                          }
                        }}
                      >
                        <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
                        <p className="ml-2">
                          {productTag.keyword
                            .split("_")[0]
                            .slice(0, 1)
                            .toUpperCase() +
                            productTag.keyword.split("_")[0].slice(1)}
                        </p>
                      </div>
                    );
                  })
                : ""}
            </div>

            <div
              className="absolute bg-white text-xs rounded-xl border border-[#333333] px-4 py-2 top-14 fade-in"
              style={{
                display:
                  tagsVisible &&
                  !availableTags?.every((availableTag) => {
                    return productTags?.includes(availableTag);
                  })
                    ? "block"
                    : "none",
              }}
            >
              {availableTags
                .filter((availableTag) => {
                  return !productTags?.find((productTag) => {
                    return productTag.id === availableTag.id;
                  });
                })
                .map((availableTag) => {
                  return (
                    <div
                      className="flex items-center cursor-pointer w-fit border my-2 px-2 py-1 border-red-700 rounded-lg mr-2 text-xs"
                      key={availableTag.id}
                      onClick={() => {
                        if (productTags) {
                          setProductTags([
                            availableTag,
                            ...productTags,
                          ]);
                        } else {
                          setProductTags([availableTag]);
                        }
                      }}
                    >
                      <div className="w-[5px] h-[5px] rounded-full bg-black"></div>
                      <p className="ml-2">
                        {availableTag.keyword
                          .split("_")[0]
                          .slice(0, 1)
                          .toUpperCase() +
                          availableTag.keyword.split("_")[0].slice(1)}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col w-full">
              <p className="text-xs w-fit mb-1">Category</p>
              <select
                className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm appearance-none"
                name="category"
                defaultValue={availableCategories[0].name}
                required
                onChange={(eV) => {
                  setProductCategory(
                    eV.target[eV.target.selectedIndex].getAttribute(
                      "data-categ"
                    ) as string
                  );
                }}
              >
                {availableCategories.map((availableCategory) => {
                  return (
                    <option
                      key={availableCategory.id}
                      data-categ={availableCategory.id}
                    >
                      {availableCategory.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col w-full">
              <p className="text-xs w-fit mb-1">Price</p>
              <input
                type="number"
                className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
                name="price"
                min={0}
                value={productPrice}
                onChange={(eV) => {
                  setProductPrice(parseInt(eV.target.value));
                }}
                required
              />
            </div>
          </div>
          <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-full sm:w-fit">
            {formNav.state !== "submitting" ? (
              "Submit"
            ) : (
              <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
            )}
          </button>
        </div>
      </Form>
    </section>
  );
}
