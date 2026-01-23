// src/frontend/pdfexport/pdfexport.jsx
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./export.css";

const ExportButtons = ({ previewRef, hasData }) => {
  // Nichts anzeigen, wenn noch keine Form-Daten existieren
  if (!hasData) return null;

  const downloadPreviewAsPng = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: "#ffffff",
      scale: 3,
      useCORS: true,
      logging: false,
    });

    const pngUrl = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = "visitenkarte.png";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const downloadPreviewAsPdf = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, {
      backgroundColor: "#ffffff",
      scale: 3,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("visitenkarte.pdf");
  };

  return (
    <div className="export-buttons">
      <button
        type="button"
        className="export-btn"
        onClick={downloadPreviewAsPng}
      >
        Visitenkarte als PNG herunterladen
      </button>

      <button
        type="button"
        className="export-btn"
        onClick={downloadPreviewAsPdf}
      >
        Visitenkarte als PDF herunterladen
      </button>
    </div>
  );
};

export default ExportButtons;