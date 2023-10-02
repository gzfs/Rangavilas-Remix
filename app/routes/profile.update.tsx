import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const defaultAddressID = formData.get(
    "default_address_id"
  ) as string;
  const firstName = formData.get("first_name") as string;
  const lastName = formData.get("last_name") as string;
  const phone = formData.get("phone") as string;

  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  await tursoDB
    .updateTable("User")
    .where("User.email", "=", userSession.email)
    .set({
      default_address_id: defaultAddressID as string,
      last_name: lastName,
      first_name: firstName,
      phone,
    })
    .execute();

  return redirect("/profile");
}
