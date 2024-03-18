// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRoles) => async (req, res, next) => {
    try {
        // Get the JWT token from the request headers
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Missing authorization token' });
        }

        // Verify the JWT token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        // Retrieve the user from the db
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Check if the user has one of the required roles
        if (!requiredRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        // Attach the user object to the request for further use
        req.user = user;

        // If authentication and authorization passed, proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error authenticating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = authMiddleware;
