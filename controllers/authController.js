const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

exports.register = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            role
        });

        // Save the user to the database
        await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: newUser._id }, jwtSecret, { expiresIn: '1h' });

        // Return the newly registered user along with the token
        res.status(201).json({ message: 'User registered successfully', user: newUser, token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Logout user
exports.logout = async (req, res) => {
    // You can implement logout logic here (e.g., clearing session data, invalidating token)
    // For stateless JWT tokens, there is no need for explicit logout
    res.status(200).json({ message: 'Logout successful' });
};
