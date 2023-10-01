import { Form, Link } from "@remix-run/react";
import { type GoogleProfile } from "remix-auth-socials";
import {
  LogOut,
  Search,
  Shield,
  ShoppingBasket,
  User,
} from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";

export default function Navbar({
  userSession,
}: {
  userSession: GoogleProfile;
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
              src={userSession.photos[0].value}
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
              <hr />
              <div className="flex items-center py-2 w-full">
                <User className="w-[18px] mr-2" />
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
