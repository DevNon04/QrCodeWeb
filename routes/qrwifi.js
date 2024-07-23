const express = require('express');
const QRCode = require('qrcode');
const router = express.Router();

router.post('/generate-qr-wifi', (req, res) => {
    const { ssid, password, encryption } = req.body;

    if (!ssid || !password || !encryption) {
        return res.status(400).json({ error: 'SSID, password, and encryption type are required' });
    }

    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${password};;`;

    const options = {
        width: 300, // Set the width to 300 pixels
        margin: 2   // Optional: set margin (default is 4)
    };

    QRCode.toDataURL(wifiString, options, (err, url) => {
        if (err) {
            res.status(500).json({ error: 'Error generating QR Code' });
        } else {
            res.json({ url });
        }
    });
});

module.exports = router;
