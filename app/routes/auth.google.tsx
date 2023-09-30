import { type ActionFunctionArgs } from "@remix-run/node";
import { SocialsProvider } from "remix-auth-socials";
import { remixAuthenticator } from "~/services/auth.server";

export async function action(actionArgs: ActionFunctionArgs) {
  return await remixAuthenticator.authenticate(
    SocialsProvider.GOOGLE,
    actionArgs.request,
    {
      successRedirect: "/",
      failureRedirect: "/",
    }
  );
}
