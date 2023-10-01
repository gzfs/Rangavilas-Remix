import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { type GoogleProfile } from "remix-auth-socials";
import { remixAuthenticator } from "~/services/auth.server";

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: GoogleProfile =
    (await remixAuthenticator.isAuthenticated(loaderArgs.request, {
      failureRedirect: "/",
    })) as GoogleProfile;

  return json({
    userSession,
  });
}

export default function Profile() {
  return <section>Sheesh</section>;
}
