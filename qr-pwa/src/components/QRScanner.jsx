import React, { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const QRScanner = () => {
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      startScanner();
    }
    
    return () => {
      stopScanner();
    };
  }, [isScanning]);

  const startScanner = () => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0,
        disableFlip: false,
        verbose: false
      },
      false // verbose
    );

    scanner.render(onScanSuccess, onScanError);
    scannerRef.current = scanner;
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.clear().catch(error => {
        console.error("Failed to clear scanner:", error);
      });
    }
  };

  const onScanSuccess = (decodedText, decodedResult) => {
    setScanResult(decodedText);
    setIsScanning(false);
    console.log(`Scan result: ${decodedText}`, decodedResult);
  };

  const onScanError = (errorMessage) => {
    // Ignore scan errors - they're normal when no QR code is detected
  };

  const resetScanner = () => {
    setScanResult('');
    setIsScanning(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(scanResult);
      alert('Đã sao chép vào clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className="qr-scanner">
      <h2>QR Code Scanner</h2>
      
      <div className="scanner-controls">
        {!isScanning ? (
          <button onClick={() => setIsScanning(true)} className="start-btn">
            📷 Bắt đầu quét
          </button>
        ) : (
          <button onClick={() => setIsScanning(false)} className="stop-btn">
            ⏹️ Dừng quét
          </button>
        )}
        
        {scanResult && (
          <button onClick={resetScanner} className="reset-btn">
            🔄 Quét lại
          </button>
        )}
      </div>

      {isScanning && (
        <div className="scanner-container">
          <div id="qr-reader"></div>
          <p className="scan-instruction">Đưa camera về phía QR code để quét</p>
        </div>
      )}
      
      {scanResult && (
        <div className="scan-result">
          <h3>✅ Kết quả quét:</h3>
          <div className="result-content">
            <p className="result-text">{scanResult}</p>
            <div className="result-actions">
              <button onClick={copyToClipboard} className="copy-btn">
                📋 Sao chép
              </button>
              {scanResult.startsWith('http') && (
                <a 
                  href={scanResult} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="open-link-btn"
                >
                  🔗 Mở liên kết
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRScanner;