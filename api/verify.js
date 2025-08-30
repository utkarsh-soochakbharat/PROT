// Vercel serverless function for product verification
export default function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    const { code } = req.body;
    
    if (!code) {
        return res.status(400).json({ 
            success: false, 
            message: 'No code provided' 
        });
    }
    
    // Valid product codes
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
    
    if (validCodes.has(code)) {
        const imageUrl = getImageUrlForCode(code);
        res.status(200).json({
            success: true,
            product: {
                code: code,
                imageUrl: imageUrl,
                name: 'GAT Sport Product',
                description: 'Authentic GAT Sport supplement'
            }
        });
    } else {
        res.status(200).json({
            success: false,
            message: 'Invalid product code'
        });
    }
}
