"use client";
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useState, useEffect } from "react";

// Main Component
const Nav = () => {
  const { data: session } = useSession();

  // useState
  const [providers, setProviders] = useState<null | object>(null);
  const [toggleDropDown, setToggleDropDwon] = useState(false);

  // useEffect
  useEffect(() => {
    const allProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    allProviders();
  }, []);

  // handleClick
  const handleClick = () => {
    signOut();
  };

  // Return
  return (
    <nav className="flex-between pt-3 mb-16 w-full">
      <Link className="flex-center gap-2" href={"/"}>
        <Image
          src={"/assets/images/logo.svg"}
          width={30}
          height={30}
          alt="logo-img"
        />
        <p className="logo_text">Promtopia</p>
      </Link>

      {/* The Desktop Screens */}
      <div className="hidden sm:flex">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create post
            </Link>
            <button type="button" className="outline_btn" onClick={handleClick}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              {session && (
                <Image
                  src={session && `${session?.user?.image}`}
                  width={37}
                  height={37}
                  className="rounded-full"
                  alt="profile-image"
                />
              )}
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* The Small Screens */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            {session && (
              <Image
                src={session && `${session?.user?.image}`}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile-image"
                onClick={() => setToggleDropDwon((prev) => !prev)}
              />
            )}
            {toggleDropDown && (
              <div className="dropdown">
                <Link
                  href={"/profile"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDwon(false)}
                >
                  My profile
                </Link>
                <Link
                  href={"/create-prompt"}
                  className="dropdown_link"
                  onClick={() => setToggleDropDwon(false)}
                >
                  Create post
                </Link>
                <button
                  type="button"
                  className="mt-5 w-full black_btn"
                  onClick={() => {
                    setToggleDropDwon(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  className="black_btn"
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
