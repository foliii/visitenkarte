import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

const QRCodeComponent = ({ data }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !data) return;

    let qrContent = "";

    switch (data.qrType) {
      case "url":
        qrContent = data.url;
        break;

      case "location":
        qrContent = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          data.locationAddress
        )}`;
        break;

      case "event":
        qrContent = `
BEGIN:VEVENT
SUMMARY:${data.eventTitle}
DTSTART:${data.eventDate.replace(/-/g, "")}T${data.eventTime.replace(":", "")}00
END:VEVENT
        `.trim();
        break;

      case "vcard":
      default:
        qrContent = `
BEGIN:VCARD
VERSION:3.0
N:${data.lastName};${data.firstName}
FN:${data.firstName} ${data.lastName}
TITLE:${data.position}
TEL:${data.phone}
EMAIL:${data.email}
END:VCARD
        `.trim();
    }

    QRCode.toCanvas(canvasRef.current, qrContent, { width: 72 });
  }, [data]);

  return <canvas ref={canvasRef} />;
};

export default QRCodeComponent;
