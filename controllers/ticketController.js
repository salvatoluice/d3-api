const Ticket = require('../models/Ticket');

exports.createTicket = async (req, res) => {
    try {
        const { name, phone, email, message } = req.body;
        
        const ticket = new Ticket({
            name,
            phone,
            email,
            message
        });

        await ticket.save();

        res.status(201).json({ message: 'Ticket submitted successfully', ticket });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().sort({ createdAt: -1 }); 
        res.status(200).json({ tickets });
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
