import { type ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useState } from "react";
import ImageUpload from "~/components/CMS/ImageUpload";
import { tursoDB } from "~/services/db.server";
import { v4 as uuid } from "uuid";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();
  if (
    formData.categoryName &&
    formData.categoryDesc &&
    formData.categoryImageUrl
  ) {
    const categoryID = uuid();
    await tursoDB
      .insertInto("Category")
      .values({
        id: categoryID,
        description: formData.categoryDesc,
        name: formData.categoryName,
      })
      .execute();

    await tursoDB
      .insertInto("Image")
      .values({
        id: uuid(),
        url: formData.categoryImageUrl,
        category_id: categoryID,
      })
      .execute();
  }

  return json({});
}

export async function loader() {
  const availableCategories = await tursoDB
    .selectFrom("Category")
    .selectAll()
    .execute();

  const availableKeywords = await tursoDB
    .selectFrom("Keyword")
    .selectAll()
    .execute();

  return json({
    availableCategories,
    availableKeywords,
  });
}

export default function Others() {
  const [categoryImageUrl, setCategoryImageUrl] = useState<
    string | undefined
  >();
  const [categoryName, setCategoryName] = useState("");
  const [categoryDesc, setCategoryDesc] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selecteKeyword, setSelectedKeyword] = useState("");
  const [keywordName, setKeywordName] = useState("");

  const { availableCategories, availableKeywords } =
    useLoaderData<typeof loader>();

  const formNav = useNavigation();
  const formSub = useSubmit();
  const deleteKeywordFetcher = useFetcher();
  const addKeywordFetcher = useFetcher();

  const deleteCategoryFetcher = useFetcher();

  return (
    <section className="max-w-[1000px] mx-auto py-10 px-5 sm:px-10">
      <div>
        <p className="py-8 font-Outfit text-5xl font-bold text-[#333333]">
          Keywords
        </p>
        <addKeywordFetcher.Form
          className="grid grid-cols-3 w-fit mb-4 gap-2"
          onSubmit={(eV) => {
            eV.preventDefault();
            addKeywordFetcher.submit(
              {
                keywordName,
              },
              {
                action: "/admin/keyword/create",
                method: "POST",
                encType: "application/json",
              }
            );
          }}
        >
          <div className="col-span-2">
            <p className="text-xs w-fit mb-1">Name</p>
            <input
              type="text"
              className="outline-none w-full border border-[#333333] py-2 rounded-xl px-4 text-sm"
              name="name"
              value={keywordName}
              required
              onChange={(eV) => {
                setKeywordName(eV.target.value);
              }}
            />
          </div>
          <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs w-full h-fit place-self-end">
            {formNav.state !== "submitting" ? (
              "Add"
            ) : (
              <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
            )}
          </button>
        </addKeywordFetcher.Form>
        <deleteKeywordFetcher.Form
          className="grid grid-cols-3 w-fit"
          onSubmit={(eV) => {
            eV.preventDefault();
            deleteKeywordFetcher.submit(
              {
                keywordId: selecteKeyword,
              },
              {
                action: "/admin/keyword/delete",
                method: "POST",
                encType: "application/json",
              }
            );
          }}
        >
          <select
            className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm appearance-none col-span-2"
            name="category"
            defaultValue={availableKeywords[0].keyword}
            required
            onChange={(eV) => {
              setSelectedKeyword(
                eV.target[eV.target.selectedIndex].getAttribute(
                  "data-kw"
                ) as string
              );
            }}
          >
            {availableKeywords
              .filter((availableKeyword) => {
                return availableKeyword.keyword !== "product";
              })
              .map((availableKeyword) => {
                return (
                  <option
                    key={availableKeyword.id}
                    data-kw={availableKeyword.id}
                  >
                    {availableKeyword.keyword}
                  </option>
                );
              })}
          </select>
          <button className="py-3 px-6 rounded-xl bg-red-600 text-white text-xs ml-2 w-fit">
            {formNav.state !== "submitting" ? (
              "Delete"
            ) : (
              <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
            )}
          </button>
        </deleteKeywordFetcher.Form>
      </div>
      <div>
        <p className="py-8 font-Outfit text-5xl font-bold text-[#333333]">
          Categories
        </p>
        <deleteCategoryFetcher.Form
          method="POST"
          className="grid grid-cols-3 w-fit mb-4"
          onSubmit={(eV) => {
            eV.preventDefault();
            deleteCategoryFetcher.submit(
              {
                categoryId: selectedCategory,
              },
              {
                method: "POST",
                encType: "application/json",
                action: "/admin/category/delete",
              }
            );
          }}
        >
          <select
            className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm appearance-none"
            name="category"
            defaultValue={availableCategories[0].name}
            required
            onChange={(eV) => {
              setSelectedCategory(
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
          <button className="py-3 px-6 rounded-xl bg-red-600 text-white text-xs ml-2 w-fit">
            {formNav.state !== "submitting" ? (
              "Delete"
            ) : (
              <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
            )}
          </button>
        </deleteCategoryFetcher.Form>
        <div className="grid sm:grid-cols-2 gap-6">
          <ImageUpload setImageImgurUrl={setCategoryImageUrl} />
          <Form
            method="POST"
            onSubmit={(eV) => {
              eV.preventDefault();
              formSub(
                JSON.stringify({
                  categoryImageUrl,
                  categoryName,
                  categoryDesc,
                }),
                {
                  method: "POST",
                  encType: "application/json",
                }
              );
            }}
          >
            <div className="flex flex-col w-full">
              <p className="text-xs w-fit mb-1">Name</p>
              <input
                type="text"
                className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
                name="name"
                value={categoryName}
                required
                onChange={(eV) => {
                  setCategoryName(eV.target.value);
                }}
              />
            </div>
            <div className="flex flex-col w-full mt-4 ">
              <p className="text-xs w-fit mb-1">Description</p>
              <input
                type="text"
                className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
                name="desc"
                value={categoryDesc}
                required
                onChange={(eV) => {
                  setCategoryDesc(eV.target.value);
                }}
              />
            </div>
            <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-full sm:w-fit mt-4">
              {formNav.state !== "submitting" ? (
                "Submit"
              ) : (
                <div className="w-[20px] h-[20px] border border-white border-dashed rounded-xl animate-spin"></div>
              )}
            </button>
          </Form>
        </div>
      </div>
    </section>
  );
}
