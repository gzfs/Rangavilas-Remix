import { redirect, type ActionFunctionArgs } from "@remix-run/node";

export async function action(actionArgs: ActionFunctionArgs) {
  const formData = await actionArgs.request.formData();
  console.log(formData);
  return redirect("/profile");
}
