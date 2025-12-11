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

    // Fehlerzustand für Pflichtfelder
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    position: ''
  });

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });

  // Fehler für dieses Feld zurücksetzen, sobald der User tippt
  setErrors((prev) => ({
    ...prev,
    [name]: ''   // falls es dafür einen Fehler gab, löschen
  }));
};

 const handleSubmit = (e) => {
    e.preventDefault();

    // einfache Pflichtfeldprüfung
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Bitte Vornamen eingeben.';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Bitte Nachnamen eingeben.';
    }
    if (!formData.position.trim()) {
      newErrors.position = 'Bitte Funktion eingeben.';
    }


    // Fehler im State speichern
    setErrors((prev) => ({
      ...prev,
      ...newErrors
    }));

    // wenn Fehler vorhanden, Formular nicht absenden
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    onSubmit(formData);
  };
 return (
    <div className="form-qr-layout">
      {/* Linke Box: Formulardaten */}
      <form
        className="form-container"
        onSubmit={handleSubmit}
        noValidate
      >
    <h2 className="form-title">Personendaten</h2>

        {/* Hinweis für Pflichtfelder */}
        <p className="required-hint">
          <span className="required-star">*</span> Pflichtfeld
        </p>

        <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}> {/* has-error */}
          <label>
            Vorname<span className="required-star">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        {/* Fehlermeldung */}
          {errors.firstName && (
            <span className="error-text">{errors.firstName}</span>
          )}
        </div>

        <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}> {/* has-error */}
          <label>
            Nachname<span className="required-star">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        {/* Fehlermeldung */}
          {errors.lastName && (
            <span className="error-text">{errors.lastName}</span>
          )}
        </div>

        <div className={`form-group ${errors.position ? 'has-error' : ''}`}> {/* has-error */}
          <label>
            Funktion<span className="required-star">*</span>
          </label>
          <input
            className="form-input"
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            required
          />
        {/* Fehlermeldung */}
          {errors.position && (
            <span className="error-text">{errors.position}</span>
          )}
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
