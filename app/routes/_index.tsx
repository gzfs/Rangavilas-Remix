import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type GoogleProfile } from "remix-auth-socials";
import Navbar from "~/components/Navbar";
import { remixAuthenticator } from "~/services/auth.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Rangavilas" },
    { name: "description", content: "Sweets and Savories Shop" },
  ];
};

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: GoogleProfile =
    (await remixAuthenticator.isAuthenticated(
      loaderArgs.request
    )) as GoogleProfile;

  return json({
    userSession,
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <section>
      <Navbar userSession={loaderData.userSession} />
    </section>
  );
}
