import { type LoaderFunctionArgs } from "@remix-run/node";
import { remixAuthenticator } from "../services/auth.server";
import { SocialsProvider } from "remix-auth-socials";

export async function loader(loaderArgs: LoaderFunctionArgs) {
  return await remixAuthenticator.authenticate(
    SocialsProvider.GOOGLE,
    loaderArgs.request,
    {
      successRedirect: "/profile",
      failureRedirect: "/",
    }
  );
}
