const baseUrl = "http://localhost:3000";

let loginForm = document.getElementById("loginForm");
let email = document.getElementById("email");
let password = document.getElementById("password");
let togglePassword = document.getElementById("togglePassword");

const loginUser = (e) => {
  e.preventDefault();

  let emailValue = email.value;
  let passwordValue = password.value;

  fetch(`${baseUrl}/users?email=${emailValue}&password=${passwordValue}`)
    .then((response) => response.json())
    .then((users) => {
      if (users.length > 0) {
        localStorage.setItem("loggedUser", JSON.stringify(users[0]));

        alert("Login successful!");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid email or password!");
      }
    });
};

loginForm.addEventListener("submit", loginUser);

togglePassword.addEventListener("click", () => {
  if (password.type === "password") {
    password.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});
