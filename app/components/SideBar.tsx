import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { RiTodoLine } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import Modal from "./Modal";
import { useSetRecoilState } from "recoil";
import { listState } from "../atoms/listAtom";
import { signOut, useSession } from "next-auth/react";

interface List {
  id: string;
  title: string;
  createdAt: Date;
  user_id: string;
}

interface SideBarProps {
  lists: List[];
  getLists: () => Promise<void>;
  sidebarOpen: boolean;
  closeSidebar: () => void;
}

function SideBar({ lists, getLists, sidebarOpen, closeSidebar }: SideBarProps) {
  const setListInfo = useSetRecoilState(listState);
  const [currentListId, setCurrentListId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const sortedLists = lists.sort(
    (a: List, b: List) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const selectList = (id: string, title: string) => {
    const listInfo = {
      id,
      title,
    };

    setListInfo(listInfo);

    if (sidebarOpen) {
      closeSidebar();
    }
  };

  const editList = async (listName: string) => {
    console.log(currentListId);
    console.log(listName);
    if (listName !== "") {
      const response = await fetch(`api/lists/${currentListId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: session!.user.accessToken,
        },
        body: JSON.stringify({
          title: listName,
        }),
      });

      if (response.status === 401) {
        signOut();
      } else {
        getLists();
      }
    }
  };

  const openEditModal = (id: string) => {
    setCurrentListId(id);
    setIsOpen(true);
  };

  return (
    <div className="sticky left-0 h-[calc(100vh-4rem)] w-full bg-gray-400 text-black shadow-md xl:top-16">
      <Modal
        handleSubmit={editList}
        title="Let's rename this list"
        placeHolder="Write list name here"
        initialValue=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="mb-5 flex items-center bg-gray-500 py-5 pl-5 text-white">
        <RiTodoLine size={25} />
        <h3 className="ml-2 text-2xl">My Lists</h3>
      </div>
      <ul className="space-y-2 px-2 text-lg">
        {sortedLists?.map((list) => (
          <div key={list.id} className="flex items-center justify-evenly">
            <button
              onClick={() => selectList(list.id, list.title)}
              className="w-full border-b-2 border-b-transparent py-2 text-left hover:border-b-black"
            >
              <li>{list.title}</li>
            </button>
            <button
              onClick={() => openEditModal(list.id)}
              className="rounded-lg px-2 py-2 hover:bg-gray-500 hover:text-white"
            >
              <AiOutlineEdit size={18} />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
