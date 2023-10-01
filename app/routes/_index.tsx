import {
  type LoaderFunctionArgs,
  type MetaFunction,
  json,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { type GoogleProfile } from "remix-auth-socials";
import Navbar from "~/components/Navbar";
import Slider from "~/components/Slider";
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

  const sliderImages = [
    "https://images.unsplash.com/photo-1685825631222-6bfdc760d39c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    "https://images.unsplash.com/photo-1695058866572-c9a3b558d089?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1695058866915-a2167e8fac65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    "https://images.unsplash.com/photo-1685346388921-26dd3ae934be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  ];

  return json({
    userSession,
    sliderImages,
  });
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  return (
    <>
      <Navbar userSession={loaderData.userSession} />
      <Slider
        sliderImages={loaderData.sliderImages}
        isRounded={false}
      />
      <section className="mx-auto max-w-[1000px] px-10"></section>
    </>
  );
}
