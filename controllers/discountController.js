// controllers/discountController.js
const Discount = require('../models/Discount');

// Create a new discount
exports.createDiscount = async (req, res) => {
    try {
        const { name, initialPrice, discount, expiryDate, category, store, serviceTime } = req.body;

        // Calculate price after discount
        const priceAfterDiscount = initialPrice - discount;

        // Calculate percentage discount
        const percentageDiscount = (discount / initialPrice) * 100;

        // Create the discount
        const newDiscount = new Discount({
            name,
            initialPrice,
            discount,
            priceAfterDiscount,
            percentageDiscount,
            expiryDate,
            category,
            store,
            serviceTime
        });

        // Save the discount to the database
        await newDiscount.save();

        res.status(201).json({ message: 'Discount created successfully', discount: newDiscount });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
