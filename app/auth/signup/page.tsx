"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setButtonText("Proccessing...");
    setError(null);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      // if (response.ok) {
      //   const signInResponse = await signIn("credentials", {
      //     email: email,
      //     password: password,
      //     redirect: false,
      //   });

      //   if (signInResponse?.error) {
      //     push("/auth/login");
      //   } else {
      //     push("/");
      //   }
      // } else {
      //   const data = await response.json();
      //   setError(data.error);
      // }
    } catch (error) {
      console.log(error);
      console.log(
        JSON.stringify({
          name,
          email,
          password,
        })
      );
      setError("Server error. Try again.");
    }

    setName("");
    setEmail("");
    setPassword("");
    setLoading(false);
    setButtonText("Sign Up");
  };

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center bg-white text-white">
      <h1 className="pb-5 text-4xl font-bold text-black md:text-5xl">
        To Do List
      </h1>
      <div className="w-[85%] rounded-md bg-gray-500 p-7 md:w-auto md:px-12 md:py-7">
        <h2 className="mb-5 text-center text-xl font-bold md:text-3xl">
          Create an Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-black"
        >
          <input
            className="rounded p-1 md:p-2"
            type="text"
            placeholder="First name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
            autoFocus
          />
          <input
            className="rounded p-1 md:p-2"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            required
          />
          <input
            className="rounded p-1 md:p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded bg-gray-400 py-1 text-white hover:bg-gray-300 md:py-2"
          >
            {buttonText}
          </button>
        </form>

        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        <div className="text-center">
          <p className="mt-2 text-sm text-white md:text-base">
            Have an account?
            <Link
              className="ml-2 text-sm text-gray-300 hover:text-gray-200"
              href="/"
            >
              Sign in.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

export default Signup;
