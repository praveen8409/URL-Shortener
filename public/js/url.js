document.getElementById('shortenBtn').addEventListener('click', async () => {
    const originalUrl = document.getElementById('originalUrl').value;
    const urlName = document.getElementById('urlName').value;
    if (!originalUrl || !isValidUrl(originalUrl)) {
        alert('Please enter a valid URL');
        return;
    }
    try {
        const response = await fetch('/url/shorten', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ originalUrl, urlName })
        });
        const data = await response.json();
        document.getElementById('result').textContent = `Shortened URL : ${window.location.origin}/${data.shortUrl}`;
    } catch (err) {
        console.error('Error shortening the URL : ', err);
        alert('Error shortening the URL , PLEASE TRY AGAIN');
    }

});
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}