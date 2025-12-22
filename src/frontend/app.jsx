import React, { useState } from 'react';
import Form from './form/form';
import Visitenkarte from './preview/visitenkarte';

const App = () => {
  const [formData, setFormData] = useState(null);

  const [design, setDesign] = useState({
    fontFamily: 'Arial',
    fontSize: 'medium'
  });

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

const handleDesignChange = (e) => {
    const { name, value } = e.target;
    setDesign((prev) => ({
      ...prev,
      [name]: value
    }));
  };

return (
    <div className="form-qr-layout">
      {/* links: Formular */}
      <Form onSubmit={handleFormSubmit} />

      {/* rechts: Vorschau + Design */}
      <div className="qr-container">
        <h2 className="qr-title">Visitenkarte</h2>

        {/* Vorschau */}
        <div className="qr-box">
          {formData ? (
            <Visitenkarte
              data={formData}
              design={design}
            />
          ) : (
            <span className="qr-placeholder">
              Vorschau der Visitenkarte
            </span>
          )}
        </div>

        {/*DESIGN Änderungen*/}
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
