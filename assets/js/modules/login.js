// Toggle password visibility
const togglePasswordBtn = document.getElementById("togglePasswordBtn");
const passwordInput = document.getElementById("loginPassword");

togglePasswordBtn.addEventListener("click", () => {
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

//Form Elements
const loginForm = document.getElementById("login-form");
const identifierInput = document.getElementById("loginIdentifier");
const identifierCheck = document.getElementById("identifierCheck");
const identifierError = document.getElementById("identifierError");


loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const identifier = identifierInput.value.trim();
  const password = passwordInput.value;

  // Simple validation
  if (!identifier) {
    showError(identifierInput, identifierCheck, identifierError, "Please enter username or email");
    return;
  } else {
    hideError(identifierInput, identifierCheck, identifierError);
  }

  if (!password) {
    alert("Please enter your password");
    return;
  }

  // ----- Simulated User Database -----
  const users = JSON.parse(localStorage.getItem("users")) || [];

  // Find user by username or email
  const user = users.find(u => u.username === identifier || u.email === identifier);

  if (!user) {
    showError(identifierInput, identifierCheck, identifierError, "User not found");
    return;
  }

  if (user.password !== password) {
    alert("Incorrect password!");
    return;
  }

  alert(`Welcome back, ${user.username}!`);
  // Redirect to homepage
  window.location.href = "index.html";
});

//Helper Functions
function showError(input, checkIcon, errorMsg, message) {
  checkIcon.classList.add("hidden");
  errorMsg.textContent = message;
  errorMsg.classList.remove("hidden");
  input.classList.add("border-red-500");
}

function hideError(input, checkIcon, errorMsg) {
  checkIcon.classList.remove("hidden");
  errorMsg.classList.add("hidden");
  input.classList.remove("border-red-500");
}

// Optional: Hide icon when typing
identifierInput.addEventListener("input", () => {
  hideError(identifierInput, identifierCheck, identifierError);
});
