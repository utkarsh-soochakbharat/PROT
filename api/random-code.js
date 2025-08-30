// Vercel serverless function for random code generation
export default function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }

    // Valid product codes
    const validCodes = [
        '111222333444',
        '222333444555', 
        '333444555666',
        '444555666777',
        '555666777888',
        '666777888999',
        '777888999000',
        '888999000111'
    ];

    // Generate a random valid code
    function getRandomValidCode() {
        const randomIndex = Math.floor(Math.random() * validCodes.length);
        return validCodes[randomIndex];
    }

    const randomCode = getRandomValidCode();
    const baseUrl = req.headers.host ? 
        `https://${req.headers.host}` : 
        'https://gatgpaservices.vercel.app';

    res.status(200).json({ 
        code: randomCode,
        url: `${baseUrl}/GS26/QR?c=${randomCode}`
    });
}
