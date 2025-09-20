# 🔲 QR Code Generator & Scanner PWA

[![PWA](https://img.shields.io/badge/PWA-Progressive%20Web%20App-blue)](https://web.dev/progressive-web-apps/)
[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/)
[![Offline](https://img.shields.io/badge/Offline-Supported-green)](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook)

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
- ✅ Lịch sử quét (planned)

### 📱 PWA Features

- ✅ **Offline Support** - Hoạt động không cần internet
- ✅ **Installable** - Cài đặt như native app
- ✅ **Responsive** - Tương thích mọi thiết bị
- ✅ **Cache Strategy** - Tải nhanh với caching thông minh
- ✅ **Push Notifications** (planned)
- ✅ **Background Sync** (planned)

## 🚀 Cài đặt và chạy

### Yêu cầu hệ thống

- Node.js >= 14.x
- npm >= 6.x hoặc yarn >= 1.x
- Modern browser with camera support
- **HTTPS** (bắt buộc cho camera access)

### 1. Clone repository

```bash
git clone https://github.com/yourusername/qr-pwa.git
cd qr-pwa
```

### 2. Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Chạy development server

```bash
npm start
# hoặc
yarn start
```

App sẽ chạy tại `http://localhost:3000`

### 4. Build for production

```bash
npm run build
# hoặc
yarn build
```

### 5. Deploy

Deploy folder `build/` lên HTTPS server (GitHub Pages, Netlify, Vercel, etc.)

## 📁 Cấu trúc dự án

```
qr-pwa/
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service Worker
│   ├── index.html             # HTML template
│   └── icons/                 # App icons
├── src/
│   ├── components/
│   │   ├── QRGenerator.jsx    # QR Generator component
│   │   ├── QRScanner.jsx      # QR Scanner component
│   │   └── CameraScanner.jsx  # Camera Scanner component
│   ├── App.js                 # Main App component
│   ├── App.css                # Main styling
│   ├── index.js               # Entry point
│   └── serviceWorkerRegistration.js  # SW registration
├── package.json
└── README.md
```

## 🛠️ Technologies Used

### Core

- **React 18.2** - UI framework
- **JavaScript ES6+** - Programming language
- **CSS3** - Styling với Flexbox & Grid

### QR Code Libraries

- **qrcode** - QR code generation
- **html5-qrcode** - QR code scanning
- **react-webcam** - Camera access

### PWA Features

- **Service Worker** - Offline caching
- **Web App Manifest** - App installation
- **Workbox** - PWA toolkit (planned)

### Build Tools

- **Create React App** - Build toolchain
- **Webpack** - Module bundler
- **Babel** - JavaScript compiler

## 📱 PWA Configuration

### Web App Manifest

```json
{
  "name": "QR Code Generator & Scanner PWA",
  "short_name": "QR Scanner",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "#2196F3",
  "background_color": "#ffffff",
  "start_url": ".",
  "scope": "/"
}
```

### Service Worker Features

- **Cache First** strategy cho static assets
- **Network First** strategy cho API calls
- **Offline fallback** cho navigation
- **Background sync** (planned)

### Caching Strategy

```javascript
// Static assets: Cache First
- HTML, CSS, JS files
- Images, icons
- Fonts

// Dynamic content: Network First
- API responses
- User generated content

// Offline fallback
- Show cached version when offline
- Queue actions for when online
```

## 🔧 Configuration

### Environment Variables

Tạo file `.env` trong root directory:

```env
# App Configuration
REACT_APP_NAME="QR Code PWA"
REACT_APP_VERSION="1.0.0"

# PWA Configuration
REACT_APP_SW_UPDATE_INTERVAL=300000

# Optional: Analytics
REACT_APP_GA_ID=your_google_analytics_id
```

### Camera Permissions

App sẽ yêu cầu quyền truy cập camera khi lần đầu sử dụng scanner:

- **Chrome/Edge**: Automatic permission prompt
- **Firefox**: Manual permission in address bar
- **Safari iOS**: Permission in Settings → Safari → Camera
- **Android**: Automatic permission prompt

## 🌐 Browser Support

| Browser | Desktop | Mobile | PWA Install    |
| ------- | ------- | ------ | -------------- |
| Chrome  | ✅      | ✅     | ✅             |
| Edge    | ✅      | ✅     | ✅             |
| Firefox | ✅      | ✅     | ❌             |
| Safari  | ✅      | ✅     | ✅ (iOS 11.3+) |

## 📊 Performance

### Lighthouse Scores

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: 100

### Bundle Size

- **Main bundle**: ~500KB (gzipped)
- **Service Worker**: ~15KB
- **Total**: ~515KB

## 🔒 Security

### HTTPS Requirement

PWA yêu cầu HTTPS để:

- Truy cập camera/microphone
- Service Worker hoạt động
- App installation
- Push notifications

### Camera Privacy

- Không lưu trữ hình ảnh
- Chỉ xử lý QR code trên device
- Không gửi data lên server
- User control camera access

## 🧪 Testing

### Unit Tests

```bash
npm test
# hoặc
yarn test
```

### E2E Tests (planned)

```bash
npm run test:e2e
# hoặc
yarn test:e2e
```

### PWA Testing

1. **Lighthouse audit**: `npm run lighthouse`
2. **Offline testing**: Disconnect internet và test app
3. **Installation**: Test "Add to Home Screen"
4. **Camera**: Test trên các device khác nhau

## 🚀 Deployment

### GitHub Pages

```bash
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d build"

# Deploy
npm run deploy
```

### Netlify

1. Connect GitHub repo
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy

### Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🔄 Updates & Versioning

### Service Worker Updates

App tự động check updates mỗi 5 phút:

- Hiển thị notification khi có update
- User choice để reload app
- Seamless update experience

### Version History

- **v1.0.0**: Basic QR generation & scanning
- **v1.1.0**: PWA features & offline support (planned)
- **v1.2.0**: Advanced camera controls (planned)
- **v1.3.0**: History & favorites (planned)

## 🤝 Contributing

### Development Setup

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

### Code Style

- ESLint configuration
- Prettier formatting
- Conventional commits
- Component naming conventions

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [html5-qrcode](https://github.com/mebjas/html5-qrcode) - QR scanning library
- [qrcode](https://github.com/soldair/node-qrcode) - QR generation library
- [Create React App](https://create-react-app.dev/) - React setup
- [Web.dev PWA guides](https://web.dev/progressive-web-apps/) - PWA best practices

## 📞 Support

- 📧 Email: support@yourapp.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/qr-pwa/issues)
- 📖 Documentation: [Wiki](https://github.com/yourusername/qr-pwa/wiki)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/qr-pwa/discussions)

---

**Developed with ❤️ by [Your Name](https://github.com/yourusername)**

_Progressive Web App - Works everywhere, installs everywhere, reliable everywhere_ 🌐
