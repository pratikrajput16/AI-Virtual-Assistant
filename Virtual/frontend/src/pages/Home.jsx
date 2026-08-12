import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData, serverUrl, setUserData, getGeminiResponse } =
    useContext(userDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.SpeechSynthesis;

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

  const startRecognition = () => {
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch (error) {
      if (!error.message.includes("start")) {
        console.log("Recognition error:", error);
      }
    }
  };

  const speak = (text) => {
    const utterence = new SpeechSynthesisUtterance(text);

    utterence.lang = "hi-IN";
    const voices=window.speechSynthesis.getVoices()
    const hindiVoice = voices.find((v) => v.lang === "hi-IN");
    if (hindiVoice) {
      utterence.voice = hindiVoice;
    }

    isSpeakingRef.current = true;
    utterence.onend = () => {
      isSpeakingRef.current = false;
      startRecognition();
    };
    synth.speak(utterence);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === "google-search") {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, "_blank");
    }

    if (type === "calculator-open") {
      window.open(`https://www.google.com/search?q=calculator`, "_blank");
    }

    if (type === "instagram-open") {
      window.open(`https://www.instagram.com/`, "_blank");
    }

    if (type === "facebook-open") {
      window.open(`https://www.facebook.com/`, "_blank");
    }

    if (type === "weather-show") {
      window.open(`https://www.google.com/search?q=weather`, "_blank");
    }

    if (type === "youtube-search" || type === "youtube-play") {
      const query = encodeURIComponent(userInput);
      window.open(
        `https://www.youtube.com/results?search_query=${query}`,
        "_blank",
      );
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    ((recognition.continous = true), (recognition.lang = "en-US"));

    recognitionRef.current = recognition;

    const isRecognizingRef = { current: false };

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        } catch (error) {
          if (error.name !== "InvalidStateError") {
            console.error("Start error:", err);
          }
        }
      }
    };

    recognition.onstart = () => {
      console.log("Recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);

      if (event.error !== "aborted" && !isSpeakingRef.current) {
        setTimeout(() => {
          safeRecognition();
        }, 1000);
      }
    };

    recognition.onresult = async (e) => {
      const trasnscript = e.results[e.results.length - 1][0].trasnscript.trim();
      console.log("heard: " + trasnscript);

      if (
        trasnscript.toLowerCase().includes(userData.assistantName.toLowerCase())
      ) {
        recognition.stop();
        isRecognizingRef.current = false;
        setListening(false);
        const data = await getGeminiResponse(trasnscript);

        handleCommand(data);
      }
    };
    const fallback = setInterval(() => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        safeRecognition();
      }
    }, 10000);
    safeRecognition();
    return () => {
      recognition.stop();
      setListening(false);
      isRecognizingRef.current = false;
      clearInterval(fallback);
    };
  }, []);

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
