let loggedIn = false;
localStorage.setItem("loggedIn", loggedIn);
// import { storeData } from "./myAi.js";

function storeData(objectKey, dataKeys) {
  // debugger;
  let objectData = {};
  const preObjcetData = localStorage.getItem(objectKey);
  if (preObjcetData) objectData = JSON.parse(preObjcetData);
  for (let key of dataKeys) {
    const preData = localStorage.getItem(key);
    if (preData) {
      if (typeof preData == "object") objectData[key] = JSON.parse(preData);
      else objectData[key] = preData;
    }
    localStorage.removeItem(key);
  }
  const objectDataJSON = JSON.stringify(objectData);
  localStorage.setItem(objectKey, objectDataJSON);
}
const loggedInUser = localStorage.getItem("loggedInUser");
const dataKeys = [
  "username",
  "password",
  "profilePic",
  "expenceData",
  "incomeData",
  "total_expence",
  "total_income",
  "convertationKey",
  "allConvertation",
  "allNotifications",
  "convertation",
  "data",
];
storeData(loggedInUser, dataKeys);
localStorage.setItem("loggedInUser", null);

//   let users = new Object();
const signUp = document.getElementById("signup-form");
const signIn = document.getElementById("signin-form");
const signInform = document.getElementById("sign-in-form");
const signUpform = document.getElementById("sign-up-form");

signUp.addEventListener("submit", () => {
  // debugger;
  const form = document.getElementById("signup-form");
  const username = form.elements["username"].value;
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;

  // Check user is already exist or not
  const exist = Boolean(localStorage.getItem(email));
  if (!exist) {
    const obj = {
      username: username,
      //   Email: email,
      password: password,
    };
    const jsonObj = JSON.stringify(obj);
    localStorage.setItem(email, jsonObj);
  } else {
    alert("User is already exists please try with another email!");
  }
});

signIn.addEventListener("submit", () => {
  const form = document.getElementById("signin-form");
  const email = form.elements["email"].value;
  const password = form.elements["password"].value;

  // Check user is already exist or not
  const exist = Boolean(localStorage.getItem(email));
  if (exist) {
    const data = JSON.parse(localStorage.getItem(email));
    if (password == data.password) {
      alert("Login Successfully");
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("loggedInUser", email);
      setTimeout(() => {
        window.location.replace("./templates/home.html");
      }, 0);
    } else {
      alert("Password is incorrect");
    }
  } else {
    alert("User is not Registered Please Check your email!");
  }
});

signInform.addEventListener("click", () => {
  signIn.style.display = "block";
  signUp.style.display = "none";
});
signUpform.addEventListener("click", () => {
  signIn.style.display = "none";
  signUp.style.display = "block";
});
