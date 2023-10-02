import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const deleteAddressID = formData.get("delete_address_id") as string;

  console.log(deleteAddressID);

  await tursoDB
    .deleteFrom("Address")
    .where("Address.id", "=", deleteAddressID)
    .execute();

  return redirect("/profile");
}
