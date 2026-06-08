const baseUrl = "http://localhost:3000";

let registerForm = document.getElementById("registerForm");
let fullName = document.getElementById("fullName");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let terms = document.getElementById("terms");
let togglePassword = document.getElementById("togglePassword");
let toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

const registerUser = (e) => {
  e.preventDefault();
  let fullNameValue = fullName.value;
  let emailValue = email.value;
  let passwordValue = password.value;
  let confirmPasswordValue = confirmPassword.value;

  if (passwordValue !== confirmPasswordValue) {
    alert("Passwords do not match!");
    return;
  }

  if (!terms.checked) {
    alert("Please agree to the terms and privacy policy.");
    return;
  }

  const newUser = {
    fullName: fullNameValue,
    email: emailValue,
    password: passwordValue,
  };
  fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  })
    .then((response) => response.json())
    .then(() => {
      localStorage.setItem("loggedUser", JSON.stringify(newUser));
      alert("Registration successful!");
      window.location.href = "dashboard.html";
    });
};
registerForm.addEventListener("submit", registerUser);

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

toggleConfirmPassword.addEventListener("click", () => {
  if (confirmPassword.type === "password") {
    confirmPassword.type = "text";
    toggleConfirmPassword.classList.remove("fa-eye");
    toggleConfirmPassword.classList.add("fa-eye-slash");
  } else {
    confirmPassword.type = "password";
    toggleConfirmPassword.classList.remove("fa-eye-slash");
    toggleConfirmPassword.classList.add("fa-eye");
  }
});
