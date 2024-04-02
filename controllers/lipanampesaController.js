const request = require("request");
const ngrok = require('ngrok');
const { getTimestamp } = require("../utils/timestamp.js");
const Booking = require('../models/Booking.js');

const initiateSTKPush = async (req, res) => {
    try {
        const { amount, phone } = req.body;
        const BOOKING_ID = '660bad548e212dd3f78a1f90';
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
        const auth = "Bearer " + req.safaricom_access_token;

        const timestamp = getTimestamp();
        const password = new Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64')
        const callback_url = await ngrok.connect(4000);
        const api = ngrok.getApi();
        await api.listTunnels();

        console.log("callback ", callback_url);
        request({
            url: url,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                "Timestamp": timestamp,
                "TransactionType": "CustomerPayBillOnline",
                "Amount": '1',
                "PartyA": '254113794219',
                "PartyB": process.env.BUSINESS_SHORT_CODE,
                "Password": password,
                "PhoneNumber": '254113794219',
                "CallBackURL": `${callback_url}/api/stkPushCallback/${BOOKING_ID}`,
                "AccountReference": "D-THREE COUPON SHOP",
                "TransactionDesc": "Paid online"
            }
        }, function (e, response, body) {
            if (e) {
                console.error(e);
                res.status(503).send({
                    message: "Error with the stk push",
                    error: e
                });
            } else {
                res.status(200).json(body);
            }
        });
    } catch (e) {
        console.error("Error while trying to create LipaNaMpesa details", e);
        res.status(503).send({
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        });
    }
};

const stkPushCallback = async (req, res) => {
    try {
        const BOOKING_ID = '660bad548e212dd3f78a1f90'; // Replace with the actual booking ID
        const {
            MerchantRequestID,
            CheckoutRequestID,
            ResultCode,
            ResultDesc,
            CallbackMetadata
        } = req.body.Body.stkCallback;

        const meta = Object.values(await CallbackMetadata.Item);
        const PhoneNumber = meta.find(o => o.Name === 'PhoneNumber').Value.toString();
        const Amount = meta.find(o => o.Name === 'Amount').Value.toString();
        const MpesaReceiptNumber = meta.find(o => o.Name === 'MpesaReceiptNumber').Value.toString();
        const TransactionDate = meta.find(o => o.Name === 'TransactionDate').Value.toString();

        console.log("-".repeat(20), " OUTPUT IN THE CALLBACK ", "-".repeat(20));
        console.log(`
            BOOKING_ID : ${BOOKING_ID},
            MerchantRequestID : ${MerchantRequestID},
            CheckoutRequestID: ${CheckoutRequestID},
            ResultCode: ${ResultCode},
            ResultDesc: ${ResultDesc},
            PhoneNumber : ${PhoneNumber},
            Amount: ${Amount}, 
            MpesaReceiptNumber: ${MpesaReceiptNumber},
            TransactionDate : ${TransactionDate}
        `);

        // Update the booking status to paid
        await Booking.findByIdAndUpdate(BOOKING_ID, { paid: true });

        res.json(true);
    } catch (e) {
        console.error("Error while trying to update LipaNaMpesa details from the callback", e);
        res.status(503).send({
            message: "Something went wrong with the callback",
            error: e.message
        });
    }
};

const confirmPayment = async (req, res) => {
    try {
        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";
        const auth = "Bearer " + req.safaricom_access_token;

        const timestamp = getTimestamp();
        const password = Buffer.from(process.env.BUSINESS_SHORT_CODE + process.env.PASS_KEY + timestamp).toString('base64');

        request({
            url: url,
            method: "POST",
            headers: {
                "Authorization": auth
            },
            json: {
                "BusinessShortCode": process.env.BUSINESS_SHORT_CODE,
                "Password": password,
                "Timestamp": timestamp,
                "CheckoutRequestID": req.params.CheckoutRequestID
            }
        }, function (error, response, body) {
            if (error) {
                console.log(error);
                res.status(503).send({
                    message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
                    error: error
                });
            } else {
                res.status(200).json(body);
            }
        });
    } catch (e) {
        console.error("Error while trying to create LipaNaMpesa details", e);
        res.status(503).send({
            message: "Something went wrong while trying to create LipaNaMpesa details. Contact admin",
            error: e
        });
    }
};

module.exports = {
    initiateSTKPush,
    stkPushCallback,
    confirmPayment
};
