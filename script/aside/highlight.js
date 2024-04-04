import { myAi , formatFinancialAdvice } from "../../script/myAi.js";

console.log("this is my highlight page");
// const advice = await myAi("hello what is yorr name");
// const adviceElement = document.getElementById("financialAdvice");
// adviceElement.innerHTML = `${"user"} : ${advice}`;
const profile = JSON.parse(localStorage.getItem("profile")) || {
  name: "GaustUser",
};
const totalIncome = localStorage.getItem("total_income");
const totalExpence = localStorage.getItem("total_expence");
async function getFinancialAdvice() {
  //   alert("getFinancialAdvice function");
  //   debugger;
  const userInput =
    document.getElementById("userInput").value.trim() || " hii ";
  console.log("userInput is :", userInput);
  document.getElementById("userInput").value = "";
  const financialAdvice = `my income is ${totalIncome} and my net expence is ${totalExpence} give me some Finential Advice to create my Budget in 50-60 words`;
  const advice = await myAi(userInput, financialAdvice);
  const formattedFinancialAdvice = formatFinancialAdvice(advice);
  const adviceElement = document.getElementById("financialAdvice");
  adviceElement.innerHTML = `${profile.name} : ${formattedFinancialAdvice}`;
}
const getAdvice = document.getElementById("getAdvice");


getAdvice.addEventListener("click", () => {
  getFinancialAdvice();
});
