"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const Register = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data } = useSWR(`/api/users`, fetcher);
  const [error, setError] = useState(null);
  const [errorName, setErrorName] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const router = useRouter();
  useEffect(() => {
    const userName = data?.filter((user) => user.name == name);
    if (userName?.length > 0) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
  }, [name]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const name = e.target[0].value;
    // const email = e.target[1].value;
    // const password = e.target[2].value;

    if (!errorName) {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            avatar,
            password,
          }),
        });
        res.status === 201 && router.push("/dashboard/login?success=Account has been created");
      } catch (error) {
        setError(error);
      }
    }
  };
  return (
    <div className="register">
      <h1 className="register__title">Create an Account</h1>
      <h5 className="register__subtitle">Please sign up to see dashboard</h5>
      <form action="" className="register__form form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username*"
          required
          className="register__input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {errorName && <h3 className="register__error">Це ім'я вже використовується.</h3>}
        <input
          type="email"
          placeholder="Email*"
          required
          className="register__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image"
          className="register__input"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
        <h6>
          *Please provide a link to an image from the following sources -{" "}
          <Link target="_blanc" href="https://www.freepik.com/free-photos-vectors/avatar">
            www.freepik.com
          </Link>
        </h6>
        <input
          type="password"
          placeholder="Password*"
          required
          className="register__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && "Something went wrong"}
        <button className={errorName ? "register__button register__button--off " : "register__button"}>
          [Register]
        </button>
      </form>
    </div>
  );
};

export default Register;
