const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
    try {
        const { sender, recipient, content } = req.body;
        const message = new Message({ sender, recipient, content });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
