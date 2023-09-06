"use client";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  // {
  //   id: 2,
  //   title: "Portfolio",
  //   url: "/portfolio",
  // },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },

  // {
  //   id: 5,
  //   title: "Contact",
  //   url: "/contact",
  // },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const session = useSession();
  return (
    <nav className="navbar">
      <Link href="/" className="navbar__logo">
        <span>[Next]</span>
      </Link>
      <div className="navbar__links">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="navbar__link">
            {link.title}
          </Link>
        ))}
      </div>
      <div className="navbar__right">
        <DarkModeToggle />
        {session.status == "authenticated" ? (
          <div className="navbar__user">
            <button className="navbar__logout" onClick={signOut}>
              Logout
            </button>
            <div className="navbar__profile">
              <Link href="/dashboard">
                <Image
                  src={session.data.user.image}
                  alt={session.data.user.name}
                  width={50}
                  height={50}
                  className="navbar__avatar"
                ></Image>
              </Link>
              <div className="navbar__data">
                <div className="navbar__name">{session.data.user.name}</div>
                <div className="navbar__email">{session.data.user.email}</div>
              </div>
            </div>
          </div>
        ) : (
          <Link href="/dashboard/login" className="navbar__logout navbar__logout--in">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
