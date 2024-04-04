const loggedIn = localStorage.getItem("loggedIn");
if (!loggedIn)
  setTimeout(() => {
    window.location.replace("../index.html");
  }, 0);

let taxIncome = 0;

window.onload = function () {
  var tax = 0;
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

    tax = 0;
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
    console.log(tax, "inner");
    const taxResultElement = document.getElementById("taxResult");
    taxResultElement.textContent = `Your tax amount is: ₹${tax.toFixed(2)}`;

    var options = {
      key: "rzp_test_tfFO1ehDKKilpi", // Enter the Key ID generated from the Dashboard
      amount: `${tax * 100}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      // "order_id": "order_9A33XWu170gUtm", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: "Gaurav Kumar", //your customer's name
        email: "gaurav.kumar@example.com",
        contact: "9000090000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new Razorpay(options);
    document.getElementById("payNow").onclick = function (e) {
      if(tax == 0){
        alert("You can't make Payment your TAX is Nill.")
        return
      }
      rzp1.open();
      e.preventDefault();
    };
  });
};
