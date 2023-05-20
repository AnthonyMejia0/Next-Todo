import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface DialogProps {
  handleSubmit: (value: string) => Promise<void>;
  title: string;
  placeHolder: string;
  initialValue: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function Modal({
  handleSubmit,
  title,
  placeHolder,
  initialValue,
  isOpen,
  setIsOpen,
}: DialogProps) {
  const [input, setInput] = useState(initialValue);
  const dialogRef: any = useRef();

  const closeModal = () => {
    dialogRef.current.close();
    setIsOpen(false);
  };

  const submitAndClear = () => {
    handleSubmit(input);
    setInput("");
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  return (
    <dialog
      data-modal
      className="w-[85vw] rounded-lg p-8 md:w-[50vw] xl:w-[35vw]"
      ref={dialogRef}
    >
      <div className="flex items-center justify-between">
        <p className="text-xl">{title}</p>
        <button
          onClick={closeModal}
          className="rounded-sm px-2 hover:bg-gray-200"
        >
          X
        </button>
      </div>
      <form method="dialog" onSubmit={submitAndClear}>
        <input
          id="inputField"
          className="my-5 h-10 w-full rounded-lg border-2 border-gray-200 px-5"
          type="text"
          placeholder={placeHolder}
          autoFocus
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          autoComplete="off"
          required
        />
        <button
          type="submit"
          className="w-full rounded-lg bg-gray-300 py-2 hover:bg-gray-200"
        >
          Submit
        </button>
      </form>
    </dialog>
  );
}

export default Modal;
