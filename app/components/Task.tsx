import { FiDelete } from "react-icons/fi";
import { BiEdit } from "react-icons/bi";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { useRef, useState } from "react";
import Modal from "./Modal";
import { signOut, useSession } from "next-auth/react";

interface TaskItem {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskProps {
  task: TaskItem;
  getTasks: () => Promise<void>;
}

function Task({ task, getTasks }: TaskProps) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleCompleted = async () => {
    const response = await fetch(`api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: session!.user.accessToken,
      },
      body: JSON.stringify({
        title: task.title,
        completed: !task.completed,
      }),
    });

    if (response.status === 401) {
      signOut();
    }

    getTasks();
  };

  const editTask = async (updatedTask: string) => {
    const response = await fetch(`api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: session!.user.accessToken,
      },
      body: JSON.stringify({
        title: updatedTask,
        completed: task.completed,
      }),
    });

    if (response.status === 401) {
      signOut();
    }

    getTasks();
  };

  const deleteTask = async () => {
    const response = await fetch(`api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        authorization: session!.user.accessToken,
      },
    });

    if (response.status === 401) {
      signOut();
    }

    getTasks();
  };

  return (
    <div className="my-5 flex w-full items-center justify-between rounded-2xl bg-gray-400 p-5 text-sm xl:text-base">
      <Modal
        handleSubmit={editTask}
        placeHolder="Write new task here"
        title="Let's edit this task"
        initialValue={task.title}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex items-center space-x-5">
        <button className="rounded hover:bg-gray-300" onClick={toggleCompleted}>
          {task.completed ? (
            <ImCheckboxChecked size={24} />
          ) : (
            <ImCheckboxUnchecked size={24} />
          )}
        </button>
        <p
          className={`${
            task.completed ? "line-through decoration-[1.5px]" : ""
          }`}
        >
          {task.title}
        </p>
      </div>
      <div className="flex items-center space-x-5">
        <button onClick={() => setIsOpen(true)} className="hover:text-gray-700">
          <BiEdit size={28} />
        </button>
        <button onClick={deleteTask} className="hover:text-red-700">
          <FiDelete size={28} />
        </button>
      </div>
    </div>
  );
}

export default Task;
