import React, { useState } from 'react';
import "./form.css";

const nameRegex = /^[A-Za-zÀ-ÿßäöüÄÖÜ\-'\s]{2,50}$/;
const phoneRegex = /^\+?[0-9\s\-()/]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const urlRegex = /^(https?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/i;

const POSITION_OPTIONS = [
  'Verkaufsberater',
  'Kundendienstleiter',
  'Werkstattleiter',
  'Fuhrparkmanager',
  'Marketingmanager',
  'Geschäftsführung',
  'Assistenz der Geschäftsführung'
];

const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    salutation: 'frau',
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    email: '',
    qrType: 'vcard',
    url: '',
    fontSize: 'medium' // 👉 Default & Maximum
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!nameRegex.test(formData.firstName.trim())) {
      newErrors.firstName = 'Bitte gültigen Vornamen eingeben (mind. 2 Buchstaben).';
    }

    if (!nameRegex.test(formData.lastName.trim())) {
      newErrors.lastName = 'Bitte gültigen Nachnamen eingeben (mind. 2 Buchstaben).';
    }

    if (!POSITION_OPTIONS.includes(formData.position)) {
      newErrors.position = 'Bitte eine Funktion auswählen.';
    }

    if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'Bitte gültige Telefonnummer eingeben.';
    }

    if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Bitte gültige E-Mail-Adresse eingeben.';
    }

    if (formData.qrType === 'url' && !urlRegex.test(formData.url.trim())) {
      newErrors.url = 'Bitte eine gültige URL inkl. https:// eingeben.';
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Personendaten</h2>

      <div className="form-group">
        <label>Anrede<span className="required-star">*</span></label>
        <select className="form-input" name="salutation" value={formData.salutation} onChange={handleChange}>
          <option value="frau">Frau</option>
          <option value="herr">Herr</option>
        </select>
      </div>

      <div className={`form-group ${errors.firstName ? 'has-error' : ''}`}>
        <label>Vorname<span className="required-star">*</span></label>
        <input className="form-input" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
      </div>

      <div className={`form-group ${errors.lastName ? 'has-error' : ''}`}>
        <label>Nachname<span className="required-star">*</span></label>
        <input className="form-input" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      </div>

      <div className={`form-group ${errors.position ? 'has-error' : ''}`}>
        <label>Funktion<span className="required-star">*</span></label>
        <select className="form-input" name="position" value={formData.position} onChange={handleChange}>
          <option value="">Bitte auswählen</option>
          {POSITION_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {errors.position && <span className="error-text">{errors.position}</span>}
      </div>

      <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
        <label>Telefon<span className="required-star">*</span></label>
        <input className="form-input" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label>E-Mail<span className="required-star">*</span></label>
        <input className="form-input" type="email" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error-text">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>QR-Code-Art</label>
        <select className="form-input" name="qrType" value={formData.qrType} onChange={handleChange}>
          <option value="vcard">Kontakt (vCard)</option>
          <option value="mail">E-Mail</option>
          <option value="url">Webseite</option>
          <option value="location">Standort</option>
          <option value="event">Event</option>
        </select>
      </div>

      {formData.qrType === 'url' && (
        <div className={`form-group ${errors.url ? 'has-error' : ''}`}>
          <label>Webseite<span className="required-star">*</span></label>
          <input className="form-input" type="url" name="url" value={formData.url} onChange={handleChange} />
          {errors.url && <span className="error-text">{errors.url}</span>}
        </div>
      )}

      <button type="submit" className="submit-btn">Speichern</button>
    </form>
  );
};

export default Form;
