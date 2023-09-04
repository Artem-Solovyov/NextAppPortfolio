"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const session = useSession();
  const router = useRouter();

  if (session.status == "loading") {
    return <h3>Loading...</h3>;
  }
  if (session.status == "authenticated") {
    router?.push("/dashboard");
  }
  if (session.status == "unauthenticated") {
    router?.push("/dashboard/login");
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className="login">
      <form action="" className="login__form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required className="login__input" />
        <input type="password" placeholder="Password" required className="login__input" />
        <button className="login__button">Login</button>
      </form>
      <button onClick={() => signIn("google")}>Login with Goggle</button>
    </div>
  );
};

export default Login;
