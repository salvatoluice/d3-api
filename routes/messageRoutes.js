const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/send', messageController.sendMessage);
router.get('/chat/:userId1/:userId2', messageController.getChatMessages);

module.exports = router;
