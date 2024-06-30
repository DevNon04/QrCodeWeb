var express = require('express');
var router = express.Router();
const qr = require('qrcode');
const {createCanvas, loadImage} = require('canvas');
const fetch = require('node-fetch');
const qrCache = new Map();
const validUrl = require('valid-url');
/* GET home page. */
// router.get('/', function (req, res, next) {
//     res.render('index', {title: 'Express'});
// });

router.get('/generate-qr-code-canvas', async (req, res) => {
    const url = req.query.url;
    if (!url || !validUrl.isUri(url)) {
        return res.status(400).send('Invalid URL');
    }

    try {
        const qrData = await Promise.all([
            generateQRDataColorRadiusSize(url, "#ffffff"),
        ]);

        res.json(qrData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to generate QR code');
    }
});
async function generateQRDataColorRadiusSize(url, backgroundColor) {
    try {
        const sizes = [150, 300, 500]; // Kích thước cho 3 kích thước khác nhau
        const qrDataArray = [];
        const qrOptions = {
            errorCorrectionLevel: 'H',
            margin: 1,
            color: {
                dark: '#000000', // Màu của mã QR
                light: '#FFFFFF00' // Màu nền trong suốt cho mã QR
            }
        };

        for (const size of sizes) {
            const qrCanvas = createCanvas(size, size); // Tạo canvas cho mã QR
            await qr.toCanvas(qrCanvas, url, qrOptions);

            const finalCanvasSize = size + 10;
            const finalCanvas = createCanvas(finalCanvasSize, finalCanvasSize); // Tạo canvas cho mã QR với nền màu và border radius
            const ctx = finalCanvas.getContext('2d');

            // Thiết lập màu nền và border radius
            drawRoundedRectangle(ctx, 0, 0, finalCanvasSize, finalCanvasSize, 8, backgroundColor);

            const qrSize = size * 0.9; // Mã QR chiếm 90% chiều rộng của canvas
            const qrX = (finalCanvas.width - qrSize) / 2;
            const qrY = (finalCanvas.height - qrSize) / 2;

            ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

            const base64String = finalCanvas.toDataURL('image/png').split(',')[1]; // Chuyển canvas thành base64
            qrDataArray.push({ base64String });
        }

        return qrDataArray;
    } catch (error) {
        console.error('Lỗi tạo dữ liệu QR:', error);
        throw error;
    }
}

function drawRoundedRectangle(ctx, x, y, width, height, radius, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
}

module.exports = router;
