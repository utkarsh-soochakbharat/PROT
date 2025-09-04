// Vercel serverless function for QR code redirects
export default function handler(req, res) {
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

