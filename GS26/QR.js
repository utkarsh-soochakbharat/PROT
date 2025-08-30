// Vercel serverless function for QR code redirects
export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    const { c: code } = req.query;
    
    if (code) {
        // Redirect to main page with the code parameter
        res.redirect(302, `/?c=${code}`);
    } else {
        // If no code provided, redirect to main page
        res.redirect(302, '/');
    }
}
