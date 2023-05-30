"use client";

import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import Modal from "./Modal";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useSetRecoilState } from "recoil";
import { listState } from "../atoms/listAtom";

interface NavProps {
  getLists: () => Promise<void>;
}

function NavBar({ getLists }: NavProps) {
  const { data: session } = useSession();
  const user = session?.user;
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const setList = useSetRecoilState(listState);

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

      const data = await response.json();

      const listInfo = {
        id: data.id,
        title: data.title,
      };

      setList(listInfo);
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex h-16 w-full items-center justify-between bg-gray-200 px-5 py-3 shadow-md">
      <Modal
        handleSubmit={createNewList}
        title="Let's create a new list"
        placeHolder="Write list name here"
        initialValue=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <p className="md:text-xl">
        Welcome <span className="">{user?.name}</span>
      </p>
      <div className="hidden space-x-2 md:inline-block">
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

      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
        {menuOpen ? <IoMdClose size={28} /> : <AiOutlineMenu size={28} />}
      </button>

      {menuOpen && (
        <div className="absolute right-4 top-[calc(100%+1rem)] flex flex-col space-y-2 rounded-md bg-gray-200 p-4 shadow-md">
          <button
            onClick={() => {
              setIsOpen(true);
              setMenuOpen(false);
            }}
            className="bg-white px-3 py-1 font-medium text-black hover:bg-gray-300"
          >
            New List
          </button>
          <button
            onClick={() => signOut()}
            className="bg-gray-500 px-3 py-1 font-medium text-white hover:bg-gray-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
