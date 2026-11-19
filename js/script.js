
// Login Form
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let errorMessage = document.getElementById("errorMessage");

        // Check admin account
        if (username === "admin" && password === "12345") {

            sessionStorage.setItem("isLoggedIn", "true");
            window.location.href = "index.html";

        } else {

            // Check registered account
            let savedUser = JSON.parse(localStorage.getItem("userAccount"));

            if (savedUser &&
                username === savedUser.username &&
                password === savedUser.password) {

                sessionStorage.setItem("isLoggedIn", "true");
                window.location.href = "index.html";

            } else {

                errorMessage.textContent =
                    "Invalid username or password. Please try again.";

            }
        }

    });

}


// Register Form
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let fullName = document.getElementById("fullName").value;
        let username = document.getElementById("newUsername").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("newPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        let message = document.getElementById("registerMessage");

        // Check password
        if (password !== confirmPassword) {

            message.style.color = "red";
            message.textContent = "Password does not match!";

            return;
        }

        // Check username
        if (username.toLowerCase() === "admin") {

            message.style.color = "red";
            message.textContent = "This username is already reserved.";

            return;
        }

        // Save account information
        let userAccount = {
            fullName: fullName,
            username: username,
            email: email,
            password: password
        };

        localStorage.setItem("userAccount", JSON.stringify(userAccount));

        message.style.color = "green";
        message.textContent = "Registration successful!";

        // Return to login page
        setTimeout(function() {
            window.location.href = "login.html";
        }, 1500);

    });

}


// Show and Hide Password
const togglePassword = document.getElementById("togglePassword");

if (togglePassword) {

    togglePassword.addEventListener("click", function() {

        const passwordInput = document.getElementById("password");

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            togglePassword.classList.replace(
                "bi-eye", "bi-eye-slash"
            );

        } else {

            passwordInput.type = "password";

            togglePassword.classList.replace(
                "bi-eye-slash", "bi-eye"
            );

        }

    });

}
