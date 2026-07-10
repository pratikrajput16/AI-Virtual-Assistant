import axios from "axios";

const geminiResponse = async (prompt) => {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${process.env.GEMINI_API_URL}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:");
    console.error(error.response?.data || error.message);

    return "Sorry, I couldn't generate a response.";
  }
};

export default geminiResponse;
