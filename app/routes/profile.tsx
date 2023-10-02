import {
  type LoaderFunctionArgs,
  json,
  type MetaFunction,
  type ActionFunctionArgs,
} from "@remix-run/node";
import {
  Form,
  useLoaderData,
  useFetcher,
  useNavigation,
  useActionData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import Heading from "~/components/Heading";
import Modal from "~/components/Modal";
import { type Address, type User } from "~/database/types";
import { remixAuthenticator } from "~/services/auth.server";
import { tursoDB } from "~/services/db.server";
import { v4 as uuid } from "uuid";

export const meta: MetaFunction = () => {
  return [
    { title: "Profile" },
    { name: "description", content: "Sweets and Savories Shop" },
  ];
};

export async function action({ request }: ActionFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const formData = await request.formData();
  const houseNumber = formData.get("houseNumber") as string;
  const streetName = formData.get("streetName") as string;
  const county = formData.get("county") as string;
  const city = formData.get("city") as string;
  const landmark = (formData.get("landmark") as string) || "";
  const pincode = formData.get("pincode") as string;

  if (userSession) {
    await tursoDB
      .insertInto("Address")
      .values({
        id: uuid(),
        city,
        county,
        house_number: houseNumber,
        pincode,
        landmark,
        street_name: streetName,
        user_id: userSession.id,
      })
      .executeTakeFirst();
  }

  return json({
    modalState: false,
  });
}

export async function loader(loaderArgs: LoaderFunctionArgs) {
  const userSession: User = (await remixAuthenticator.isAuthenticated(
    loaderArgs.request,
    {
      failureRedirect: "/",
    }
  )) as User;

  const userDB = (await tursoDB
    .selectFrom("User")
    .where("User.email", "=", userSession.email)
    .selectAll()
    .executeTakeFirst()) as User;

  const userAddresses = await tursoDB
    .selectFrom("Address")
    .where("Address.user_id", "=", userSession.id)
    .selectAll()
    .execute();

  return json({
    userDB,
    userAddresses,
  });
}

export default function Profile() {
  const [editModalState, setEditModalState] = useState(false);
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
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
  const [defaultAddressID, setDefaultAddressID] = useState(
    loaderData.userDB.default_address_id
  );

  const [deleteAddressID, setDeleteAddressID] = useState(
    loaderData.userDB.default_address_id
  );

  const fetcher = useFetcher();
  const addressDeleteFetcher = useFetcher();

  useEffect(() => {
    setModalState(actionData?.modalState as boolean);
  }, [actionData?.modalState]);

  function formatAddresses({
    city,
    house_number,
    county,
    pincode,
    street_name,
  }: Address): string {
    return `${house_number} ${street_name}, ${county}, ${city} - ${pincode}`;
  }

  const useNav = useNavigation();

  return (
    <section className="mx-auto max-w-[1000px] px-10 text-[#333333] font-Montserrat">
      <Heading
        sectionTitle="Profile"
        sectionDesc="Crafting Your Perfect Shopping Experience: Empower Yourself to Fine-Tune Your User Information on Our Ecommerce Platform, Tailoring Every Detail to Your Preferences!"
      />
      <fetcher.Form
        className="grid place-self-center lg:grid-cols-2 grid-cols-1 gap-x-10 gap-y-6"
        onSubmit={(eV) => {
          eV.preventDefault();
          fetcher.submit(
            {
              default_address_id: defaultAddressID as string,
              first_name: firstName,
              last_name: lastName,
              phone: phoneNumber,
            },
            { action: "/profile/update", method: "post" }
          );
        }}
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
              required
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
              required
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
                onClick={(eV) => {
                  eV.preventDefault();
                  setModalState(true);
                }}
                disabled={!loaderData.userDB && true}
              >
                Add an Address
              </button>
              <button
                className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-full"
                onClick={(eV) => {
                  eV.preventDefault();
                  setEditModalState(true);
                }}
                disabled={!loaderData.userDB}
              >
                Edit Addresses
              </button>
            </div>
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Default Address</p>
            <select
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm w-full"
              disabled={!loaderData.userDB && true}
              name="default-address"
              onChange={(eV) => {
                setDefaultAddressID(
                  eV.target[eV.target.selectedIndex].getAttribute(
                    "data-address"
                  ) as string
                );
              }}
            >
              {loaderData.userAddresses.map((userAddress, index) => {
                return (
                  <option
                    key={userAddress.id}
                    data-address={userAddress.id}
                    selected={
                      loaderData.userDB.default_address_id
                        ? loaderData.userDB.default_address_id ===
                          userAddress.id
                        : index === 0
                    }
                  >
                    {formatAddresses(userAddress)}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Phone</p>
            <input
              pattern="(7|8|9)\d{9}"
              required
              type="tel"
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
          {fetcher.state === "submitting"
            ? "Updating"
            : "Update Details"}
        </button>
      </fetcher.Form>
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
              required
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Street Name</p>
            <input
              required
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="streetName"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Area</p>
            <input
              required
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="county"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">City</p>
            <input
              required
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="city"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Landmark</p>
            <input
              required
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="landmark"
            />
          </div>
          <div className="flex flex-col col-span-1 w-full">
            <p className="text-xs w-fit mb-1">Pincode</p>
            <input
              required
              type="text"
              className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm"
              name="pincode"
            />
          </div>
          <button className="py-3 px-6 rounded-xl bg-[#333333] text-white text-xs col-span-1 w-fit">
            {useNav.state === "submitting" ? "Adding" : "Add"}
          </button>
        </Form>
      </Modal>
      <Modal
        modalState={editModalState}
        setModalState={setEditModalState}
      >
        <addressDeleteFetcher.Form
          className="p-10"
          onSubmit={(eV) => {
            eV.preventDefault();
            addressDeleteFetcher.submit(
              {
                delete_address_id: deleteAddressID as string,
              },
              {
                method: "POST",
                action: "/address/delete",
              }
            );
          }}
        >
          <select
            className="outline-none border border-[#333333] py-2.5 rounded-xl px-4 text-sm w-full"
            disabled={!loaderData.userDB && true}
            name="default-address"
            defaultValue={formatAddresses(
              loaderData.userAddresses[0]
            )}
            onChange={(eV) => {
              setDeleteAddressID(
                eV.target[eV.target.selectedIndex].getAttribute(
                  "data-address"
                ) as string
              );
            }}
          >
            {loaderData.userAddresses.map((userAddress, index) => {
              return (
                <option
                  key={userAddress.id}
                  data-address={userAddress.id}
                >
                  {formatAddresses(userAddress)}
                </option>
              );
            })}
          </select>
          <button
            className="py-3 mt-3 px-6 rounded-xl bg-red-600 text-white text-xs col-span-1 w-fit"
            disabled={
              deleteAddressID ===
                loaderData.userDB.default_address_id ||
              loaderData.userAddresses.length === 1
            }
          >
            {addressDeleteFetcher.state === "submitting"
              ? "Deleting"
              : "Delete"}
          </button>
        </addressDeleteFetcher.Form>
      </Modal>
    </section>
  );
}
