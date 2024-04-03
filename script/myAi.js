import { GoogleGenerativeAI } from "@google/generative-ai";
const OPENAI_API_KEY = "AIzaSyDcUOkGgHU4WLaRCqMig-CQA2GY_aGvG78";
const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);

export async function myAi(userInput="",prePrompt="") {
  // debugger
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    if (!userInput) return;
    // console.log(prePrompt)
    const prompt = `${prePrompt} ${userInput}`;
    // console.log(prompt);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const botReply = text;
    return text;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

myAi()