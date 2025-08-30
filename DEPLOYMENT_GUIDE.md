# 🚀 GAT Sport Authentication Site - Deployment Guide

## 📋 **Overview**
This guide will help you deploy your GAT Sport authentication site to Namecheap hosting and set up QR codes for product verification.

## 🎯 **URL Structure**
- **Main Site:** `https://gat.gpaservices.com/`
- **QR Code URLs:** `https://gat.gpaservices.com/GS26/QR?c=PRODUCT_CODE`
- **Example:** `https://gat.gpaservices.com/GS26/QR?c=111222333444`

## 🛒 **Step 1: Purchase Domain & Hosting**

### **Domain Purchase:**
1. Go to [Namecheap.com](https://namecheap.com)
2. Search for `gat.gpaservices.com` (or your preferred domain)
3. Purchase the domain

### **Hosting Options:**

#### **Option A: Namecheap VPS (Recommended)**
- **Plan:** VPS Basic or higher
- **OS:** Ubuntu 20.04/22.04
- **RAM:** 2GB minimum
- **Storage:** 20GB minimum

#### **Option B: Namecheap Shared Hosting**
- **Plan:** Stellar Business or higher
- **Features:** Node.js support required

## 🔧 **Step 2: Server Setup (VPS Option)**

### **Connect to Your VPS:**
```bash
ssh root@your-server-ip
```

### **Install Node.js:**
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 18.x
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### **Install PM2 (Process Manager):**
```bash
npm install -g pm2
```

### **Install Nginx (Web Server):**
```bash
apt install nginx -y
systemctl enable nginx
systemctl start nginx
```

## 📁 **Step 3: Upload Your Files**

### **Create Directory:**
```bash
mkdir -p /var/www/gat-auth
cd /var/www/gat-auth
```

### **Upload Files:**
Use FTP/SFTP or SCP to upload your files:
```bash
# From your local machine
scp -r ./* root@your-server-ip:/var/www/gat-auth/
```

### **File Structure:**
```
/var/www/gat-auth/
├── server.js
├── package.json
├── public/
│   ├── index.html
│   ├── script.js
│   ├── styles.css
│   └── images/
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ... (all 8 images)
└── qr-generator.html
```

## ⚙️ **Step 4: Install Dependencies**

```bash
cd /var/www/gat-auth
npm install
```

## 🌐 **Step 5: Configure Nginx**

### **Create Nginx Configuration:**
```bash
nano /etc/nginx/sites-available/gat-auth
```

### **Add This Configuration:**
```nginx
server {
    listen 80;
    server_name gat.gpaservices.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **Enable Site:**
```bash
ln -s /etc/nginx/sites-available/gat-auth /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 🔒 **Step 6: Configure SSL (HTTPS)**

### **Install Certbot:**
```bash
apt install certbot python3-certbot-nginx -y
```

### **Get SSL Certificate:**
```bash
certbot --nginx -d gat.gpaservices.com
```

## 🚀 **Step 7: Start Your Application**

### **Start with PM2:**
```bash
cd /var/www/gat-auth
pm2 start server.js --name "gat-auth"
pm2 save
pm2 startup
```

### **Verify It's Running:**
```bash
pm2 status
pm2 logs gat-auth
```

## 📱 **Step 8: Generate QR Codes**

### **Access QR Generator:**
1. Open `https://gat.gpaservices.com/qr-generator.html`
2. Generate QR codes for all 8 product codes
3. Download each QR code as PNG

### **Product Codes:**
- `111222333444` → QR Code 1
- `222333444555` → QR Code 2
- `333444555666` → QR Code 3
- `444555666777` → QR Code 4
- `555666777888` → QR Code 5
- `666777888999` → QR Code 6
- `777888999000` → QR Code 7
- `888999000111` → QR Code 8

## 🧪 **Step 9: Test Everything**

### **Test URLs:**
1. **Main Site:** `https://gat.gpaservices.com/`
2. **QR Code 1:** `https://gat.gpaservices.com/GS26/QR?c=111222333444`
3. **QR Code 2:** `https://gat.gpaservices.com/GS26/QR?c=222333444555`
4. **Continue for all 8 codes...**

### **QR Code Testing:**
1. Scan QR codes with your phone
2. Verify they redirect to the authentication page
3. Test product verification with each code

## 🔄 **Step 10: Maintenance**

### **Update Application:**
```bash
cd /var/www/gat-auth
git pull  # if using git
npm install  # if dependencies changed
pm2 restart gat-auth
```

### **View Logs:**
```bash
pm2 logs gat-auth
```

### **Monitor Performance:**
```bash
pm2 monit
```

## 🎯 **QR Code Implementation**

### **For Product Packaging:**
1. Print QR codes on product labels
2. Each QR code contains a unique product code
3. When scanned, opens authentication page
4. Shows specific guilloche pattern for verification

### **QR Code Format:**
```
https://gat.gpaservices.com/GS26/QR?c=PRODUCT_CODE
```

### **Example QR Codes:**
- Product 1: `https://gat.gpaservices.com/GS26/QR?c=111222333444`
- Product 2: `https://gat.gpaservices.com/GS26/QR?c=222333444555`
- Product 3: `https://gat.gpaservices.com/GS26/QR?c=333444555666`
- ... and so on

## 🆘 **Troubleshooting**

### **Common Issues:**

#### **Site Not Loading:**
```bash
# Check if Node.js app is running
pm2 status

# Check nginx status
systemctl status nginx

# Check firewall
ufw status
```

#### **SSL Issues:**
```bash
# Renew SSL certificate
certbot renew

# Check SSL configuration
nginx -t
```

#### **Port Issues:**
```bash
# Check if port 3000 is in use
netstat -tlnp | grep :3000

# Kill process if needed
kill -9 PID
```

## 📞 **Support**

If you encounter issues:
1. Check PM2 logs: `pm2 logs gat-auth`
2. Check Nginx logs: `tail -f /var/log/nginx/error.log`
3. Verify DNS settings in Namecheap control panel
4. Ensure all files are uploaded correctly

---

**🎉 Congratulations! Your GAT Sport authentication site is now live!**
