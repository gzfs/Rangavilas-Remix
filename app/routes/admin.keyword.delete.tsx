import { json, type ActionFunctionArgs } from "@remix-run/node";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.json();
  if (formData.keywordId) {
    await tursoDB
      .deleteFrom("KeywordProduct")
      .where("KeywordProduct.keyword_id", "=", formData.keywordId)
      .execute();

    await tursoDB
      .deleteFrom("Keyword")
      .where("Keyword.id", "=", formData.keywordId)
      .execute();
  }

  return json({});
}
