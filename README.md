# 🔲 QR Code Generator & Scanner PWA

Progressive Web App (PWA) hiện đại để tạo và quét QR code với khả năng hoạt động offline, có thể cài đặt như native app.

## ✨ Tính năng chính

### 🎯 QR Code Generator

- ✅ Tạo QR code từ text hoặc URL
- ✅ Tùy chỉnh kích thước và màu sắc
- ✅ Tải xuống QR code dưới dạng PNG
- ✅ Preview real-time
- ✅ Copy nội dung đã tạo

### 📷 QR Code Scanner

- ✅ Quét QR code từ camera
- ✅ Hỗ trợ multiple camera (front/back)
- ✅ Auto-detect và decode QR code
- ✅ Copy kết quả vào clipboard
- ✅ Mở link tự động (nếu là URL)

### 📱 PWA Features

- ✅ **Offline Support** - Hoạt động không cần internet
- ✅ **Installable** - Cài đặt như native app
- ✅ **Responsive** - Tương thích mọi thiết bị
- ✅ **Cache Strategy** - Tải nhanh với service worker

## 🚀 Hướng dẫn chạy ứng dụng

### Yêu cầu hệ thống

- **Node.js** >= 14.x ([Tải tại đây](https://nodejs.org/))
- **npm** >= 6.x (đi kèm với Node.js)
- **Modern browser** hỗ trợ camera
- **HTTPS** (bắt buộc cho camera trên production)

### 📋 Các bước thực hiện

#### 1. Cài đặt Node.js

**Windows:**

- Truy cập https://nodejs.org/
- Tải phiên bản LTS (Long Term Support)
- Chạy file installer và làm theo hướng dẫn
- Restart Command Prompt/PowerShell

**Kiểm tra cài đặt:**

```bash
node --version
npm --version
```

#### 2. Clone và setup project

```bash
# Clone repository
git clone https://github.com/khancc/PWA-QRgen.git
cd PWA-QRgen

# Cài đặt dependencies
npm install
```

#### 3. Chạy development server

```bash
npm start
```

🌐 App sẽ tự động mở tại: **http://localhost:3000**

#### 4. Build for production

```bash
npm run build
```

#### 5. Deploy

Deploy thư mục `build/` lên HTTPS server (Netlify, Vercel, GitHub Pages, etc.)

### ⚠️ Lưu ý quan trọng

#### Camera Permissions

- **Chrome/Edge**: Tự động hỏi quyền khi truy cập camera
- **Firefox**: Click vào icon camera ở address bar để cấp quyền
- **Safari iOS**: Settings → Safari → Camera → Allow
- **Development**: http://localhost hoạt động bình thường
- **Production**: Bắt buộc phải có HTTPS để camera hoạt động

#### PWA Installation

- **Chrome**: Menu → Install app
- **Edge**: Menu → Apps → Install this site as an app
- **Safari iOS**: Share → Add to Home Screen

#### Test trên Mobile

```bash
# Sử dụng local network
npm start -- --host 0.0.0.0
# Sau đó truy cập http://YOUR_IP:3000 từ mobile

# Hoặc sử dụng ngrok cho HTTPS
npx ngrok http 3000
```

## 🛠️ Technologies Used

- **React 18.2** - UI framework
- **JavaScript ES6+** - Programming language
- **CSS3** - Styling với Flexbox & Grid
- **qrcode** - QR code generation library
- **html5-qrcode** - QR code scanning library
- **Service Worker** - Offline caching và PWA features
- **Create React App** - Build toolchain

## � Troubleshooting

### Lỗi npm không tìm thấy

```bash
# Kiểm tra PATH environment variable
echo $PATH
# Reinstall Node.js nếu cần thiết
```

### Camera không hoạt động

1. ✅ Kiểm tra HTTPS (required cho production)
2. ✅ Kiểm tra browser permissions
3. ✅ Thử browser khác (Chrome/Edge recommended)
4. ✅ Restart browser
5. ✅ Kiểm tra camera không bị app khác sử dụng

### Clean install

```bash
rm -rf node_modules package-lock.json
npm install
```

## 🌐 Browser Support

| Browser | Desktop | Mobile | Camera | PWA Install |
| ------- | ------- | ------ | ------ | ----------- |
| Chrome  | ✅      | ✅     | ✅     | ✅          |
| Edge    | ✅      | ✅     | ✅     | ✅          |
| Firefox | ✅      | ✅     | ✅     | ❌          |
| Safari  | ✅      | ✅     | ✅     | ✅ (iOS)    |

## 🔒 Privacy & Security

- ✅ **Không lưu trữ hình ảnh** - Chỉ xử lý QR code trên device
- ✅ **Không gửi data** - Hoạt động hoàn toàn offline
- ✅ **HTTPS required** - Bảo mật cho camera access
- ✅ **User control** - Người dùng kiểm soát quyền camera

## 🧪 Testing

```bash
# Chạy unit tests
npm test

# Chạy Lighthouse audit
npm run lighthouse

# Test offline
# 1. Mở app trong browser
# 2. Disconnect internet
# 3. Reload page - app vẫn hoạt động
```

## 🚀 Deployment

### Netlify (Recommended)

1. Build project: `npm run build`
2. Drag & drop thư mục `build/` vào [Netlify](https://netlify.com)
3. Hoặc connect GitHub repo để auto-deploy

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### GitHub Pages

```bash
npm install --save-dev gh-pages
npm run deploy
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🙏 Credits

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) - QR scanning library
- [qrcode](https://github.com/soldair/node-qrcode) - QR generation library
- [Create React App](https://create-react-app.dev/) - React setup

---

**Developed with ❤️**

_Progressive Web App - Works everywhere, installs everywhere_ 🌐
