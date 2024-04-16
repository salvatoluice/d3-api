const nodemailer = require('nodemailer');

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // Your SMTP server hostname
    port: 587, // Your SMTP server port
    secure: false, // Set to true if your SMTP server uses SSL/TLS
    auth: {
        user: 'your_username',
        pass: 'your_password'
    }
});

// Function to send email
exports.sendEmail = (req, res) => {
    const { to, subject, text } = req.body;

    // Define email options
    const mailOptions = {
        from: 'your_email@example.com',
        to: to,
        subject: subject,
        text: text
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
};
