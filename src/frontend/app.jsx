import React, { useState } from 'react';
import Form from './form/form';
import Visitenkarte from './preview/visitenkarte';

const App = () => {
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div className="form-qr-layout">
      {/* links: Formular */}
      <Form onSubmit={handleFormSubmit} />

      {/* rechts: EINZIGE Vorschau */}
      <div className="qr-container">
        <h2 className="qr-title">Visitenkarte</h2>

        <div className="qr-box">
          {formData ? (
            <Visitenkarte data={formData} />
          ) : (
            <span className="qr-placeholder">
              Vorschau der Visitenkarte
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
