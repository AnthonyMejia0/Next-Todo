"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ListDisplay from "./components/ListDisplay";
import { RecoilRoot } from "recoil";

interface Lists {
  id: string;
  title: string;
  createdAt: Date;
  user_id: string;
}

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;
  const [lists, setLists] = useState([] as Lists[]);

  const getLists = async () => {
    console.log(user?.accessToken);
    const response = await fetch(`/api/lists/${user!.id}`, {
      headers: {
        authorization: user!.accessToken,
      },
    });

    if (response.status === 401) {
      signOut();
    } else {
      const data = await response.json();
      setLists([...data]);
    }
  };

  useEffect(() => {
    if (user) {
      getLists();
    }
  }, [user]);

  return (
    <RecoilRoot>
      <main className="">
        <NavBar getLists={getLists} />
        <div className="flex">
          <div className="hidden w-48 xl:inline">
            <SideBar lists={lists} getLists={getLists} />
          </div>
          <div className="flex-1">
            <ListDisplay getLists={getLists} />
          </div>
        </div>
      </main>
    </RecoilRoot>
  );
}
