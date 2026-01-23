import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const QRCodeComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    let qrContent = '';

    switch (data.qrType) {
      case 'mail':
        if (!data.email) return;
        qrContent = `mailto:${data.email}`;
        break;

      case 'url':
        if (!data.url) return;
        qrContent = data.url;
        break;

      case 'location':
        qrContent = 'geo:49.3536,9.1459';
        break;

      case 'event':
        qrContent = `
BEGIN:VEVENT
SUMMARY:Business Meeting
DTSTART:20250115T100000
DTEND:20250115T110000
LOCATION:DHBW Mosbach
DESCRIPTION:Beispieltermin für Visitenkarten-QR-Code
END:VEVENT
`.trim();
        break;

      case 'vcard':
      default:
        qrContent = `
BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
TITLE:${data.position}
${data.phone ? `TEL;TYPE=CELL:${data.phone}` : ''}
${data.email ? `EMAIL;TYPE=INTERNET:${data.email}` : ''}
END:VCARD
`.trim();
    }

    QRCode.toCanvas(
    canvasRef.current,
    qrContent,
    {
      width: 64,
      margin: 0,
      color: {
        dark: "#0f172a",
        light: "#ffffff",
      },
    },
    (error) => {
      if (error) console.error(error);
    }
  );

  }, [
    data.firstName,
    data.lastName,
    data.position,
    data.phone,
    data.email,
    data.url,
    data.qrType
  ]);

  return <canvas ref={canvasRef}></canvas>;
};

export default QRCodeComponent;
