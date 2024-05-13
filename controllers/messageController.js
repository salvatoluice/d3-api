// message.controller.js
const Message = require('../models/Message');
const io = require('../socket');
const { encryptMessage, decryptMessage } = require('../utils/encryption');

exports.sendMessage = async (req, res) => {
    try {
        const { sender, recipient, content } = req.body;
        
        // Encrypt the message content using recipient's public key
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


