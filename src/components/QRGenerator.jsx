import React, { useState } from 'react';
import QRCode from 'qrcode';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [qrDataURL, setQrDataURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      const dataURL = await QRCode.toDataURL(text, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      setQrDataURL(dataURL);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
    setIsLoading(false);
  };

  const downloadQR = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrDataURL;
    link.click();
  };

  const clearQR = () => {
    setText('');
    setQrDataURL('');
  };

  return (
    <div className="qr-generator">
      <h2>QR Code Generator</h2>
      <div className="input-section">
        <input
          type="text"
          placeholder="Nhập text hoặc URL..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && generateQR()}
        />
        <div className="button-group">
          <button onClick={generateQR} disabled={isLoading || !text.trim()}>
            {isLoading ? 'Đang tạo...' : 'Tạo QR Code'}
          </button>
          <button onClick={clearQR} className="clear-btn">
            Xóa
          </button>
        </div>
      </div>
      
      {qrDataURL && (
        <div className="qr-result">
          <img src={qrDataURL} alt="QR Code" />
          <button onClick={downloadQR} className="download-btn">
            📥 Tải xuống
          </button>
          <div className="qr-text">
            <p><strong>Nội dung:</strong> {text}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QRGenerator;