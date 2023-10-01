import {
  type LoaderFunctionArgs,
  json,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import Heading from "~/components/Heading";
import Modal from "~/components/Modal";
import { type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile" },
    { name: "description", content: "Sweets and Savories Shop" },
  ];
};

export async function action(actionArgs: ActionFunctionArgs) {
  return json({});
}

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    loaderArgs.request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const userDB = await tursoDB
    .selectFrom("User")
    .where("User.email", "=", userSession.email)
    .selectAll()
    .executeTakeFirst();

  return json({
    userDB,
  });
}

export default function Profile() {
  const loaderData = useLoaderData<typeof loader>();
  const [modalState, setModalState] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(
    loaderData.userDB?.phone || ""
  );
  const [firstName, setFirstName] = useState(
    loaderData.userDB?.first_name || ""
  );
  const [lastName, setLastName] = useState(
    loaderData.userDB?.last_name || ""
  );

  return (
    <section className="mx-auto max-w-[1000px] px-10 text-[#333333] font-Montserrat">
      <Heading
        sectionTitle="Profile"
        sectionDesc="Crafting Your Perfect Shopping Experience: Empower Yourself to Fine-Tune Your User Information on Our Ecommerce Platform, Tailoring Every Detail to Your Preferences!"
      />
      <Form
        className="grid place-self-center lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6"
        method="POST"
        action="/profile/update"
      >
        <div className="grid place-self-center place-items-center grid-cols-1 gap-x-4 gap-y-6 w-full">
          <div className="flex flex-col w-full">
            <p className="text-xs w-fit mb-1">First Name</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              value={firstName}
              name="first_name"
              onChange={(eV) => {
                setFirstName(eV.target.value);
              }}
            />
          </div>
          <div className="flex flex-col w-full">
            <p className="text-xs w-fit mb-1">Last Name</p>
            <input
              type="text"
              name="last_name"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              value={lastName}
              onChange={(eV) => {
                setLastName(eV.target.value);
              }}
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Email</p>
            <input
              type="text"
              name="email"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              value={loaderData.userDB?.email}
              disabled
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 w-full grid-rows-3">
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Address</p>
            <div className="grid grid-cols-2 gap-x-4">
              <button
                className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-full"
                onClick={() => {
                  setModalState(true);
                }}
                disabled={!loaderData.userDB && true}
              >
                Add an Address
              </button>
              <button
                className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-full"
                disabled={!loaderData.userDB}
              >
                Edit Addresses
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Default Address</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm w-full"
              disabled={!loaderData.userDB && true}
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Phone</p>
            <input
              type="text"
              name="phone"
              value={phoneNumber}
              onChange={(eV) => {
                setPhoneNumber(eV.target.value);
              }}
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
            />
          </div>
        </div>
        <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-fit lg:col-span-2">
          Update Details
        </button>
      </Form>
      <Modal modalState={modalState} setModalState={setModalState}>
        <Form
          className="grid grid-col-1 gap-y-4 p-6 bg-white rounded-xl"
          method="POST"
        >
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">House Number</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="houseNumber"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Street Name</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="streetName"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Area</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="county"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">City</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="city"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Landmark</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="landmark"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Pincode</p>
            <input
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="pincode"
            />
          </div>
          <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-fit">
            Add
          </button>
        </Form>
      </Modal>
    </section>
  );
}
