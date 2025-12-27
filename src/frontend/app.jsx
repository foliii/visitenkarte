import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

import Form from "./form/form";
import Visitenkarte from "./preview/visitenkarte";

const App = () => {
  const [formData, setFormData] = useState(null);

  const [design, setDesign] = useState({
    fontFamily: "Arial",
    fontSize: "medium",
  });

  // Ref zeigt NUR auf die Preview
  const previewRef = useRef(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  const handleDesignChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  return (
    <div className="form-qr-layout">
      {/* LINKS: Formular + Export Button */}
      <div className="left-col">
        <Form onSubmit={handleFormSubmit} />

        {formData && (
          <button
            type="button"
            className="export-btn"
            onClick={downloadPreviewAsPng}
          >
            Visitenkarte als PNG herunterladen
          </button>
        )}
      </div>

      {/* RECHTS: Vorschau + Design */}
      <div className="qr-container">
        <h2 className="qr-title">Visitenkarte</h2>

        <div className="qr-box">
          {formData ? (
            <div ref={previewRef}>
              <Visitenkarte data={formData} design={design} />
            </div>
          ) : (
            <span className="qr-placeholder">Vorschau der Visitenkarte</span>
          )}
        </div>

        {formData && (
          <div className="design-card">
            <h3>Design der Visitenkarte</h3>

            <div className="design-row">
              <label>Schriftart</label>
              <select
                name="fontFamily"
                value={design.fontFamily}
                onChange={handleDesignChange}
              >
                <option value="Arial">Arial</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>

            <div className="design-row">
              <label>Schriftgröße</label>
              <select
                name="fontSize"
                value={design.fontSize}
                onChange={handleDesignChange}
              >
                <option value="small">Klein</option>
                <option value="medium">Mittel</option>
                <option value="large">Groß</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
