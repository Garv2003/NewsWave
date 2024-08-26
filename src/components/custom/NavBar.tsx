import React from "react";
import Search from "./Search";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = ({ isProfile }: { isProfile: boolean }) => {
  const { data: session } = useSession();

  return (
    <nav className="flex w-full flex-col items-center justify-between border-b border-gray-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex w-full items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            NewsWave
          </h1>
        </Link>

        {isProfile ? <></> : <Search />}

        <div className="flex items-center justify-between space-x-4">
          <Link href={isProfile ? "/" : "/profile"}>
            <button className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black">
              {isProfile ? "Home" : "Profile"}
            </button>
          </Link>

          {session?.user ? (
            <button
              className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login">
              <button className="rounded-md bg-black p-2 font-bold text-white dark:bg-white dark:text-black">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {!isProfile && (
        <div className="mt-4 flex w-full max-w-4xl items-center justify-between">
          <button className="font-bold text-black dark:text-white">
            General
          </button>
          <button className="font-bold text-black dark:text-white">
            Technology
          </button>
          <button className="font-bold text-black dark:text-white">
            Business
          </button>
          <button className="font-bold text-black dark:text-white">
            Politics
          </button>
          <button className="font-bold text-black dark:text-white">
            Sports
          </button>
          <button className="font-bold text-black dark:text-white">
            Entertainment
          </button>
          <button className="font-bold text-black dark:text-white">
            Science
          </button>
          <button className="font-bold text-black dark:text-white">
            Health
          </button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
