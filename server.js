const express = require('express');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// In-memory storage for demo purposes (use database in production)
const products = new Map();

// Static guilloche images available under public/images
const imageFiles = [
  '1.jpg','2.jpg','3.jpg','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg'
];

function getImageUrlForCode(code) {
  if (!imageFiles.length) return null;
  // Use sha256 for stable, well-distributed mapping across images
  const hex = crypto.createHash('sha256').update(String(code)).digest('hex');
  const num = parseInt(hex.slice(0, 8), 16); // 32-bit segment
  const index = num % imageFiles.length;
  return `/images/${imageFiles[index]}`;
}
const validCodes = new Set([
  '267365954593',
  '123456789012',
  '987654321098',
  '555666777888',
  '111222333444'
]);

// Generate some sample products
validCodes.forEach(code => {
  products.set(code, {
    id: code,
    name: 'Premium Protein Supplement',
    brand: 'GAT Sport',
    isAuthentic: true,
    imageUrl: getImageUrlForCode(code)
  });
});

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Friendly QR endpoints → redirect to UI with query params
app.get('/verify/:code', (req, res) => {
  const code = encodeURIComponent(req.params.code || '');
  return res.redirect(`/?c=${code}`);
});

// Auto-verify variant
app.get('/verify/:code/auto', (req, res) => {
  const code = encodeURIComponent(req.params.code || '');
  return res.redirect(`/?c=${code}&auto=1`);
});

// Short aliases
app.get('/v/:code', (req, res) => {
  const code = encodeURIComponent(req.params.code || '');
  return res.redirect(`/?c=${code}`);
});
app.get('/a/:code', (req, res) => {
  const code = encodeURIComponent(req.params.code || '');
  return res.redirect(`/?c=${code}&auto=1`);
});

// API endpoint to verify product
app.post('/api/verify', (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.json({ 
      success: false, 
      message: 'Please provide a product code' 
    });
  }

  const product = products.get(code);
  
  if (product && product.isAuthentic) {
    // Always (re)compute imageUrl to be safe and send a plain JSON object
    const imageUrl = product.imageUrl || getImageUrlForCode(code);
    res.json({
      success: true,
      product: {
        id: product.id,
        name: product.name,
        brand: product.brand,
        isAuthentic: product.isAuthentic,
        imageUrl
      },
      message: 'Product verified successfully'
    });
  } else {
    res.json({
      success: false,
      message: 'Invalid product code or counterfeit product detected'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`GAT Sport authentication site ready for QR code scanning`);
});
