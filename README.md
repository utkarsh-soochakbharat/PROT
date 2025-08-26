# GAT Sport - Product Authentication System

An exact copy of the GAT Sport product authentication system. This system provides a direct verification interface that users reach when they scan QR codes on GAT Sport products.

## Features

- **Exact GAT Sport Design**: Complete visual replication of the original site
- **Direct Product Verification**: Clean verification interface for QR code scanning
- **Guilloche Pattern Verification**: Visual security pattern for additional verification
- **Responsive Design**: Works perfectly on mobile and desktop devices
- **Modern UI**: Dark blue theme with blurred background matching GAT Sport
- **Real-time Validation**: Instant product code verification

## Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   - Main site: http://localhost:3000
   - With product code: http://localhost:3000?c=267365954593

## How It Works

### 1. QR Code Scanning
- Users scan QR codes on GAT Sport products with their phones
- QR codes contain URLs like: `http://yourdomain.com?c=267365954593`
- The verification page opens automatically

### 2. Product Verification
- Product code is displayed prominently on the page
- User clicks "VERIFY MY PRODUCT" to authenticate
- System validates the code and shows result

### 3. Authentication Process
- Valid codes show success message with guilloche pattern
- Invalid codes show error message
- Each product code generates a unique visual pattern

## Sample Product Codes

The system comes with these pre-configured valid codes:
- `267365954593`
- `123456789012`
- `987654321098`
- `555666777888`
- `111222333444`

## API Endpoints

### Verify Product
```
POST /api/verify
Content-Type: application/json

{
  "code": "267365954593"
}
```
Returns verification result for the product code.

## File Structure

```
protein/
├── server.js              # Express server
├── package.json           # Dependencies
├── README.md             # This file
└── public/               # Static files
    ├── index.html        # Main verification page
    ├── styles.css        # CSS styles
    └── script.js         # Verification JavaScript
```

## Design Features

### Visual Elements
- **Dark Blue Background**: Matches GAT Sport's signature color scheme
- **Blurred Product Image**: Background effect similar to original
- **Glass Morphism**: Semi-transparent content area with backdrop blur
- **GAT Sport Logo**: Exact typography and positioning
- **Gradient Buttons**: Blue gradient styling matching original

### Typography
- **GAT SPORT AUTHENTICATION SITE**: Large white title
- **Welcome Message**: Light blue subtitle text
- **Product Code**: Large monospace font with gradient effect
- **VERIFY MY PRODUCT**: Bold uppercase button text

## Security Features

- **Unique Guilloche Patterns**: Each product code generates a unique visual pattern
- **Hash-based Verification**: Product codes are validated against a secure database
- **Visual Authentication**: Users can compare patterns on their device with the product

## Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Troubleshooting

### Verification Fails
- Ensure the product code is in the valid codes list
- Check network connectivity
- Verify the API endpoint is accessible

### Mobile Issues
- Ensure the site is accessible via HTTPS in production
- Test QR code scanning with different apps
- Check responsive design on various screen sizes

## License

MIT License - This is an exact copy of the GAT Sport authentication system.

## Support

For issues or questions, please check the troubleshooting section above or create an issue in the repository.


