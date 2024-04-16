const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/submit', ticketController.createTicket);
router.get('/', ticketController.getAllTickets);

module.exports = router;
