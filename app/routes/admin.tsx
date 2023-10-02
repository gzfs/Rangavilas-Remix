import {
  redirect,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { type SVGProps } from "react";
import Card from "~/components/CMS/Card";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";

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

export function IcOutlineTrendingUp(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="m16 6l2.29 2.29l-4.88 4.88l-4-4L2 16.59L3.41 18l6-6l4 4l6.3-6.29L22 12V6h-6z"
      ></path>
    </svg>
  );
}

export default function Admin() {
  return (
    <section className="mx-auto px-10 text-[#333333]">
      <p className="text-4xl font-Outfit font-bold py-10">
        Dashboard
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-Montserrat">
        <Card>
          <p className="text-sm mb-2">TOTAL ORDERS</p>
          <p className="font-Outfit font-bold text-4xl mb-2">500</p>
          <p className="flex items-center">
            <IcOutlineTrendingUp className="text-green-600" />
            <span className="ml-2">10.3%</span>
          </p>
        </Card>
        <Card>
          <p className="text-sm mb-2">PRODUCTS SOLD</p>
          <p className="font-Outfit font-bold text-4xl mb-2">1500</p>
          <p className="flex items-center">
            <IcOutlineTrendingUp className="text-green-600" />
            <span className="ml-2">10.3%</span>
          </p>
        </Card>
        <Card>
          <p className="text-sm mb-2">REVENUE</p>
          <p className="font-Outfit font-bold text-4xl mb-2">
            ₹24,500
          </p>
          <p className="flex items-center">
            <IcOutlineTrendingUp className="text-green-600" />
            <span className="ml-2">10.3%</span>
          </p>
        </Card>
      </div>
      <p className="text-4xl font-Outfit font-bold py-10">
        Recent Orders
      </p>
    </section>
  );
}
