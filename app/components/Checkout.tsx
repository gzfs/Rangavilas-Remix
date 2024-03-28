import { useState } from "react";
import Modal from "./Modal";
import GooglePayButton from "@google-pay/button-react";

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
      <div className="grid gap-y-5">
        <div className="border text-[#333333] border-[#333333] col-span-1 rounded-3xl pt-5 px-5 pb-2 grid gap-y-2">
          <p className="font-bold text-2xl">Order Summary</p>
          <hr className="border-[#949393]" />
          <p>
            <span className="text-xs">Shipping To:</span>
            <p className="flex">
              <span className="text-xs">
                {addressFormatter(JSON.parse(JSON.stringify(userAddresses[0])))}
              </span>
              <button
                className="text-xs underline"
                onClick={() => {
                  setModalState(true);
                }}
              >
                Change
              </button>
            </p>
          </p>
          <p className="flex justify-between pb-3  font-Montserrat font-medium">
            <span>Total:</span>
            <span>69$</span>
          </p>
        </div>
        <div className="border text-[#333333] border-[#333333] col-span-1 rounded-3xl p-5 grid gap-y-4">
          <p className="font-bold text-2xl">Payment</p>
          <hr className="border-[#949393]" />
          <GooglePayButton
            className="w-full"
            buttonColor="default"
            buttonType="checkout"
            buttonRadius={12}
            buttonSizeMode="fill"
            environment="TEST"
            paymentRequest={{
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: [
                {
                  type: "CARD",
                  parameters: {
                    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                    allowedCardNetworks: ["MASTERCARD", "VISA"],
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: {
                      gateway: "example",
                      gatewayMerchantId: "exampleGatewayMerchantId",
                    },
                  },
                },
              ],
              merchantInfo: {
                merchantId: "12345678901234567890",
                merchantName: "Demo Merchant",
              },
              transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPriceLabel: "Total",
                totalPrice: "1",
                currencyCode: "USD",
                countryCode: "US",
              },
            }}
            onLoadPaymentData={(paymentRequest) => {
              console.log("load payment data", paymentRequest);
            }}
          />
        </div>
      </div>
      <Modal modalState={modalState} setModalState={setModalState}>
        <div className="p-3">
          {userAddresses.map((userAddress) => {
            return (
              <div className="flex font-Montserrat">
                <p className="text-sm">
                  {addressFormatter(JSON.parse(JSON.stringify(userAddress)))}
                </p>
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
