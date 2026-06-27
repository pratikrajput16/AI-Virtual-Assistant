import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/authBg.png";
import image7 from "../assets/image7.jpeg";
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import { MdKeyboardBackspace } from "react-icons/md"

const Customize = () => {
  const {
    serverUrl,
    userData,
    setUserData,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext);

  const navigate=useNavigate()

  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };
  return (
    <div className="w-full h-screen bg-linear-to-t from-[black] to-[#030353] flex justify-center items-center flex-col p-5">
      <MdKeyboardBackspace className="cursor-pointer absolute top-7.5 left-7.5 text-white w-6.25 h-6.25" onClick={()=>navigate("/")}/>
      <h1 className="text-white text-[30px] mb-7.5 text-center">
        Select your <span className="text-blue-200">Assistant Image</span>
      </h1>
      <div className="w-full max-w-225 flex justify-center items-center flex-wrap gap-3.75">
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image3} />
        <Card image={image7} />

        <div
          className={`w-17.5 h-35 lg:w-37.5 lg:h-62.5 overflow-hidden bg-[#020220] border-2 border-[#0000ff66] rounded-2xl hover:shadow-2xl hover:shadow-blue-950 cursor-pointer flex items-center justify-center hover:border-4 hover:border-white ${selectedImage == "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : null}`}
          onClick={() => {
            inputImage.current.click();
            setSelectedImage("input");
          }}
        >
          {!frontendImage && (
            <RiImageAddLine className="text-white w-6.25 h-6.25" />
          )}
          {frontendImage && (
            <img src={frontendImage} className="h-full object-cover" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          hidden
          ref={inputImage}
          onChange={handleImage}
        />
      </div>
      {selectedImage && (
        <button className="min-w-37.5 h-15 mt-7.5 text-black font-semibold bg-white rounded-full cursor-pointer text-[19px]" onClick={()=>navigate("/customize2")}>
          Next
        </button>
      )}
    </div>
  );
};

export default Customize;
