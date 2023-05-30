"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ListDisplay from "./components/ListDisplay";
import { RecoilRoot } from "recoil";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";

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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getLists = async () => {
    const response = await fetch(`/api/lists/${user!.id}`, {
      headers: {
        authorization: user!.accessToken,
      },
    });

    if (response.status === 401) {
      signOut();
    } else {
      const data = await response.json();

      if (!data) {
        setLists([]);
      } else {
        setLists([...data]);
      }
    }
  };

  const openSidebar = () => {
    let sidebar = document.getElementById("mobileSidebar");

    if (sidebar) {
      sidebar.classList.toggle("active");
    }

    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    let sidebar = document.getElementById("mobileSidebar");

    if (sidebar) {
      sidebar.classList.toggle("active");
    }

    setSidebarOpen(false);
  };

  useEffect(() => {
    if (user) {
      getLists();
    }
  }, [user]);

  return (
    <RecoilRoot>
      <main>
        <NavBar getLists={getLists} />

        {/* Desktop View */}
        <div className="hidden xl:flex">
          <div className="w-48">
            <SideBar
              lists={lists}
              getLists={getLists}
              sidebarOpen={sidebarOpen}
              closeSidebar={closeSidebar}
            />
          </div>
          <div className="flex-1">
            <ListDisplay getLists={getLists} />
          </div>
        </div>

        {/* Mobile View */}
        <div className="relative z-0 xl:hidden">
          <div className="fixed left-0 top-16">
            <div className="flex items-start">
              <div
                id="mobileSidebar"
                className="overflow-hidden shadow-md transition-all duration-300 ease-in-out"
              >
                <SideBar
                  lists={lists}
                  getLists={getLists}
                  sidebarOpen={sidebarOpen}
                  closeSidebar={closeSidebar}
                />
              </div>

              {sidebarOpen ? (
                <button
                  onClick={closeSidebar}
                  className="animate-pulse p-2 duration-150"
                >
                  <AiOutlineDoubleLeft size={30} />
                </button>
              ) : (
                <button
                  onClick={openSidebar}
                  className="animate-pulse p-2 duration-150"
                >
                  <AiOutlineDoubleRight size={30} />
                </button>
              )}
            </div>
          </div>

          <div className="min-h-[calc(100vh-4rem)] bg-gray-300">
            <ListDisplay getLists={getLists} />
          </div>
        </div>
      </main>
    </RecoilRoot>
  );
}
