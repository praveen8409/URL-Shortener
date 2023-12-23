// Importing required modules
const Url = require('../models/urlModel');
const UrlShortener = require('../utills/urlShortener');

// UrlController class containing methods to handle URL shortening, redirection, and fetching all URLs

class UrlController {

    static async shortenUrl(req, res) {
        // Method to shorten a given URL
        const userId = res.locals.user._id;
        try {
            const { urlName, originalUrl } = req.body;
            console.log(urlName, originalUrl);
            if (!originalUrl)
                return res.status(400).json({ message: "URL is required" });
            //check if the url is already shortened
            let url = await Url.findOne({ originalUrl });
            if (url) {
                return res.json(url);
            }
            //generate a short url
            const shortUrl = UrlShortener.generateShortUrl();
            //save to the database
            url = new Url({
                urlName, originalUrl, shortUrl, user: userId
            });
            await url.save();
            res.json(url);
        } catch (err) {
            res.status(500).json({ message: 'Sever error : ' + err.message });
        }
    }
     // Method to redirect to the original URL using the short URL
    static async redirectToOriginalUrl(req, res) {
        try {
            const { shortUrl } = req.params;
            const url = await Url.findOne({ shortUrl: shortUrl });
            if (!url) {
                return res.status(404).send('URL NOT FOUND');
            }
            //increase the count
            url.clicks += 1;
            await url.save();
            res.redirect(url.originalUrl);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }
 // Method to fetch all URLs for a specific user
    static async getAllUrls(req, res) {
        try {
            const userId = res.locals.user._id;
             // Fetch all URLs for the user from the database
            const urls = await Url.find({ user: userId }
            ).sort({ createdAt: -1 });
            console.log(urls);
             // Append the protocol and host to the short URLs
            urls.forEach(url => {
                url.shortUrl = `${req.protocol}://${req.get('host')}/${url.shortUrl}`;
            });
             // Render the 'urlList' view with the URLs
            return res.render('urlList', { urls });
        } catch (err) {
            console.error(err);
            res.status(500).send('Server Error');
        }
    }


}
// Exporting the UrlController class
module.exports = UrlController;