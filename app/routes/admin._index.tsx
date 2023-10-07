import {
  redirect,
  type LoaderFunctionArgs,
  json,
} from "@remix-run/node";
import { Link } from "@remix-run/react";
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

export function EosIconsProducts(props: SVGProps<SVGSVGElement>) {
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
        d="M7 2H3a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1ZM5 21a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9H3V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Zm8-17h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-2 19a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9h-4V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Zm8-17h-4a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Zm-2 19a2 2 0 1 1 2-2a2 2 0 0 1-2 2Zm2-9h-4V3h4Zm-1 7a1 1 0 1 1-1-1a1 1 0 0 1 1 1Z"
      ></path>
    </svg>
  );
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

export function MaterialSymbolsSettings(
  props: SVGProps<SVGSVGElement>
) {
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
        d="m9.25 22l-.4-3.2q-.325-.125-.613-.3t-.562-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.337v-.674q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2h-5.5Zm2.8-6.5q1.45 0 2.475-1.025T15.55 12q0-1.45-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12q0 1.45 1.012 2.475T12.05 15.5Z"
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
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="col-span-1">
          <p className="text-4xl font-Outfit font-bold pt-10">Edit</p>
          <div className="grid grid-cols-2 gap-6 font-Montserrat text-sm pt-4">
            <Link
              to="/admin/products"
              className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-4 rounded-xl flex items-center cursor-pointer"
            >
              <EosIconsProducts className="text-xl" />
              <p className="ml-2">Products</p>
            </Link>
            <Link
              to="/admin/others"
              className="shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-4 py-4 rounded-xl flex items-center"
            >
              <MaterialSymbolsSettings className="text-xl" />
              <p className="ml-2">Others</p>
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-4xl font-Outfit font-bold py-10">
            Recent Orders
          </p>
        </div>
      </div>
    </section>
  );
}
