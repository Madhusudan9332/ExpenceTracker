const loggedIn = localStorage.getItem("loggedIn");
// alert(loggedIn == "false")
if (loggedIn == "false") {
  // alert("you are not logged in")
  setTimeout(() => {
    window.location.replace("../index.html");
  }, 0);
}

import { myAi } from "./myAi.js";
async function runRandomTask(senderName, recieverName) {
  // ;
  //   // Generate a random number between 3000 and 10000

  const interval = setInterval(async () => {
    const randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    // ;
    setTimeout(async () => {
      try {
        const notificationPrompt = `create a 10-15 word notification from sender name ${senderName} to reciever name ${recieverName} and a dummy Message related to money transaction`;
        const newNotification = await myAi(notificationPrompt, "");

        console.log(newNotification);
        const allNotifications =
          JSON.parse(localStorage.getItem("allNotifications")) || {};
        const currentDate = new Date();
        const notificationId = `${currentDate.getFullYear()}${
          currentDate.getMonth() + 1
        }${currentDate.getDate()}${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getSeconds()}`;
        allNotifications[notificationId] = newNotification;
        notificationUpdate(notificationId, newNotification);

        //Set on local Storage
        localStorage.setItem(
          "allNotifications",
          JSON.stringify(allNotifications)
        );
        localStorage.setItem("newNotification", newNotification);
      } catch (error) {
        console.error("Error:", error);
      }
    }, randomDelay);
  }, 2000);
}

// Collect The loggedin user data from localstorage
function loggedInUserData(loggedInUser) {
  //
  const userData = JSON.parse(localStorage.getItem(loggedInUser));
  for (let key in userData) {
    const data = userData[key];
    if (typeof data == "object") {
      const dataJSON = JSON.stringify(data);
      localStorage.setItem(key, dataJSON);
    } else localStorage.setItem(key, data);
  }
}
const loggedInUser = localStorage.getItem("loggedInUser");
loggedInUserData(loggedInUser);

// Get reference to the iframe
const iframe = document.getElementById("pageFrame");

// Get reference to the page navigation buttons
const homePageButton = document.querySelector(".home-page");
const aiPageButton = document.querySelector(".ai-page");
const taxPageButton = document.querySelector(".tax-page");

// Add click event listeners to the page navigation buttons
homePageButton.addEventListener("click", function () {
  // Set the src attribute of the iframe to home.html
  iframe.src = "./expence_Income.html";
});

aiPageButton.addEventListener("click", function () {
  // Set the src attribute of the iframe to ai.html
  iframe.src = "./ai.html";
});

taxPageButton.addEventListener("click", function () {
  // Set the src attribute of the iframe to tax.html
  iframe.src = "./tax.html";
});

// Get references to elements
const toggleAsideButton = document.getElementById("toggleAsideButton");
const aside = document.getElementsByClassName("aside")[0];

// Add click event listener to the button
toggleAsideButton.addEventListener("click", () => {
  // Toggle the display property of the aside element
  const scm = document.getElementsByClassName("sub-container")[0];
  scm.style.marginLeft = scm.style.marginLeft == "0px" ? "20px" : "0px";
  aside.style.display = aside.style.display === "none" ? "block" : "none";
});

// --------------- NavBar ------------------------

// Set default Values in NavBar
{
  // menubar
  {
    const div = document.createElement("div");
    div.className = "menubar-container";
    const menuBar = [
      "home",
      "profile",
      "statistics",
      "highlight",
      "contact",
      "log-out",
    ];
    for (const ids of menuBar) {
      const h3 = document.createElement("h3");
      h3.id = ids;
      h3.innerText = ids.toUpperCase();
      div.appendChild(h3);
    }
    document.querySelector(".menubar").appendChild(div);
  }
  // notifications
  {
    const div = document.createElement("div");
    div.className = "notification-container";
    div.innerHTML = `
    <input type="checkbox" id="selectAll">
    <button id="delete-all">Delete All</button>
    `;
    const notifications =
      JSON.parse(localStorage.getItem("allNotifications")) || {};
    for (const keys in notifications) {
      const para = document.createElement("p");
      const span1 = document.createElement("span");
      const span = document.createElement("span");
      span.className = "delete-notification";
      para.id = keys;
      span1.innerText = notifications[keys];
      div.appendChild(para);
      para.appendChild(span1);
      para.appendChild(span);
    }
    document.querySelector(".notification").appendChild(div);
  }
  // pics
  for (let i = 1; i <= 12; i++) {
    const img = document.createElement("img");
    img.className = "img";
    img.setAttribute("src", `../assets/home/profilePics/pp${i}.png`);
    document.getElementById("profile-pics-grid").appendChild(img);
  }
}

