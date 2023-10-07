import {
  type LoaderFunctionArgs,
  json,
  redirect,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import {
  type ImgurResponse,
  uploadImage,
} from "~/services/imgur.server";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const imageUrl: ImgurResponse = await uploadImage(formData);
  return json({ imageUrl });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  if (!userSession.is_admin)
    return redirect("/", {
      status: 302,
    });

  return json({});
}
