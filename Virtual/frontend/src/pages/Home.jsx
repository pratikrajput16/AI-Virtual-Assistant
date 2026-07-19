import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData, serverUrl, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      setUserData(null);
      navigate("/signin");
    } catch (error) {
      setUserData(null);
      console.log(error);
    }
  };

  

  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#02023d] flex justify-center items-center flex-col gap-3.75">
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px] absolute top-5 right-5 cursor-pointer"
        onClick={handleLogout}
      >
        Log Out
      </button>
      <button
        className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full text-[19px] absolute top-25 right-5 px-5 py-2.5 cursor-pointer"
        onClick={() => navigate("/customize")}
      >
        Customize your Assistant
      </button>

      <div className="w-75 h-100 flex justify-center items-center overflow-hidden rounded-4xl shadow-lg">
        <img
          src="{userData?.assistantImage}"
          alt=""
          className="h-full object-cover"
        />
      </div>
      <h1 className="text-white text-4.5 font-semibold">
        I'm {userData?.assistantName}
      </h1>
    </div>
  );
};

export default Home;
