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

  const [errors, setErrors] = useState({});

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

    if (!formData.firstName.trim())
      newErrors.firstName = 'Bitte Vornamen eingeben.';

    if (!formData.lastName.trim())
      newErrors.lastName = 'Bitte Nachnamen eingeben.';

    if (!formData.position.trim())
      newErrors.position = 'Bitte Funktion eingeben.';

    if (!formData.phone.trim())
      newErrors.phone = 'Bitte Telefonnummer eingeben.';

    if (!formData.email.trim())
      newErrors.email = 'Bitte E-Mail-Adresse eingeben.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Personendaten</h2>

      {/* Vorname */}
      <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
        <label>Vorname<span className="required-star">*</span></label>
        <input
          className="form-input"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
      </div>

      {/* Nachname */}
      <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
        <label>Nachname<span className="required-star">*</span></label>
        <input
          className="form-input"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      </div>

      {/* Funktion */}
      <div className={`form-group ${errors.position ? 'has-error' : ''}`}>
        <label>Funktion<span className="required-star">*</span></label>
        <input
          className="form-input"
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
        {errors.position && <span className="error-text">{errors.position}</span>}
      </div>

      {/* Telefon */}
      <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
        <label>Telefon<span className="required-star">*</span></label>
        <input
          className="form-input"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      {/* E-Mail */}
      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label>E-Mail<span className="required-star">*</span></label>
        <input
          className="form-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      {/* QR-Code-Art */}
      <div className="form-group">
        <label>QR-Code-Art</label>
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
  );
};

export default Form;
