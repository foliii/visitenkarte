import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeComponent = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, 'Max Mustermann', { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, []);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default QRCodeComponent;