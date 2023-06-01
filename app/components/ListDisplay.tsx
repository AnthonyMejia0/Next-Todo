import { useCallback, useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { listState } from "../atoms/listAtom";
import { signOut, useSession } from "next-auth/react";
import Task from "./Task";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  list_id: string;
}

interface ListProps {
  getLists: () => Promise<void>;
}

function ListDisplay({ getLists }: ListProps) {
  const list = useRecoilValue(listState);
  const resetList = useResetRecoilState(listState);
  const [incompleteTasks, setIncompleteTasks] = useState([] as Task[]);
  const [completeTasks, setCompleteTasks] = useState([] as Task[]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const { data: session } = useSession();

  const getTasks = useCallback(async () => {
    const response = await fetch(`api/tasks/${list.id}`, {
      headers: {
        authorization: session!.user.accessToken,
      },
    });

    if (response.status === 401) {
      signOut();
    }

    const json = await response.json();

    const sortedTasks = json.sort(
      (a: Task, b: Task) => a.createdAt > b.createdAt
    );

    setIncompleteTasks(sortedTasks.filter((todo: Task) => !todo.completed));
    setCompleteTasks(sortedTasks.filter((todo: Task) => todo.completed));
  }, [list, session]);

  const createNewTask = async (newTask: string) => {
    if (newTask !== "") {
      const response = await fetch(`api/tasks/${list.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: session!.user.accessToken,
        },
        body: JSON.stringify({ title: newTask }),
      });

      if (response.status === 401) {
        signOut();
      }

      getTasks();
    }
  };

  const deleteList = async () => {
    const response = await fetch(`api/lists/${list.id}`, {
      method: "DELETE",
      headers: {
        authorization: session!.user.accessToken,
      },
    });

    if (response.status === 401) {
      signOut();
    } else {
      resetList();
      getLists();
    }
  };

  useEffect(() => {
    if (list.id) {
      getTasks();
    }
  }, [list, getTasks]);

  return (
    <div className="h-full overflow-hidden bg-gray-300 px-7 py-16 xl:px-16 xl:py-10">
      <Modal
        handleSubmit={createNewTask}
        title="Let's create a task"
        placeHolder="Write a task here"
        initialValue=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <DeleteModal
        handleSubmit={deleteList}
        title="Delete List?"
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
      />

      <div className="mb-10 flex items-baseline space-x-5">
        <h1 className="text-xl font-semibold md:text-2xl xl:text-4xl">
          {!list.title ? "Select a list to get started" : list.title}
        </h1>

        {list.title && (
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="hover:text-red-700"
          >
            <FaRegTrashAlt size={24} />
          </button>
        )}
      </div>

      {list.id && (
        <div className="h-full w-full xl:grid xl:grid-cols-7">
          <div className="mb-12 xl:col-span-3 xl:mb-0">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl">To Do</h3>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-md bg-gray-200 px-3 py-2 hover:bg-gray-400"
              >
                Add Task +
              </button>
            </div>
            <ul className="">
              {incompleteTasks?.map((task) => (
                <li key={task.id}>
                  <Task task={task} getTasks={getTasks} />
                </li>
              ))}
            </ul>
          </div>
          <div className="xl:col-span-3 xl:col-start-5">
            <h3 className="pt-1 text-2xl">Done</h3>
            <ul>
              {completeTasks?.map((task) => (
                <li key={task.id}>
                  <Task task={task} getTasks={getTasks} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListDisplay;
