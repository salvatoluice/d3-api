// middleware/apiKeyMiddleware.js
const API_KEY = process.env.API_KEY; // Load API key from environment variable

const apiKeyMiddleware = (req, res, next) => {
    const providedApiKey = req.headers['x-api-key']; // Extract API key from request headers

    if (!providedApiKey || providedApiKey !== API_KEY) {
        return res.status(401).json({ message: 'You are not authorized to access this page.' });
    }

    // If API key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = apiKeyMiddleware;
