const express = require('express');
const { createCanvas } = require('canvas');
const QRCode = require('qrcode');
const router = express.Router();
const Joi = require('joi');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const validUrl = require("valid-url");
const qr = require("qrcode");


router.post('/generate-qr-phone', (req, res) => {
    const phone = req.body.phone;

    const options = {
        width: 300, // Set the width to 300 pixels
        margin: 2   // Optional: set margin (default is 4)
    };

    QRCode.toDataURL(phone, options, (err, url) => {
        if (err) {
            res.status(500).json({ error: 'Error generating QR Code' });
        } else {
            res.json({ url });
        }
    });
});


module.exports = router;
