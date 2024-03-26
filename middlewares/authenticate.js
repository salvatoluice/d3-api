const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Add user information to the request object
        req.user = decoded;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
