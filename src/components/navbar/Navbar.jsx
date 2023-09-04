"use client";
import Link from "next/link";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signIn, signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
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
        MyApp
      </Link>
      <div className="navbar__links">
        <DarkModeToggle />
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="navbar__link">
            {link.title}
          </Link>
        ))}
        {session.status == "authenticated" && (
          <button className="navbar__logout" onClick={signOut}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
