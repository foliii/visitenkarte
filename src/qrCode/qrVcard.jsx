import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import "./style.css";

const QRCodeComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      const vCardData = `BEGIN:VCARD\nVERSION:3.0\nN:${data.lastName};${data.firstName}\nTITLE:${data.position}\nEND:VCARD`;
      QRCode.toCanvas(canvasRef.current, vCardData, { width: 256 }, (error) => {
        if (error) console.error(error);
      });
    }
  }, [data]);

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default QRCodeComponent;