// Importing the crypto module for generating random bytes
const crypto = require('crypto');


// Class for generating short URLs
class UrlShortener {
    // Method to generate a short URL using random bytes
    static generateShortUrl() {
        return crypto.randomBytes(6).toString('hex');
    }
}
// Exporting the UrlShortener class for use in other modules
module.exports = UrlShortener;