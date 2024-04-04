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
const forgotPassword = document.getElementById("forgotpassword-form");
const resetPassword = document.getElementById("resetpassword-form");
const signInform = document.getElementById("sign-in-form");
const signUpform = document.getElementById("sign-up-form");
const forgotPasswordform = document.getElementById("forgot-password-form");

// to submit forms
let tempMail = "";
let tempData = {};
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
forgotPassword.addEventListener("submit", () => {
  const form = document.getElementById("forgotpassword-form");
  const email = form.elements["email"].value;

  // Check user is already exist or not
  tempMail = email;
  tempData = JSON.parse(localStorage.getItem(email)) || {};
  if (tempData) {
    localStorage.setItem("loggedIn",true);
    forgotPassword.style.display = "none";
    resetPassword.style.display = "block";
  } else {
    alert("User is not Registered Please Check your email!");
  }
});
resetPassword.addEventListener("submit", () => {
  const form = document.getElementById("resetpassword-form");

  const resPassword = form.elements["reset-password"].value;
  const confPassword = form.elements["confirm-password"].value;

  if (resPassword == confPassword) {
    tempData["password"] = resPassword;
    localStorage.setItem(tempMail,JSON.stringify(tempData));
    alert("Password Changed Successfully")
    window.location.replace("../index.html");
  } else {
    alert("Confirm password correctly!");
  }
});
// to display,hide or change forms
signInform.addEventListener("click", () => {
  signIn.style.display = "block";
  signUp.style.display = "none";
});
signUpform.addEventListener("click", () => {
  signIn.style.display = "none";
  signUp.style.display = "block";
});
forgotPasswordform.addEventListener("click", () => {
  signIn.style.display = "none";
  forgotPassword.style.display = "block";
});
