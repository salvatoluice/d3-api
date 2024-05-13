const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const socketIo = require('./socket');

const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const discountRoutes = require('./routes/discountRoutes');
const followerRoutes = require('./routes/followerRoute');
const reviewRoutes = require('./routes/reviewRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const lipanampesa = require('./routes/lipanampesa');
const searchRoutes = require('./routes/searchRoutes');
const voucherRoutes = require('./routes/voucherRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const emailRoutes = require('./routes/emailRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());

const io = socketIo.init(server);
 
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

mongoose.connect('mongodb+srv://salvatoluice5:pa9o2XYROyhlT1fc@cluster0.decb1ui.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('chat message', (msg) => {
        console.log('Message received: ' + msg);
        io.emit('chat message', msg);
    });

});

app.use('/api/v1/users', authRoutes);
app.use('/api/v1/cloudinary', uploadRoutes);
app.use('/api/v1/stores', storeRoutes);
app.use('/api/v1/discounts', discountRoutes);
app.use('/api/v1/followers', followerRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/payments', lipanampesa);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/vouchers', voucherRoutes);
app.use('/api/v1/tickets', ticketRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/v1/mesasges', messageRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(``);
});