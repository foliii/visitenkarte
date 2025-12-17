import React, { useState } from 'react';
import "./style.css";

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    email: '',
    qrType: 'vcard' 
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    position: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'Bitte Vornamen eingeben.';
    if (!formData.lastName.trim()) newErrors.lastName = 'Bitte Nachnamen eingeben.';
    if (!formData.position.trim()) newErrors.position = 'Bitte Funktion eingeben.';
    
    setErrors((prev) => ({ ...prev, ...newErrors }));

    if (Object.keys(newErrors).length > 0) return;
    
    onSubmit(formData);
  };

  return (
    <div className="form-qr-layout">
      <form className="form-container" onSubmit={handleSubmit} noValidate>
        <h2 className="form-title">Personendaten</h2>

        <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
          <label>Vorname<span className="required-star">*</span></label>
          <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          {errors.firstName && <span className="error-text">{errors.firstName}</span>}
        </div>

        <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
          <label>Nachname<span className="required-star">*</span></label>
          <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          {errors.lastName && <span className="error-text">{errors.lastName}</span>}
        </div>

        <div className={`form-group ${errors.position ? 'has-error' : ''}`}>
          <label>Funktion<span className="required-star">*</span></label>
          <input className="form-input" type="text" name="position" value={formData.position} onChange={handleChange} required />
          {errors.position && <span className="error-text">{errors.position}</span>}
        </div>

        <div className="form-group">
          <label>Telefon (mobil):</label>
          <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label>E-Mail:</label>
          <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* 👇 NEU: QR-Code-Art */}
        <div className="form-group">
          <label>QR-Code-Art:</label>
          <select
            className="form-input"
            name="qrType"
            value={formData.qrType}
            onChange={handleChange}
          >
            <option value="vcard">Kontakt (vCard)</option>
            <option value="mail">E-Mail</option>
            <option value="url">Webseite</option>
            <option value="location">Standort</option>
            <option value="event">Event</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Speichern</button>
      </form>
    </div>
  );
};

export default Form;
