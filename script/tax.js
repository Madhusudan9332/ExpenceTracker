const loggedIn = localStorage.getItem("loggedIn");
if (!loggedIn)
  setTimeout(() => {
    window.location.replace("../index.html");
  }, 0);

let taxIncome = 0;
window.onload = function () {
  const netIncomeValue = document.getElementById("netIncomeValue");
  const addIncomeButton = document.getElementById("addIncomeButton");
  const modal = document.getElementById("myModal");
  const submitExtraIncomeBtn = document.getElementById("submitExtraIncome");

  // Retrieve net income from local storage
  let netIncome = parseFloat(localStorage.getItem("total_income")) || 0;
  netIncomeValue.textContent = `₹${netIncome.toFixed(2)}`;

  // Add event listener to the "Add more income amount" button
  addIncomeButton.addEventListener("click", function () {
    modal.style.display = "flex"; // Display the modal
  });

  // Add event listener to the "Submit" button inside the modal
  submitExtraIncomeBtn.addEventListener("click", function () {
    const extraIncome = parseFloat(
      document.getElementById("extraIncome").value
    );
    if (!isNaN(extraIncome)) {
      netIncome += extraIncome;
      localStorage.setItem("netIncome", netIncome);
      netIncomeValue.textContent = `₹${netIncome.toFixed(2)}`;
      modal.style.display = "none"; // Hide the modal
      document.getElementById("extraIncome").value = undefined;
    } else {
      alert("Please enter a valid number.");
    }
    //   alert(taxIncome)
  });

  document.getElementById("calculateTaxBtn").addEventListener("click", () => {
    // debugger
    let tax = 0;

    // Your tax calculation logic here
    // This is just a sample calculation, you should replace it with your actual tax calculation logic
    if (netIncome <= 250000) {
      tax = 0;
    } else if (netIncome <= 500000) {
      tax = (netIncome - 250000) * 0.05;
    } else if (netIncome <= 1000000) {
      tax = (netIncome - 500000) * 0.2 + 12500; // 12500 is the tax for income between 250001 to 500000
    } else {
      tax = (netIncome - 1000000) * 0.3 + 112500; // 112500 is the tax for income above 1000000
    }

    // Display the tax result
    const taxResultElement = document.getElementById("taxResult");
    taxResultElement.textContent = `Your tax amount is: ₹${tax.toFixed(2)}`;
  });
};
