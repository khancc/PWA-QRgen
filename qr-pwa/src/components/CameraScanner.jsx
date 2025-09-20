import React, { useState, useRef, useEffect } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

const CameraScanner = () => {
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState('');
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    getCameras();
    return () => {
      stopScanning();
    };
  }, []);

  const getCameras = async () => {
    try {
      const devices = await Html5Qrcode.getCameras();
      setCameras(devices);
      if (devices.length > 0) {
        // Ưu tiên camera sau (rear camera)
        const backCamera = devices.find(device => 
          device.label.toLowerCase().includes('back') ||
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
        ) || devices[devices.length - 1]; // Nếu không tìm thấy, chọn camera cuối
        setSelectedCamera(backCamera.id);
      }
    } catch (error) {
      console.error("Error getting cameras:", error);
      setError('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập.');
    }
  };

  const startScanning = async () => {
    if (!selectedCamera) {
      setError('Vui lòng chọn camera');
      return;
    }

    setError('');
    try {
      const html5QrCode = new Html5Qrcode("qr-reader-camera");
      html5QrCodeRef.current = html5QrCode;

      await html5QrCode.start(
        selectedCamera,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText, decodedResult) => {
          setScanResult(decodedText);
          stopScanning();
          console.log(`Camera scan result: ${decodedText}`, decodedResult);
        },
        (errorMessage) => {
          // Ignore scan errors - they're normal when no QR code is detected
        }
      );
      
      setIsScanning(true);
    } catch (error) {
      console.error("Unable to start scanning:", error);
      setError('Không thể khởi động camera. Vui lòng kiểm tra quyền truy cập camera.');
    }
  };

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
        setIsScanning(false);
      } catch (error) {
        console.error("Error stopping scanner:", error);
      }
    }
  };

  const resetScanner = () => {
    setScanResult('');
    setError('');
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
    <div className="camera-scanner">
      <h2>📱 Camera Scanner</h2>
      
      {error && (
        <div className="error-message">
          <p>⚠️ {error}</p>
        </div>
      )}

      <div className="camera-selection">
        <label htmlFor="camera-select">Chọn camera:</label>
        <select 
          id="camera-select"
          value={selectedCamera} 
          onChange={(e) => setSelectedCamera(e.target.value)}
          disabled={isScanning}
        >
          <option value="">-- Chọn camera --</option>
          {cameras.map(camera => (
            <option key={camera.id} value={camera.id}>
              {camera.label || `Camera ${camera.id}`}
            </option>
          ))}
        </select>
      </div>

      <div className="scanner-controls">
        {!isScanning ? (
          <button 
            onClick={startScanning} 
            disabled={!selectedCamera}
            className="start-btn"
          >
            📷 Bắt đầu quét
          </button>
        ) : (
          <button onClick={stopScanning} className="stop-btn">
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
        <div className="camera-container">
          <div id="qr-reader-camera"></div>
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

export default CameraScanner;