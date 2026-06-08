console.log("Dashboard JS loaded");

const baseUrl = "http://localhost:3000";
let overlay = document.getElementById("overlay");

let burgerMenu = document.getElementById("burgerMenu");
let sideMenu = document.getElementById("sideMenu");
let profileDropdown = document.getElementById("dropdown");
let logoutBtn = document.getElementById("logoutBtn");
let switchAccount = document.getElementById("switchAccount");
let welcomeUser = document.getElementById("welcomeUser");
let dashboardWelcome = document.getElementById("dashboardWelcome");
let userInfo = document.getElementById("userInfo");

let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  window.location.href = "login.html";
} else {
  welcomeUser.textContent = `Welcome, ${loggedUser.fullName}`;
  dashboardWelcome.textContent = `Welcome back, ${loggedUser.fullName} 👋`;
}

burgerMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("open");
  overlay.classList.toggle("active");
});
overlay.addEventListener("click", () => {
  sideMenu.classList.remove("open");
  overlay.classList.remove("active");
});

userInfo.addEventListener("click", (e) => {
  e.stopPropagation();
  profileDropdown.classList.toggle("active");
});

logoutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

switchAccount.addEventListener("click", (e) => {
  e.stopPropagation();
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});
