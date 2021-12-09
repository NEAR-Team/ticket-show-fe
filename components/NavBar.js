import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "../context/app.context";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";

export default function NavBar() {
  const { isAuth, login, logout } = useAppContext();
  const [active, setActive] = useState(false);
  const [scroll, setScroll] = useState(false);

  const router = useRouter();
  const handleClick = () => {
    setActive(!active);
  };

  const handleScroll = () => {
    if (window && window.scrollY > 10) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuth = () => {
    if (isAuth) {
      logout();
      router.replace("/");
    } else {
      login();
    }
  };

  return (
    <nav
      className={clsx(
        scroll && "bg-white shadow",
        "fixed w-full z-30 top-0 text-white inset-x-0",
        active && "text-gray-800"
      )}
    >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="pl-4 flex items-center">
          <Link passHref href="/">
            <a
              className={clsx(
                scroll ? "text-gray-800" : "text-white",
                "toggleColour  no-underline hover:no-underline font-bold text-2xl flex items-center"
              )}
            >
              <Image
                layout="fixed"
                src="/assets/ticket.png"
                height={128 / 3}
                width={128 / 3}
                alt="logo"
              />
              B-EVENT
            </a>
          </Link>
        </div>
        <div className="block lg:hidden pr-4">
          <button
            id="nav-toggle"
            className="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            onClick={handleClick}
          >
            <svg
              className="fill-current h-6 w-6"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={clsx(
            !active && "hidden",
            scroll && "text-gray-800",
            "w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent  p-4 lg:p-0 z-20"
          )}
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
              <a
                className="inline-block py-2 px-4  font-bold no-underline"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="mr-3">
              <Link passHref href="/white-paper">
                <a
                  className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  href="#"
                >
                  White Paper
                </a>
              </Link>
            </li>
            <li className="mr-3">
              <Link passHref href="/about">
                <a
                  className="inline-block  no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
                  href="#"
                >
                  About
                </a>
              </Link>
            </li>
          </ul>
          <button
            id="navAction"
            className={clsx(
              scroll ? "gradient text-white" : "bg-white text-gray-800",
              "font-bold rounded-full mt-4 lg:mt-0 py-2 px-4 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
            )}
            onClick={handleAuth}
          >
            {!isAuth ? "Login with Near" : "Logout"}
          </button>
        </div>
      </div>
      <hr className="border-b border-gray-100 opacity-25 my-0 py-0" />
    </nav>
  );
}
