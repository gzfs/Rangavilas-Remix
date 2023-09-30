import { Form, Link } from "@remix-run/react";
import { type GoogleProfile } from "remix-auth-socials";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

export default function Navbar({
  userSession,
}: {
  userSession: GoogleProfile;
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="px-10 py-6 sticky shadow-xl flex justify-between font-Montserrat items-center text-[#333333]">
      <img src="/assets/images/Logo.png" alt="Logo" width={190} />
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
          <div className="absolute shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] rounded-xl px-8 py-2 top-12 bg-white right-0">
            <Form action="/auth/logout" method="POST">
              <div className="flex items-center py-2">
                <User className="w-[18px] mr-2" />
                <Link
                  to="/profile"
                  className="text-sm"
                  onClick={() => {
                    setShowDropdown(false);
                  }}
                >
                  Profile
                </Link>
              </div>
              <hr />
              <div className="flex items-center py-2">
                <LogOut className="w-[15px] mr-2" />
                <button className="text-sm">Logout</button>
              </div>
            </Form>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
