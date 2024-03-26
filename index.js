const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const uploadRoutes = require('./routes/uploadRoutes');
const authRoutes = require('./routes/authRoutes');
const storeRoutes = require('./routes/storeRoutes');
const discountRoutes = require('./routes/discountRoutes');
const followerRoutes = require('./routes/followerRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(flash());


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

app.use('/api/v1/users', authRoutes);
app.use('/api/v1/cloudinary', uploadRoutes);
app.use('/api/v1/stores', storeRoutes);
app.use('/api/v1/discounts', discountRoutes);
app.use('/api/v1/followers', followerRoutes);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});