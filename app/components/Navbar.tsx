import { Form, Link } from "@remix-run/react";

import { LogOut, Search, Shield, ShoppingBasket } from "lucide-react";
import { type SVGProps, useState } from "react";
import { clsx } from "clsx";
import { type User } from "~/database/types";

export function MaterialSymbolsAccountCircle(
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
        d="M5.85 17.1q1.275-.975 2.85-1.538T12 15q1.725 0 3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4Q8.675 4 6.337 6.337T4 12q0 1.475.488 2.775T5.85 17.1ZM12 13q-1.475 0-2.488-1.012T8.5 9.5q0-1.475 1.012-2.488T12 6q1.475 0 2.488 1.012T15.5 9.5q0 1.475-1.012 2.488T12 13Zm0 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
      ></path>
    </svg>
  );
}

export default function Navbar({
  userSession,
}: {
  userSession: User;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="px-10 py-8 sticky shadow-xl flex justify-between font-Montserrat items-center text-[#333333] z-50">
      <Link to="/">
        <img
          src="/assets/images/Small-2.png"
          alt="Logo"
          width={150}
        />
      </Link>
      <div className="flex items-center">
        <div>
          <div className="md:flex hidden mr-5">
            <input
              type="text"
              className="outline-none border border-r-0 border-[#C1224F] rounded-[10px_0px_0px_10px] py-2 px-4 text-xs font-Montserrat"
            />
            <button className="border border-[#C1224F] rounded-[0px_10px_10px_0px] border-l-0 flex justify-center items-center px-3">
              <Search className="w-[20px] text-[#C1224F]" />
            </button>
            <a
              href="/cart"
              className="flex justify-center items-center  ml-5"
            >
              <ShoppingBasket className="w-[20px] text-[#C1224F]" />
            </a>
          </div>
          <div className="md:hidden flex justify-center items-center mr-5">
            <Search className="w-[20px] text-[#C1224F]" />
            <a href="/cart">
              <ShoppingBasket className="w-[20px] text-[#C1224F] ml-6" />
            </a>
          </div>
        </div>
        <div className="relative">
          {userSession ? (
            <img
              src={userSession.image}
              alt="Profile"
              width={40}
              className="rounded-full cursor-pointer"
              onClick={() => {
                setShowDropdown(!showDropdown);
              }}
            />
          ) : (
            <Form action="/auth/google" method="POST">
              <button>Login</button>
            </Form>
          )}
          {showDropdown && userSession ? (
            <div
              className={clsx(
                "absolute shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-[13px] rounded-xl py-2 top-14 bg-white right-0 w-[200px] px-4 fade-in"
              )}
            >
              {userSession.is_admin ? (
                <>
                  <div className="flex items-center py-2 w-full">
                    <Shield className="w-[18px] mr-2" />
                    <Link
                      to="/admin"
                      className="w-fit"
                      onClick={() => {
                        setShowDropdown(false);
                      }}
                    >
                      Admin Dashboard
                    </Link>
                  </div>
                  <hr />{" "}
                </>
              ) : (
                ""
              )}
              <div className="flex items-center py-2 w-full">
                <MaterialSymbolsAccountCircle className="text-xl text-[#333333] mr-2" />
                <Link
                  to="/profile"
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  Profile
                </Link>
              </div>
              <hr />
              <Form
                action="/auth/logout"
                method="POST"
                className="flex items-center py-2 w-full"
              >
                <LogOut className="w-[15px] mr-2" />
                <button>Logout</button>
              </Form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
