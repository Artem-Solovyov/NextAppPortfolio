"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Auth = () => {
  const pathname = usePathname();

  return (
    <div className="auth__form">
      <Link href="/dashboard/login" className={pathname == "/dashboard/login" ? "auth__link active" : "auth__link"}>
        LogIn
      </Link>

      <Link
        href="/dashboard/register"
        className={pathname == "/dashboard/register" ? "auth__link active" : "auth__link"}
      >
        Register
      </Link>
    </div>
  );
};

export default Auth;
