import React from "react";
import Hoogi from "./Hoogi";

export default function PostModal({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const moveToBack = () => {
    setModal(false);
  };
  return (
    <section
      className="w-screen h-screen z-1 fixed top-0 left-0 Class
    Properties
     flex justify-center items-center"
      style={{ background: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="w-[800px] h-[500px] bg-purple-400 flex flex-col items-end">
        <button onClick={moveToBack} className="text-2xl">
          ✖️
        </button>
        <Hoogi setModal={setModal} />
      </div>
    </section>
  );
}
