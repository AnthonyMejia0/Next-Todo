"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Modal from "./Modal";

interface NavProps {
  getLists: () => Promise<void>;
}

function NavBar({ getLists }: NavProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);

  const createNewList = async (value: string) => {
    const response = await fetch(`/api/lists/${user?.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: user!.accessToken,
      },
      body: JSON.stringify({
        title: value,
      }),
    });

    if (response.status === 401) {
      signOut();
    } else if (response.ok) {
      getLists();
    }
  };

  return (
    <nav className="sticky top-0 flex h-16 w-full items-center justify-between bg-gray-400 px-5 py-3 shadow-md">
      <Modal
        handleSubmit={createNewList}
        title="Let's create a new list"
        placeHolder="Write list name here"
        initialValue=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <p className="text-xl">
        Welcome <span className="hidden xl:inline-block">{user?.name}</span>
      </p>
      <div className="space-x-2">
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full bg-white px-3 py-1 font-medium text-black hover:bg-gray-300"
        >
          New List
        </button>
        <button
          onClick={() => signOut()}
          className="rounded-full bg-gray-500 px-3 py-1 font-medium text-white hover:bg-gray-600"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default NavBar;
