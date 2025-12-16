import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
TITLE:${data.position}
${data.phone ? `TEL;TYPE=CELL:${data.phone}` : ''}
${data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : ''}
END:VCARD
`.trim();

    QRCode.toCanvas(
      canvasRef.current,
      vCardData,
      { width: 140 },
      (error) => {
        if (error) console.error(error);
      }
    );
  }, [data]);

  return <canvas ref={canvasRef}></canvas>;
};

export default QRCodeComponent;
