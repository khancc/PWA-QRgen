# 📋 Hướng dẫn cài đặt Node.js và chạy PWA

## 🔧 Cài đặt Node.js

### Windows
1. Truy cập https://nodejs.org/
2. Tải phiên bản LTS (Long Term Support)
3. Chạy file .msi và làm theo hướng dẫn
4. Restart PowerShell/Command Prompt

### Kiểm tra cài đặt
Mở PowerShell và chạy:
```powershell
node --version
npm --version
```

## 🚀 Chạy PWA QR Code Generator/Scanner

### 1. Mở PowerShell tại thư mục dự án
```powershell
cd C:\Users\Admin\Documents\PWA-QRgen\qr-pwa
```

### 2. Cài đặt dependencies
```powershell
npm install
```

### 3. Chạy development server
```powershell
npm start
```

### 4. Mở trình duyệt
- App sẽ tự động mở tại: http://localhost:3000
- Hoặc mở browser và truy cập địa chỉ trên

## ⚠️ Lưu ý quan trọng

### HTTPS cho Camera
- **Development**: http://localhost hoạt động bình thường
- **Production**: Cần HTTPS để camera scanner hoạt động
- **Mobile testing**: Sử dụng ngrok hoặc deploy lên HTTPS

### Camera Permissions
- Chrome/Edge: Tự động hỏi quyền
- Firefox: Click vào icon camera ở address bar
- Safari iOS: Settings → Safari → Camera → Allow

### PWA Installation
- Chrome: Menu → Install app
- Edge: Menu → Apps → Install this site as an app
- Safari iOS: Share → Add to Home Screen

## 🛠️ Troubleshooting

### Lỗi npm không tìm thấy
```powershell
# Thêm Node.js vào PATH
$env:PATH += ";C:\Program Files\nodejs"
```

### Lỗi camera không hoạt động
1. Kiểm tra HTTPS (required cho production)
2. Kiểm tra browser permissions
3. Thử browser khác
4. Restart browser

### Build production
```powershell
npm run build
```

### Deploy tới Netlify/Vercel
1. Build project: `npm run build`
2. Upload thư mục `build/` lên hosting
3. Configure redirects cho SPA

## 📱 Test trên Mobile

### Cách 1: Local Network
```powershell
# Tìm IP address
ipconfig

# Start với host binding
npm start -- --host 0.0.0.0
```

### Cách 2: Using ngrok
```powershell
# Install ngrok
npm install -g ngrok

# Start local server
npm start

# In new terminal
ngrok http 3000
```

## 🔄 Updates và Maintenance

### Update dependencies
```powershell
npm update
```

### Check security vulnerabilities
```powershell
npm audit
npm audit fix
```

### Clean install
```powershell
rm -rf node_modules package-lock.json
npm install
```