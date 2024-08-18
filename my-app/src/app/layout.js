"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import { Auth, getUser } from "../../lib/auth";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { userAtom } from "../../stateManagment/user";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  const [user, setUser] = useAtom(userAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetcher = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetcher();
  }, []);

  const onLogin = () => {
    Auth.federatedSignIn();
  };

  const onLogout = () => {
    Auth.signOut();
  };

  return (
    <html lang="en">
      <body>
        <div className="mx-3 h-24 relative flex items-center text-xl text-blue-800">
          <span className="mx-4">Fragments</span>
          <a href="/" className="mx-4 hidden md:inline">
            Home
          </a>
          <a href="/userFragments" className="mx-4 hidden md:inline">
            My-Fragment
          </a>
          {!user && (
            <button
              onClick={onLogin}
              className="hidden md:inline absolute right-0 mx-4 border w-32 h-10 bg-blue-600 rounded-3xl text-slate-100 hover:text-blue-600 hover:bg-white hover:border-blue-600 transition ease-in-out duration-300"
            >
              Login
            </button>
          )}
          {user && (
            <button
              onClick={onLogout}
              className="hidden md:inline absolute right-0 mx-4 border w-32 h-10 bg-blue-600 rounded-3xl text-slate-100 hover:text-blue-600 hover:bg-white hover:border-blue-600 transition ease-in-out duration-300"
            >
              Logout
            </button>
          )}
          <button
            className="h-10 w-10 absolute right-0 md:hidden inline"
            onClick={() => setOpen(!open)}
          >
            <img className="object-cover" src="/hamburger.png" alt="Menu" />
          </button>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            open ? "h-44 opacity-100" : "h-0 opacity-0"
          }`}
        >
          <div className="m-3 flex-col text-xl text-blue-800">
            <a href="/" className="block m-4">
              Home
            </a>
            <a href="/userFragments" className="block m-4">
              My-Fragment
            </a>
            {!user && (
              <button
                onClick={onLogin}
                className="mx-3 border w-32 h-10 bg-blue-600 rounded-3xl text-slate-100 hover:text-blue-600 hover:bg-white hover:border-blue-600 transition ease-in-out duration-300"
              >
                Login
              </button>
            )}
            {user && (
              <button
                onClick={onLogout}
                className="mx-3 border w-32 h-10 bg-blue-600 rounded-3xl text-slate-100 hover:text-blue-600 hover:bg-white hover:border-blue-600 transition ease-in-out duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        <main>{children}</main>
      </body>
    </html>
  );
}
