const loggedIn = localStorage.getItem("loggedIn");
if (!loggedIn) window.location.assign("../index.html");

// debugger

// Function to collect data from the form and save it in localStorage
function saveFormData(formId) {
  // debugger
  // Get the form element by its ID
  const form = document.querySelector(`#${formId}`);
  // Create an empty object to store form data
  const formData = {};
  const formElements = form.querySelectorAll("input, textarea");
  // Loop through each form element
  formElements.forEach((element) => {
    formData[element.id] = element.value;
  });
  const currentDate = new Date();
  const transactionId = `${currentDate.getFullYear()}${
    currentDate.getMonth() + 1
  }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;

  let allTransaction = {};
  const preTransaction = localStorage.getItem(
    formId === "income-form" ? "incomeData" : "expenceData"
  );
  if (preTransaction) allTransaction = JSON.parse(preTransaction);
  allTransaction[transactionId.toString()] = formData;
  // Convert formData object to JSON string
  const allTransactionJSON = JSON.stringify(allTransaction);
  // Save formDataJSON in localStorage
  localStorage.setItem(
    formId === "income-form" ? "incomeData" : "expenceData",
    allTransactionJSON
  );
}

// Function to store totalAmount
let currency = "&#8377;";
const selectElement = document.getElementById("currency");
selectElement.addEventListener("change", function () {
  debugger;
  currency = selectElement.value;
  totalAmount("incomeData");
  totalAmount("expenceData");
  document
    .querySelector(".balance-info")
    .querySelector("span").innerHTML = `${currency} ${
    localStorage.getItem("total_income") - localStorage.getItem("total_expence")
  }`;
});
function totalAmount(objectKey) {
  // debugger
  let totalAmount = 0;
  const typeIs = objectKey == "incomeData" ? "income" : "expence";

  let objData = localStorage.getItem(objectKey);
  if (objData) {
    objData = JSON.parse(objData);
    for (key in objData) {
      const name = `${typeIs}-amount`;
      const amount = Number(objData[key][name]);
      totalAmount += amount;
    }
  }
  // debugger
  const amountSet = document
    .querySelector(`#total-${typeIs}`)
    .querySelector("span");
  amountSet.innerHTML = `${currency} ${totalAmount}`;
  localStorage.setItem(`total_${typeIs}`, totalAmount);
}
totalAmount("incomeData");
totalAmount("expenceData");
document
  .querySelector(".balance-info")
  .querySelector("span").innerHTML = `${currency} ${
  localStorage.getItem("total_income") - localStorage.getItem("total_expence")
}`;

// Event listener for form submission
document.querySelector("#income-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form submission
  saveFormData("income-form"); // Call saveFormData function with income form ID
  totalAmount("incomeData");
  return true;
});

document
  .querySelector("#expence-form")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission
    saveFormData("expence-form"); // Call saveFormData function with expence form ID
    totalAmount("expenceData");
    return true;
  });

function auto_grow(e) {
  // e.style.height = "";
  // e.style.height = e.scrollHeight + "px";
}
const incomeForm = document.getElementById("income-form");
const expenceForm = document.getElementById("expence-form");
const incomePage = document.getElementById("income-page");
const expencePage = document.getElementById("expence-page");

function handleNavigationClick(
  activePage,
  activeForm,
  inactivePage,
  inactiveForm
) {
  // Highlight the active page button
  activePage.classList.add("active");
  inactivePage.classList.remove("active");

  // Show the active form and hide the inactive one
  activeForm.classList.add("show");
  inactiveForm.classList.remove("show");

  activeForm.classList.remove("hide");
  inactiveForm.classList.add("hide");
}

// Event listeners for navigation clicks
incomePage.addEventListener("click", () => {
  handleNavigationClick(incomePage, incomeForm, expencePage, expenceForm);
});

expencePage.addEventListener("click", () => {
  handleNavigationClick(expencePage, expenceForm, incomePage, incomeForm);
});

// const dateInput = document.getElementById("date");
// const calIcon = document.querySelector(".cal-icon");