// Set Global Variables
const profilePicImg = document.querySelector("#profile-pic-img");
const img = document.querySelectorAll(".img");
const menubarIcon = document.querySelector(".menubar").querySelector("i");
const menubarContainer = document.querySelector(".menubar-container");
const notificationIcon = document.querySelector(".notification-icon");
const notificationContainer = document.querySelector(".notification-container");
const notificationNumber = document.querySelector(".notification-number");
const profilePicsContainer = document.querySelector(".profile-pics-container");

notificationNumber.innerHTML = notificationContainer.children.length;
// Display and hide on click
{
  document.body.addEventListener("click", function (event) {
    if (
      !profilePicsContainer.contains(event.target) &&
      !profilePicImg.contains(event.target)
    ) {
      profilePicsContainer.style.display = "none";
    }
    if (
      !menubarContainer.contains(event.target) &&
      !menubarIcon.contains(event.target)
    ) {
      menubarContainer.style.display = "none";
    }
    if (
      !notificationContainer.contains(event.target) &&
      !notificationIcon.contains(event.target)
    ) {
      notificationContainer.style.display = "none";
    }
  });
  profilePicImg.addEventListener("click", () => {
    profilePicsContainer.style.display =
      profilePicsContainer.style.display == "none" ? "block" : "none";
  });
  menubarIcon.addEventListener("click", () => {
    menubarContainer.style.display =
      menubarContainer.style.display == "none" ? "block" : "none";
  });
  notificationIcon.addEventListener("click", () => {
    notificationContainer.style.display =
      notificationContainer.style.display == "none" ? "block" : "none";
  });
}

img.forEach((e) => {
  e.addEventListener("click", () => {
    img.forEach((el) => {
      el.classList.remove("highlighted");
    });
    e.classList.add("highlighted");
    document.getElementById("selected-img").src = e.src;
    document.getElementById("selected-img").style.opacity = "1";
  });
});
document.getElementById("coustom-pic").addEventListener("click", () => {
  img.forEach((el) => {
    el.classList.remove("highlighted");
  });
});
document.getElementById("profile-pic-Apply").addEventListener("click", () => {
  let coustomImg = true;
  img.forEach((el) => {
    if (el.classList.contains("highlighted")) {
      el.classList.remove("highlighted");
      const src = el.getAttribute("src");
      localStorage.setItem("profilePic", src);
    }
  });
  const base64String = localStorage.getItem("profilePic");
  document.getElementById("selected-img").src = "";
  document.getElementById("selected-img").style.opacity = "0";
  profilePicImg.src = base64String;
});
// Get the file input element
const fileInput = document.getElementById("coustom-pic");
// Add event listener for when a file is selected
fileInput.addEventListener("change", function (event) {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();

  // Define the onload event handler
  reader.onload = function (event) {
    // Store the Base64 string representation of the image in local storage
    localStorage.setItem("profilePic", event.target.result);
    document.getElementById("selected-img").src = event.target.result;
    document.getElementById("selected-img").style.opacity = "1";
  };

  // Read the selected file as a data URL (Base64 string)
  reader.readAsDataURL(selectedFile);
});
// Retrieve the Base64-encoded image data from local storage
const base64String = localStorage.getItem("profilePic");
if (base64String.length > 10) profilePicImg.src = base64String;
else {
  document.getElementById("profile-pic-img").setAttribute("src", base64String);
}
// Notifivation handle
document.querySelector("#selectAll").addEventListener("change", () => {
  const isChecked = document.querySelector("#selectAll").checked;
  const notificationItems = notificationContainer.querySelectorAll("span");
  const deleteAllButton = document.querySelector("#delete-all");
  if (isChecked) {
    notificationItems.forEach((item) => {
      item.classList.add("selected");
    });
  } else {
    notificationItems.forEach((item) => {
      item.classList.remove("selected");
    });
  }
  deleteAllButton.addEventListener("click", function () {
    if(isChecked)notificationContainer.innerHTML = "";
  });
});


notificationContainer.addEventListener("click", function (event) {
  if (event.target.className === "delete-notification") {
    event.target.parentNode.remove();
    setTimeout(() => {
      notificationContainer.style.display = "block";
    }, 0);
    notificationNumber.innerHTML = notificationContainer.children.length;
  }
});

function notificationUpdate(id, notification) {
  const para = document.createElement("p");
  const span1 = document.createElement("span");
  const span = document.createElement("span");
  para.id = id;
  span1.innerText = notification;
  div.appendChild(para);
  para.appendChild(span1);
  para.appendChild(span);
  notificationNumber.innerHTML = notificationContainer.children.length;
}

const recieverName = localStorage.getItem("username");
// runRandomTask("ExTracker", recieverName);
