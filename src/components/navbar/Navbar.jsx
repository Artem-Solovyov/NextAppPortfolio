"use client"
import Link from "next/link"


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
  return (
    <nav className="navbar">
      <Link href='/' className="navbar__logo">MyApp</Link>
      <div className="navbar__links">
        {links.map((link) => (
          <Link key={link.id} href={link.url} className="navbar__link">{link.title}</Link>
        ))}
        <button className="navbar__logout" onClick={()=>{console.log("logged out");}}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar