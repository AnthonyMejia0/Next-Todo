"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { push } = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    });

    if (response?.error) {
      setError("User not found");
    } else {
      push("/");
    }
  };

  return (
    <main className="flex h-screen w-screen items-center justify-center bg-white text-white">
      <div className="w-[85%] rounded-md bg-gray-500 p-7 md:w-auto md:px-12 md:py-7">
        <h2 className="mb-5 text-center text-xl font-bold md:text-3xl">
          Welcome Back
        </h2>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-4 text-black"
        >
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
            type="submit"
            className="w-full rounded bg-gray-400 py-1 text-white hover:bg-gray-300 md:py-2"
          >
            Login
          </button>
        </form>

        {error && <p className="mt-2 text-center text-red-500">{error}</p>}

        <div className="text-center">
          <p className="mt-2 text-sm text-white md:text-base">
            Don`&apos;t have an account?
          </p>
          <Link
            className="ml-2 text-sm text-gray-300 hover:text-gray-200"
            href="/auth/signup"
          >
            Sign up.
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
