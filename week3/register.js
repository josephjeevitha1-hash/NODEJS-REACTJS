function validateRegister() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("address").value.trim();

    document.getElementById("nameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("addressError").innerHTML = "";

    let valid = true;

    // Name
    if (name === "") {
        document.getElementById("nameError").innerHTML = "Name is required";
        valid = false;
    }

    // Email
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        document.getElementById("emailError").innerHTML = "Email is required";
        valid = false;
    } else if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Enter a valid email";
        valid = false;
    }

    // Password
    if (password === "") {
        document.getElementById("passwordError").innerHTML = "Password is required";
        valid = false;
    } else if (password.length < 6) {
        document.getElementById("passwordError").innerHTML = "Password must be at least 6 characters";
        valid = false;
    }

    // Phone
    let phonePattern = /^[0-9]{10}$/;

    if (phone === "") {
        document.getElementById("phoneError").innerHTML = "Phone number is required";
        valid = false;
    } else if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerHTML = "Enter a valid 10-digit phone number";
        valid = false;
    }

    // Address
    if (address === "") {
        document.getElementById("addressError").innerHTML = "Address is required";
        valid = false;
    }

    if (valid) {
        alert("Registration Successful!");
    }

    return valid;
}