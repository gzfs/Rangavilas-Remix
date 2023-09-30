import { type ActionFunctionArgs } from "@remix-run/node";
import { remixAuthenticator } from "~/services/auth.server";

export async function action(actionArgs: ActionFunctionArgs) {
  await remixAuthenticator.logout(actionArgs.request, {
    redirectTo: "/",
  });
}
