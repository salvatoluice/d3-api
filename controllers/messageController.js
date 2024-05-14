// message.controller.js
const Message = require('../models/Message');
const io = require('../socket');
const { encryptMessage, decryptMessage } = require('../utils/encryption');

exports.sendMessage = async (req, res) => {
    try {
        const { sender, recipient, content } = req.body;
        
        const encryptedContent = encryptMessage(content, recipientPublicKey);

        const message = new Message({ sender, recipient, content: encryptedContent });
        await message.save();

        io.to(recipient).emit('message', message); 

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getChatMessages = async (req, res) => {
    try {
        const { userId1, userId2 } = req.params;
        // Query messages where either sender or recipient matches the provided user IDs
        const messages = await Message.find({ $or: [{ sender: userId1, recipient: userId2 }, { sender: userId2, recipient: userId1 }] });
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};