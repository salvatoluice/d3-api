const Discount = require('../models/Discount');
const User = require('../models/User');
const Voucher = require('../models/Voucher');

function generateVoucherCode(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

async function generateVoucher(req, res) {
    try {
        const { userId, discountId } = req.body;

        const user = await User.findById(userId);
        const discount = await Discount.findById(discountId);

        if (!user || !discount) {
            return res.status(404).json({ message: "User or discount not found." });
        }

        let voucherCode;
        let isUnique = false;
        while (!isUnique) {
            voucherCode = generateVoucherCode(8);
            const existingVoucher = await Voucher.findOne({ code: voucherCode });
            if (!existingVoucher) {
                isUnique = true;
            }
        }

        const voucher = new Voucher({
            code: voucherCode,
            user: userId,
            discount: discountId,
            used: false
        });

        await voucher.save();

        return res.status(201).json({ message: "Voucher generated successfully.", voucher });
    } catch (error) {
        console.error("Error generating voucher:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

async function getAllVouchers(req, res) {
    try {
        const vouchers = await Voucher.find();
        return res.status(200).json(vouchers);
    } catch (error) {
        console.error("Error fetching vouchers:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

async function checkVoucher(req, res) {
    try {
        const { voucherCode } = req.params;

        const voucher = await Voucher.findOne({ code: voucherCode })
            .populate({
                path: 'discount',
                select: 'name initialPrice discount priceAfterDiscount percentageDiscount expiryDate imageUrl'
            })
            .populate({
                path: 'user',
                select: 'first_name last_name email phone'
            });

        if (!voucher) {
            return res.status(404).json({ message: "Voucher not found." });
        }

        if (!voucher.used) {
            return res.status(200).json({
                message: "Voucher is valid and unused.",
                voucher: {
                    code: voucher.code,
                    discount: voucher.discount,
                    user: voucher.user
                }
            });
        } else {
            return res.status(400).json({ message: "Voucher is invalid or already used." });
        }
    } catch (error) {
        console.error("Error checking voucher:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
    generateVoucher,
    getAllVouchers,
    checkVoucher
};
