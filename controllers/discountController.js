const Discount = require('../models/Discount');
const moment = require('moment');
const BookingSlot = require('../models/BookingSlot');

const generateBookingSlots = async (discountId, startDate, expiryDate, serviceTime, startTime, endTime) => {
    const bookingSlots = [];
    let currentDate = moment(startDate);
    const endDate = moment(expiryDate);

    while (currentDate.isSameOrBefore(endDate, 'day')) {
        const startTimeMoment = moment(startTime, 'HH:mm');
        const endTimeMoment = moment(endTime, 'HH:mm');
        const serviceTimeParts = serviceTime.split(':');
        const hours = parseInt(serviceTimeParts[0]);
        const minutes = parseInt(serviceTimeParts[1]);
        let slotStartTime = startTimeMoment.format('HH:mm');

        while (startTimeMoment.add(hours, 'hours').isBefore(endTimeMoment)) {
            const slotEndTime = startTimeMoment.format('HH:mm');
            const newSlot = new BookingSlot({
                discountId,
                date: currentDate.toDate(),
                startTime: slotStartTime,
                endTime: slotEndTime,
                booked: false
            });
            await newSlot.save();
            bookingSlots.push(newSlot);
            slotStartTime = slotEndTime;
            startTimeMoment.add(minutes, 'minutes');
        }

        currentDate.add(1, 'day');
    }

    return bookingSlots;
};

exports.generateBookingSlots = async (req, res) => {
    try {
        const { discountId, startDate, expiryDate, serviceTime, startTime, endTime } = req.body;

        const bookingSlots = await generateBookingSlots(discountId, startDate, expiryDate, serviceTime, startTime, endTime);

        res.status(200).json({ bookingSlots });
    } catch (error) {
        console.error('Error generating booking slots:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getBookingSlotsByDiscountId = async (req, res) => {
    try {
        const { discountId } = req.params;

        const bookingSlots = await BookingSlot.find({ discountId });

        res.status(200).json({ bookingSlots });
    } catch (error) {
        console.error('Error retrieving booking slots for discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.createDiscount = async (req, res) => {
    try {
        const { name, initialPrice, discount, expiryDate, category, store, serviceTime, imageUrl, description, slag } = req.body;

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
            slag,
            imageUrl
        });

        await newDiscount.save();

        res.status(201).json({ newDiscount });
    } catch (error) {
        console.error('Error creating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllDiscounts = async (req, res) => {
    try {
        const discounts = await Discount.find().populate('store', 'name owner imageUrl');

        const reversedDiscounts = discounts.reverse();

        res.status(200).json({ discounts: reversedDiscounts });
    } catch (error) {
        console.error('Error retrieving discounts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getDiscountsByShop = async (req, res) => {
    try {
        const { shopId } = req.params;

        const discounts = await Discount.find({ store: shopId }).populate('store', 'name owner imageUrl');

        const reversedDiscounts = discounts.reverse();

        res.status(200).json({ discounts: reversedDiscounts });
    } catch (error) {
        console.error('Error retrieving discounts by shop:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getDiscountById = async (req, res) => {
    try {
        const discount = await Discount.findById(req.params.discountId).populate('store', 'name owner imageUrl');
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.status(200).json({ discount });
    } catch (error) {
        console.error('Error retrieving discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getBookingSlotsByDiscountId = async (req, res) => {
    try {
        const { discountId } = req.params;
        const bookingSlots = await BookingSlot.find({ discountId });

        if (!bookingSlots) {
            return res.status(404).json({ message: 'Booking slots not found for this discount' });
        }

        res.status(200).json({ bookingSlots });
    } catch (error) {
        console.error('Error retrieving booking slots for discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.updateDiscount = async (req, res) => {
    try {
        const { discountId } = req.params;
        const { name, initialPrice, discount, expiryDate, category, store, serviceTime, description, slag } = req.body;

        const updatedDiscount = await Discount.findByIdAndUpdate(discountId, {
            name,
            initialPrice,
            discount,
            expiryDate,
            category,
            store,
            description,
            slag,
            serviceTime
        }, { new: true });

        if (!updatedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }

        updatedDiscount.priceAfterDiscount = updatedDiscount.initialPrice - updatedDiscount.discount;
        updatedDiscount.percentageDiscount = (updatedDiscount.discount / updatedDiscount.initialPrice) * 100;

        await updatedDiscount.save();

        res.status(200).json({ message: 'Discount updated successfully', discount: updatedDiscount });
    } catch (error) {
        console.error('Error updating discount:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

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
