import React, { useState, useEffect } from "react";
import QRGenerator from "./components/QRGenerator";
import QRScanner from "./components/QRScanner";
import CameraScanner from "./components/CameraScanner";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("generator");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);

  useEffect(() => {
    // Handle online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Handle PWA install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;

    const result = await installPrompt.prompt();
    console.log("Install prompt result:", result);
    setInstallPrompt(null);
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case "generator":
        return "🎯";
      case "scanner":
        return "📷";
      case "camera":
        return "📱";
      default:
        return "";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>
            <span className="app-icon">🔲</span>
            QR Code PWA
          </h1>

          <div className="header-actions">
            {/* Online/Offline Indicator */}
            <div
              className={`status-indicator ${isOnline ? "online" : "offline"}`}
            >
              <span className="status-dot"></span>
              {isOnline ? "Online" : "Offline"}
            </div>

            {/* Install App Button */}
            {installPrompt && (
              <button
                onClick={handleInstallApp}
                className="install-btn"
                title="Cài đặt ứng dụng"
              >
                📱 Cài đặt
              </button>
            )}
          </div>
        </div>

        <nav className="tab-nav">
          <button
            className={`tab-btn ${activeTab === "generator" ? "active" : ""}`}
            onClick={() => setActiveTab("generator")}
          >
            <span className="tab-icon">{getTabIcon("generator")}</span>
            <span className="tab-text">Tạo QR</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "scanner" ? "active" : ""}`}
            onClick={() => setActiveTab("scanner")}
          >
            <span className="tab-icon">{getTabIcon("scanner")}</span>
            <span className="tab-text">Quét QR</span>
          </button>
          <button
            className={`tab-btn ${activeTab === "camera" ? "active" : ""}`}
            onClick={() => setActiveTab("camera")}
          >
            <span className="tab-icon">{getTabIcon("camera")}</span>
            <span className="tab-text">Camera</span>
          </button>
        </nav>
      </header>

      <main className="app-main">
        <div className="content-container">
          {activeTab === "generator" && <QRGenerator />}
          {activeTab === "scanner" && <QRScanner />}
          {activeTab === "camera" && <CameraScanner />}
        </div>
      </main>

      <footer className="app-footer">
        <p>
          <span>💡</span>
          {!isOnline && "Chế độ offline - Tính năng quét QR có thể bị hạn chế"}
          {isOnline && "Ứng dụng hoạt động tốt nhất trên HTTPS"}
        </p>
      </footer>
    </div>
  );
}

export default App;
