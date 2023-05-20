// import { useRecoilValue, useResetRecoilState } from "recoil";
// import { listState } from "../atoms/listAtom";
import { useEffect, useRef, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
// import Todo from "./Todo";
import Modal from "./Modal";
import DeleteModal from "./DeleteModal";
import { useRecoilValue } from "recoil";
import { listState } from "../atoms/listAtom";

interface Todo {
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
  // const resetList = useResetRecoilState(listState);
  // const [incompleteTodos, setIncompleteTodos] = useState([] as Todo[]);
  // const [completeTodos, setCompleteTodos] = useState([] as Todo[]);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const getTodos = async () => {
    // const response = await fetch(
    //   `/todos/${list.id}`,
    //   {
    //     credentials: "include",
    //   }
    // );
    // const json = await response.json();
    // const sortedTodos = json.sort(
    //   (a: Todo, b: Todo) => a.createdAt > b.createdAt
    // );
    // setIncompleteTodos(sortedTodos.filter((todo: Todo) => !todo.completed));
    // setCompleteTodos(sortedTodos.filter((todo: Todo) => todo.completed));
  };

  const createNewTodo = async (newTodo: string) => {
    // if (newTodo !== "") {
    //   await fetch(`${import.meta.env.VITE_BASE_URL}/todos/${list.id}`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ title: newTodo }),
    //     credentials: "include",
    //   });
    //   getTodos();
    // }
  };

  const deleteList = async () => {
    // await fetch(`${import.meta.env.VITE_BASE_URL}/lists/${list.id}`, {
    //   method: "DELETE",
    //   credentials: "include",
    // });
    // deleteListRef.current.close();
    // resetList();
    // getLists();
  };

  // useEffect(() => {
  //   if (list.id) {
  //     getTodos();
  //   }
  // }, [list]);

  return (
    <div className="overflow-hidden bg-gray-300 px-7 py-10 xl:px-16 xl:py-10">
      <Modal
        handleSubmit={createNewTodo}
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
        <h1 className="text-4xl">
          {!list.title ? "Create a list to get started" : list.title}
        </h1>
        {/* Todo -- Edit/Delete list */}
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
              {/* {incompleteTodos?.map((todo) => (
                <li key={todo.id}>
                  <Todo todo={todo} getTodos={getTodos} />
                </li>
              ))} */}
            </ul>
          </div>
          <div className="xl:col-span-3 xl:col-start-5">
            <h3 className="pt-1 text-2xl">Done</h3>
            <ul>
              {/* {completeTodos?.map((todo) => (
                <li key={todo.id}>
                  <Todo todo={todo} getTodos={getTodos} />
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListDisplay;
