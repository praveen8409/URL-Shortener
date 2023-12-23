// Selecting form and error elements from the DOM
const form = document.querySelector('form');
const nameError = document.querySelector('.name-error');
const emailError = document.querySelector('.email-error');
const passwordError = document.querySelector('.password-error');

// Adding an event listener to the form for form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Preventing the default form submission behavior
    nameError.textContent = ''; // Clearing any previous name error messages
    emailError.textContent = ''; // Clearing any previous email error messages
    passwordError.textContent = ''; // Clearing any previous password error messages

    // Extracting name, email, and password values from the form
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
        // Making a POST request to the "signup" endpoint with name, email, and password data
        const res = await fetch("signup", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Parsing the JSON response
        const data = await res.json();
        console.log(data);

        // Handling errors from the server
        if (data.errors) {
            nameError.textContent = data.errors.name;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            console.log(nameError.textContent);
            console.log(emailError.textContent);
            console.log(passwordError.textContent);
        } else {
            location.assign('/login'); // Redirecting to the login page if signup is successful
        }

    } catch (error) {
        console.log(error);
    }
});
