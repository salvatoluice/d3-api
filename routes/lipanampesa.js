const express = require('express');
const router = express.Router();

const {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment
} = require("../controllers/lipanampesaController.js");

const { accessToken } = require("../middlewares/generateAccessToken.js");

router.post('/stkPush', accessToken, initiateSTKPush);
router.post('/stkPushCallback/:BOOKING_ID', stkPushCallback);
router.post('/confirmPayment/:CheckoutRequestID', accessToken, confirmPayment);

module.exports = router;
