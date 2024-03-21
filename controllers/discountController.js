const Discount = require('../models/Discount');
const Store = require('../models/Store'); 

exports.createDiscount = async (req, res) => {
    try {
        const { name, initialPrice, discount, expiryDate, category, store, serviceTime, imageUrl, description } = req.body;

        const priceAfterDiscount = initialPrice - discount;

        const percentageDiscount = (discount / initialPrice) * 100;

        const newDiscount = new Discount({
            name,
            initialPrice,
            discount,
            priceAfterDiscount,
            percentageDiscount,
            expiryDate,
            category,
            store,
            serviceTime,
            description,
            imageUrl
        });

        await newDiscount.save();

        res.status(201).json({ newDiscount });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all discounts
exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find();
        res.status(200).json({ discounts });
    } catch (error) {
        console.error('Error retrieving discounts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getDiscountsByShop = async (req, res) => {
    try {
        // Extract shop ID from request parameters
        const { shopId } = req.params;

        // Retrieve discounts belonging to the specified shop from the database
        const discounts = await Discount.find({ store: shopId }).populate('store', 'name owner');

        // Respond with the discounts belonging to the specified shop
        res.status(200).json({ discounts });
    } catch (error) {
        console.error('Error retrieving discounts by shop:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single discount by ID
exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.discountId);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.status(200).json({ discount });
    } catch (error) {
        console.error('Error retrieving discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a discount by ID
exports.updateDiscount = async (req, res) => {
    try {
        const { discountId } = req.params;
        const { name, initialPrice, discount, expiryDate, category, store, serviceTime } = req.body;

        const updatedDiscount = await Discount.findByIdAndUpdate(discountId, {
            name,
            initialPrice,
            discount,
            expiryDate,
            category,
            store,
            serviceTime
        }, { new: true });

        if (!updatedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        // Recalculate price after discount and percentage discount
        updatedDiscount.priceAfterDiscount = updatedDiscount.initialPrice - updatedDiscount.discount;
        updatedDiscount.percentageDiscount = (updatedDiscount.discount / updatedDiscount.initialPrice) * 100;

        await updatedDiscount.save();

        res.status(200).json({ message: 'Discount updated successfully', discount: updatedDiscount });
    } catch (error) {
        console.error('Error updating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a discount by ID
exports.deleteDiscount = async (req, res) => {
    try {
        const { discountId } = req.params;

        const deletedDiscount = await Discount.findByIdAndDelete(discountId);
        if (!deletedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.status(200).json({ message: 'Discount deleted successfully' });
    } catch (error) {
        console.error('Error deleting discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
