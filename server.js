const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Your existing valid codes
const validCodes = new Set([
    '111222333444',
    '222333444555', 
    '333444555666',
    '444555666777',
    '555666777888',
    '666777888999',
    '777888999000',
    '888999000111'
]);

// Function to get image URL for a product code
function getImageUrlForCode(code) {
    // Map specific codes to specific images
    const codeToImageMap = {
        '111222333444': '/images/1.jpg',
        '222333444555': '/images/2.jpg',
        '333444555666': '/images/3.jpg',
        '444555666777': '/images/4.jpg',
        '555666777888': '/images/5.jpg',
        '666777888999': '/images/6.jpg',
        '777888999000': '/images/7.jpg',
        '888999000111': '/images/8.jpg'
    };
    
    return codeToImageMap[code] || null;
}

// Generate a random valid code for QR codes
function getRandomValidCode() {
    const codes = Array.from(validCodes);
    const randomIndex = Math.floor(Math.random() * codes.length);
    return codes[randomIndex];
}

// API endpoint to get a random code for QR generation
app.get('/api/random-code', (req, res) => {
    const randomCode = getRandomValidCode();
    // Get the base URL dynamically
    const baseUrl = req.protocol + '://' + req.get('host');
    res.json({ 
        code: randomCode,
        url: `${baseUrl}/GS26/QR?c=${randomCode}`
    });
});

// API endpoint to verify product codes
app.post('/api/verify', (req, res) => {
    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ 
            success: false, 
            message: 'No code provided' 
        });
    }
    
    if (validCodes.has(code)) {
        const imageUrl = getImageUrlForCode(code);
        res.json({
            success: true,
            product: {
                code: code,
                imageUrl: imageUrl,
                name: 'GAT Sport Product',
                description: 'Authentic GAT Sport supplement'
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Invalid product code'
        });
    }
});

// Handle the new URL structure: /GS26/QR?c=CODE
app.get('/GS26/QR', (req, res) => {
    const code = req.query.c;
    if (code) {
        // Redirect to main page with the code parameter
        res.redirect(`/?c=${code}`);
    } else {
        // If no code provided, redirect to main page
        res.redirect('/');
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Access your site at: http://localhost:${PORT}`);
    console.log(`QR Code URL format: http://localhost:${PORT}/GS26/QR?c=CODE`);
});
