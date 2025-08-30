# 🚀 Render Deployment Guide for GAT Sport Authentication Site

## 📋 **Prerequisites**
- Render account (free at [render.com](https://render.com))
- GitHub account with your project
- Your project files ready

## 🔧 **Step 1: Prepare Your Project**

### **1.1 Ensure your project structure is correct**
Your project should have these files:
```
gat-sport-auth/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   ├── images/
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── 4.jpg
│   │   ├── 5.jpg
│   │   ├── 6.jpg
│   │   ├── 7.jpg
│   │   └── 8.jpg
│   ├── gat-gear.html
│   ├── gat-gear-snippet.html
│   ├── learn-more.html
│   ├── learn-more-snippet.html
│   ├── gat-homepage.html
│   ├── gat-homepage-snippet.html
│   ├── more-info.html
│   ├── more-info-snippet.html
│   └── qr-generator.html
└── README.md
```

### **1.2 Create/Update package.json**
Make sure your `package.json` has the correct start script:
```json
{
  "name": "gat-sport-auth",
  "version": "1.0.0",
  "description": "GAT Sport Product Authentication Site",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
```

## 📁 **Step 2: Push to GitHub**

### **2.1 Create GitHub Repository**
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `gat-sport-auth`
4. Make it **Public** or **Private** (both work on Render)
5. Don't initialize with README

### **2.2 Push Your Code**
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: GAT Sport Authentication Site"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/gat-sport-auth.git

# Push to GitHub
git push -u origin main
```

## ⚙️ **Step 3: Deploy on Render**

### **3.1 Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Verify your email

### **3.2 Create New Web Service**
1. Click "New +" button
2. Select "Web Service"
3. Connect your GitHub account if not already connected
4. Select your `gat-sport-auth` repository

### **3.3 Configure Your Service**
Fill in these details:

**Basic Settings:**
- **Name**: `gat-sport-auth` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose closest to your users
- **Branch**: `main`

**Build & Deploy Settings:**
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (for testing)

**Advanced Settings:**
- **Auto-Deploy**: ✅ Enabled
- **Health Check Path**: `/` (optional)

### **3.4 Deploy**
1. Click "Create Web Service"
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your application
   - Provide you with a URL

## 🌐 **Step 4: Your Site is Live!**

### **4.1 Default URL**
Your site will be available at:
```
https://gat-sport-auth.onrender.com
```
(URL will be different based on your service name)

### **4.2 Test Your URLs**
- Main page: `https://gat-sport-auth.onrender.com/`
- With code: `https://gat-sport-auth.onrender.com/?c=111222333444`
- QR redirect: `https://gat-sport-auth.onrender.com/GS26/QR?c=111222333444`
- Shop page: `https://gat-sport-auth.onrender.com/gat-gear.html`
- Learn more: `https://gat-sport-auth.onrender.com/learn-more.html`

## 🔗 **Step 5: Connect Custom Domain (Optional)**

### **5.1 Add Custom Domain**
1. In your Render dashboard, go to your service
2. Click "Settings" tab
3. Scroll to "Custom Domains"
4. Click "Add Domain"
5. Enter: `gatgpaservices.com` (or your preferred domain)

### **5.2 Update DNS**
In your domain registrar (GoDaddy):
1. Add CNAME record:
   - **Name**: `@` (for root domain) or `gatgpaservices`
   - **Value**: `gat-sport-auth.onrender.com`
   - **TTL**: 3600

### **5.3 Wait for DNS Propagation**
- Can take 24-48 hours
- Test with: `https://gatgpaservices.com`

## 📱 **Step 6: Generate QR Codes**

### **6.1 Update QR Generator**
Open `qr-generator.html` and update the base URL:
```javascript
const baseUrl = 'https://gat-sport-auth.onrender.com/';
// or
const baseUrl = 'https://gatgpaservices.com/';
```

### **6.2 Your QR Code URLs**
- QR 1: `https://gatgpaservices.com/GS26/QR?c=111222333444`
- QR 2: `https://gatgpaservices.com/GS26/QR?c=222333444555`
- QR 3: `https://gatgpaservices.com/GS26/QR?c=333444555666`
- And so on...

## ✅ **Step 7: Test Everything**

### **7.1 Test Product Codes**
Try these codes:
- `111222333444` ✅
- `222333444555` ✅
- `333444555666` ✅
- `invalid123` ❌

### **7.2 Test Navigation**
- Shop Now button → gat-gear.html
- Learn More button → learn-more.html
- Footer links work correctly
- QR redirects work properly

## 🚨 **Important Notes**

### **Render Free Tier Limitations:**
- ⚠️ Service sleeps after 15 minutes of inactivity
- ⚠️ First request after sleep takes 30-60 seconds
- ⚠️ 750 hours/month free
- ✅ Automatic HTTPS
- ✅ Custom domains supported
- ✅ Auto-deploy from GitHub

### **Upgrading to Paid Plan:**
If you need better performance:
1. Go to your service settings
2. Click "Change Plan"
3. Choose "Starter" ($7/month)
4. Service stays always-on

## 🎯 **Quick Commands for Updates**

```bash
# After making changes locally
git add .
git commit -m "Update: [describe changes]"
git push origin main

# Render will auto-deploy in 2-5 minutes
```

## 📊 **Monitoring Your Service**

### **View Logs**
1. Go to your service dashboard
2. Click "Logs" tab
3. View real-time logs

### **Health Checks**
- Render automatically checks if your service is running
- If it fails, it will restart automatically

## 📞 **Need Help?**

If you encounter issues:
1. Check Render logs for errors
2. Verify your `package.json` has correct start script
3. Ensure all files are committed to GitHub
4. Check that `server.js` listens on the correct port

**Your site will be live at: `https://gat-sport-auth.onrender.com/`** 🚀

## 🔄 **Next Steps After Deployment**

1. **Test all functionality** - Make sure everything works
2. **Set up custom domain** - Connect your domain
3. **Generate QR codes** - Update QR generator with new URLs
4. **Monitor performance** - Check Render dashboard regularly
5. **Scale if needed** - Upgrade to paid plan for better performance
