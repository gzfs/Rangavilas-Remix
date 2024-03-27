import { useState } from "react";
import Modal from "./Modal";

export default function Checkout({
  userAddresses,
}: {
  userAddresses: {
    id: string;
    user_id: string;
    house_number: string;
    city: string;
    county: string;
    pincode: string;
    landmark: string | undefined;
    street_name: string;
  }[];
}) {
  const [modalState, setModalState] = useState(false);
  const [address, setAddress] = useState(userAddresses[0]);
  return (
    <>
      <div className="px-5 sm:px-10 py-5 gap-y-2 bg-white flex flex-wrap justify-between fixed bottom-0 w-full shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]">
        <div className="grid grid-cols-7 gap-2">
          <div className="bg-[#DEDEDE] text-xs text-[#333333] col-span-5 w-full font-Montserrat rounded-3xl py-5 px-10">
            <p className="font-bold">Shipping To: </p>
            <p>{addressFormatter(address)}</p>
          </div>
          <button
            className="grid place-items-center bg-[#DEDEDE] text-xs text-[#333333] col-span-2 w-full font-Montserrat rounded-3xl py-5 sm:px-10"
            onClick={() => {
              setModalState(true);
            }}
          >
            Change Address
          </button>
        </div>
        <button className="bg-[#333333] flex justify-center items-center px-5 font-Montserrat font-bold text-white rounded-3xl w-full sm:w-fit h-[80px] ">
          Checkout: 100₹
        </button>
      </div>
      <Modal modalState={modalState} setModalState={setModalState}>
        <div className="p-3">
          {userAddresses.map((userAddress) => {
            return (
              <div className="flex font-Montserrat">
                <p className="text-sm">{addressFormatter(userAddress)}</p>
                <button
                  className="mx-1 px-4 rounded-2xl bg-[#dedede] text-xs"
                  disabled={userAddress.id === address.id}
                  onClick={() => {
                    setAddress(userAddress);
                    setModalState(false);
                  }}
                >
                  {userAddress.id === address.id ? "Selected" : "Select"}
                </button>
              </div>
            );
          })}
        </div>
      </Modal>
    </>
  );
}

function addressFormatter(userAddress: {
  id: string;
  user_id: string;
  house_number: string;
  city: string;
  county: string;
  pincode: string;
  landmark: string | undefined;
  street_name: string;
}) {
  return `${userAddress.house_number} ${userAddress.street_name}, ${userAddress.county}, ${userAddress.city}-${userAddress.pincode}`;
}
