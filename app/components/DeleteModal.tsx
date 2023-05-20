import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface DeleteModalProps {
  handleSubmit: () => Promise<void>;
  title: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteModal({
  handleSubmit,
  title,
  isOpen,
  setIsOpen,
}: DeleteModalProps) {
  const deleteListRef: any = useRef();

  const closeModal = () => {
    deleteListRef.current.close();
    setIsOpen(false);
  };

  const submitAndClear = () => {
    handleSubmit();
    deleteListRef.current.close();
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      deleteListRef.current.showModal();
    }
  }, [isOpen]);

  return (
    <dialog
      data-modal
      className="w-[85vw] rounded-lg p-8 md:w-[50vw] xl:w-[35vw]"
      ref={deleteListRef}
    >
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xl">{title}</p>
        <button
          onClick={closeModal}
          className="rounded-sm px-2 hover:bg-gray-200"
        >
          X
        </button>
      </div>
      <div className="flex items-center justify-between space-x-10">
        <button
          onClick={closeModal}
          className="w-full rounded-lg bg-gray-300 py-2 hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={submitAndClear}
          className="w-full rounded-lg bg-red-400 py-2 hover:bg-gray-200"
        >
          Delete
        </button>
      </div>
    </dialog>
  );
}

export default DeleteModal;
