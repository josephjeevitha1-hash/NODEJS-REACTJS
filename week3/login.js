function validateLogin() {

    // Get input values
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    // Error message elements
    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    // Clear previous errors
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    let valid = true;

    // Email validation
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        emailError.innerHTML = "Email is required";
        valid = false;
    }
    else if (!emailPattern.test(email)) {
        emailError.innerHTML = "Enter a valid email";
        valid = false;
    }

    // Password validation
    if (password === "") {
        passwordError.innerHTML = "Password is required";
        valid = false;
    }
    else if (password.length < 6) {
        passwordError.innerHTML = "Password must be at least 6 characters";
        valid = false;
    }

    // If validation is successful
    if (valid) {
        alert("Login Successful!");
    }

    return valid;
}