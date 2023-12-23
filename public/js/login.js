// Selecting form and error elements from the DOM
const form = document.querySelector('form');
const emailError = document.querySelector('.email-error');
const passwordError = document.querySelector('.password-error');

// Adding an event listener to the form for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    emailError.textContent = ''; // Clearing any previous email error messages
    passwordError.textContent = ''; // Clearing any previous password error messages

    // Extracting email and password values from the form
    const email = form.email.value;
    const password = form.password.value;

    try {
        // Making a POST request to the "login" endpoint with email and password data
        const res = await fetch("login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Parsing the JSON response
        const data = await res.json();
        console.log(data);

        // Handling errors from the server
        if (data.errors) {
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            console.log(emailError.textContent);
            console.log(passwordError.textContent);
        }
        // Redirecting to the "/url" page if login is successful
        if (data.user) {
            location.assign('/url');
        }

    } catch (error) {
        console.log(error);
    }
})