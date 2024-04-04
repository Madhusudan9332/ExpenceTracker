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

export function storeData(objectKey, dataKeys) {
  // debugger;
  let objectData = {};
  const preObjcetData = localStorage.getItem(objectKey);
  if (preObjcetData) objectData = JSON.parse(preObjcetData);
  for (let key of dataKeys) {
    const preData = localStorage.getItem(key);
    if (preData) {
      if(typeof(preData)=="object")objectData[key] = JSON.parse(preData);
      else objectData[key] = preData;
    }
    localStorage.removeItem(key);
  }
  const objectDataJSON = JSON.stringify(objectData);
  localStorage.setItem(objectKey, objectDataJSON);
} 
export function formatFinancialAdvice(advice) {
  console.log("advice:", advice);
  if (!advice) {
    console.log("empty advice string");
    return "";
  }
  const adviceWithStrong = advice.replace(
    /\*\*(.*?)\*\*/g,
    "<strong>$1</strong>"
  );
  const adviceWithBreaks = adviceWithStrong.replace(/\*/g, '<br />');
  const stringWithCodeTags = adviceWithBreaks.replace(/```(.*?)```/g, '<code>$1</code>');
  console.log(stringWithCodeTags)
  return stringWithCodeTags;
}

// myAi()