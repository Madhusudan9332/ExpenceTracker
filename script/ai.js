const loggedIn = localStorage.getItem("loggedIn");
if (!loggedIn)
  setTimeout(() => {
    window.location.replace("../index.html");
  }, 0);

import { myAi } from "./myAi.js";

console.log(myAi(""));
document.querySelector(".btn").addEventListener("click", async () => {
  const userInput = document.querySelector("#userInput").value;
  userMessage(userInput);
  // console.log(typeof userInput);
  const prePrompts = toRememberConvertation(10);
  const responce = await myAi(userInput, prePrompts);
  // Add Current Convertations
  // debugger;
  const convertation = JSON.parse(localStorage.getItem("convertation")) || {};
  convertation[userInput] = responce;
  localStorage.setItem("convertation", JSON.stringify(convertation));
  botMessage(responce);
});

// Variables
const chatContainer = document.getElementById("chatContainer");
const newConvertation = document.getElementById("new-convertation");
const allConvertation = document.getElementById("all-convertation");
const clearConvertation = document.getElementById("clear-convertation");
newConvertation.addEventListener("click", createNewConvertation);
allConvertation.addEventListener("click", displayConvertationKeys);
clearConvertation.addEventListener("click", clearConvertationAll);

window.onload = () => {
  const data = localStorage.getItem("data");
  chatContainer.innerHTML = data;
};



function userMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "user-message";
  messageElement.textContent = message;
  chatContainer.appendChild(messageElement);
}
function botMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.className = "bot-message";
  message.replaceAll("**", "<br/>");
  messageElement.innerHTML = message;
  chatContainer.appendChild(messageElement);
}
function storeData() {
  localStorage.setItem("data", chatContainer.innerHTML);
  localStorage.setItem("convertation", JSON.stringify(convertation));
}

function createNewConvertation() {
  const allConvertation =
    JSON.parse(localStorage.getItem("allConvertation")) || {};
  let convertationKey =
    JSON.parse(localStorage.getItem("convertationKey")) || [];
  // Add your Convertations with timeStamp and the HtmlData of convertations in local storage
  const timeStamp = new Date().toString();
  const data = localStorage.getItem("data");
  const convertation = localStorage.getItem("convertation");
  allConvertation[timeStamp] = {
    data: data,
    convertation: convertation,
  };
  convertationKey.push(timeStamp); // Push the timestamp into the array

  localStorage.setItem("allConvertation", JSON.stringify(allConvertation));
  localStorage.setItem("convertationKey", JSON.stringify(convertationKey)); // Store as JSON string
  localStorage.removeItem("data");
  localStorage.removeItem("convertation");

  window.location.reload();
}

function displayConvertationKeys() {
  const convertationKey = JSON.parse(localStorage.getItem("convertationKey"));

  if (convertationKey && convertationKey.length > 0) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    convertationKey.forEach((key) => {
      const keyDiv = document.createElement("div");
      keyDiv.textContent = key;
      keyDiv.classList.add("key-item");

      keyDiv.addEventListener("click", function () {
        const allConvertation = JSON.parse(
          localStorage.getItem("allConvertation")
        );
        const selectedData = allConvertation[key].data;
        localStorage.setItem("data", selectedData);
        window.location.reload();
      });

      rowContainer.appendChild(keyDiv);
    });

    document.body.appendChild(rowContainer);
  } else {
    console.log("No convertation keys found.");
  }
}
function clearConvertationAll() {
  localStorage.removeItem("data");
  localStorage.removeItem("convertation");
  window.location.reload();
}
function toRememberConvertation(num) {
  // debugger;
  const preConvertations = localStorage.getItem("convertation");
  if (preConvertations) {
    const convertations = JSON.parse(preConvertations);
    const keysPromps = Object.keys(convertations).slice(-num).join();
    return keysPromps;
  }
  return "";
}
