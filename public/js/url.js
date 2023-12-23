// Adding a click event listener to the button with the id 'shortenBtn'
document.getElementById('shortenBtn').addEventListener('click', async () => {
    // Retrieving values from input fields
    const originalUrl = document.getElementById('originalUrl').value;
    const urlName = document.getElementById('urlName').value;

    // Validating the original URL
    if (!originalUrl || !isValidUrl(originalUrl)) {
        alert('Please enter a valid URL');
        return;
    }

    try {
        // Making a POST request to the "/url/shorten" endpoint with originalUrl and urlName data
        const response = await fetch('/url/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl, urlName })
        });

        // Parsing the JSON response
        const data = await response.json();

        // Displaying the shortened URL on the page
        document.getElementById('result').textContent = `Shortened URL : ${window.location.origin}/${data.shortUrl}`;
    } catch (err) {
        console.error('Error shortening the URL : ', err);
        alert('Error shortening the URL, PLEASE TRY AGAIN');
    }
});

// Function to check if a string is a valid URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}
