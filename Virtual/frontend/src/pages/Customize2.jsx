import React, { useContext, useState } from "react";
import { userDataContext } from "../context/userContext";

const Customize2 = () => {
  const { userData } = useContext(userDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.AssistantName || "",
  );
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5">
      <h1 className="text-white text-[30px] mb-7.5 text-center">
        Enter Your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg: jarvis"
        className="w-full h-15 outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-5 py-2.5 rounded-full text-[18px] max-w-150"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      />
      {assistantName && (
        <button
          className="min-w-75 h-15 mt-7.5 text-black font-semibold bg-white rounded-full cursor-pointer text-[19px]"
          onClick={() => navigate("/customize2")}
        >
          Create Your Assistant
        </button>
      )}
    </div>
  );
};

export default Customize2;
