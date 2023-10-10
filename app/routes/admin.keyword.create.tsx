import { json, type ActionFunctionArgs } from "@remix-run/node";
import { tursoDB } from "~/services/db.server";
import { v4 as uuid } from "uuid";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();
  if (formData.keywordName) {
    await tursoDB
      .insertInto("Keyword")
      .values({
        id: uuid(),
        keyword: formData.keywordName,
      })
      .execute();
  }

  return json({});
}
