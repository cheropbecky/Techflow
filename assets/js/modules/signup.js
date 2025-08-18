const form = document.getElementById('signup-form');
const nameInput = document.getElementById('name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');

// Validation icons and error messages
const nameCheck = document.getElementById('nameCheck');
const usernameCheck = document.getElementById('usernameCheck');
const emailCheck = document.getElementById('emailCheck');
const phoneCheck = document.getElementById('phoneCheck');

const nameError = document.getElementById('nameError');
const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');

function validateName() {
  const value = nameInput.value.trim();
  const parts = value.split(' ');
  if (parts.length >= 2 && parts.every(p => p.length > 1)) {
    showValid(nameInput, nameCheck, nameError);
    return true;
  } else {
    showError(nameInput, nameCheck, nameError, "Enter at least two names");
    return false;
  }
}

function validateUsername() {
  if (usernameInput.value.trim().length >= 3) {
    showValid(usernameInput, usernameCheck, usernameError);
    return true;
  } else {
    showError(usernameInput, usernameCheck, usernameError, "Username is required");
    return false;
  }
}

function validateEmail() {
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (emailRegex.test(emailInput.value.trim())) {
    showValid(emailInput, emailCheck, emailError);
    return true;
  } else {
    showError(emailInput, emailCheck, emailError, "Please enter a valid email");
    return false;
  }
}

function validatePhone() {
  const phoneRegex = /^254\d{9}$/;
  if (phoneRegex.test(phoneInput.value.trim())) {
    showValid(phoneInput, phoneCheck, phoneError);
    return true;
  } else {
    showError(phoneInput, phoneCheck, phoneError, "Phone must start with 254 and be 12 digits");
    return false;
  }
}

function showValid(input, icon, error) {
  icon.classList.remove('hidden');
  error.classList.add('hidden');
}

function showError(input, icon, error, message) {
  icon.classList.add('hidden');
  error.textContent = message;
  error.classList.remove('hidden');
}

nameInput.addEventListener('input', validateName);
usernameInput.addEventListener('input', validateUsername);
emailInput.addEventListener('input', validateEmail);
phoneInput.addEventListener('input', validatePhone);

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const isNameValid = validateName();
  const isUsernameValid = validateUsername();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();

  if (isNameValid && isUsernameValid && isEmailValid && isPhoneValid) {
    const user = {
      name: nameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value.trim(),
      password: document.getElementById('password').value
    };
    // Get existing users array from localStorage or create a new one
    let users = JSON.parse(localStorage.getItem('users')) || [];
    // Add a new user
    users.push(user);
    //save back to localstorage
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful!');
    window.location.href = 'index.html';
  }
});

// Toggle password visibility
window.togglePassword = function (id) {
  const input = document.getElementById(id);
  input.type = input.type === 'password' ? 'text' : 'password';
};

// Password strength checker
document.getElementById('password').addEventListener('input', function () {
  const value = this.value;
  const strengthText = document.getElementById('passwordStrength');

  if (value.length < 6) {
    strengthText.textContent = 'Password strength: Too short';
    strengthText.className = 'text-red-400 text-sm';
  } else if (value.length < 10) {
    strengthText.textContent = 'Password strength: Medium';
    strengthText.className = 'text-yellow-400 text-sm';
  } else {
    strengthText.textContent = 'Password strength: Strong';
    strengthText.className = 'text-green-400 text-sm';
  }

  checkPasswordMatch(); // also check match when typing
});

// Confirm password match checker
function checkPasswordMatch() {
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const matchText = document.getElementById('passwordMatch');

  if (confirmPassword.length === 0) {
    matchText.textContent = '';
    return;
  }

  if (password === confirmPassword) {
    matchText.textContent = '✅Passwords match';
    matchText.className = 'text-green-400 text-sm';
  } else {
    matchText.textContent = '❌ Passwords do not match';
    matchText.className = 'text-red-400 text-sm';
  }
}

document.getElementById('confirmPassword').addEventListener('input', checkPasswordMatch);
