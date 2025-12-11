import React, { useState } from 'react';
import "./style.css";

// Formular wird hier aktualisiert wenn sich was ändert das macht UseState
const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

 return (
    <div className="form-qr-layout">
      {/* Linke Box: Formulardaten */}
      <form className="form-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Personendaten</h2>

        <div className="form-group">
          <label>Vorname:</label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nachname:</label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Funktion:</label>
          <input
            className="form-input"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Telefon (mobil):</label>
          <input
            className="form-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>E-Mail:</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          Speichern
        </button>
      </form>

      {/* Rechte Box: QR-Code / Visitenkarte (aktuell noch Platzhalter) */}
      <div className="qr-container">
        <h2 className="qr-title">QR-Code / Visitenkarte</h2>
        <div className="qr-box">
          {/* später einfügen hier für  QR-Code und  Visitenkarte rendern */}
          <span className="qr-placeholder">
            QR-Code wird hier angezeigt
          </span>
        </div>
      </div>
    </div>
  );
};

export default Form;
