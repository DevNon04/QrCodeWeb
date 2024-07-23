const express = require('express');
const { createCanvas } = require('canvas');
const QRCode = require('qrcode');
const router = express.Router();


router.post('/generate-qr-text', (req, res) => {
    const text = req.body.text;

    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            res.status(500).json({ error: 'Error generating QR Code' });
        } else {
            res.json({ url });
        }
    });
});


module.exports = router;
