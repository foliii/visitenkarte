import React, { useState } from "react";
import "./form.css";

const nameRegex = /^[A-Za-zÀ-ÿßäöüÄÖÜ\-'\s]{2,50}$/;
const phoneRegex = /^\+?[0-9\s\-()/]{6,20}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const urlRegex = /^(https?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/i;

const POSITION_OPTIONS = [
  "Verkaufsberater",
  "Kundendienstleiter",
  "Werkstattleiter",
  "Fuhrparkmanager",
  "Marketingmanager",
  "Geschäftsführung",
  "Assistenz der Geschäftsführung",
];

const PersonForm = ({ onSubmit, hasCard }) => {
  const [formData, setFormData] = useState({
    salutation: "frau",
    firstName: "",
    lastName: "",
    position: "",
    phone: "",
    email: "",
    qrType: "vcard",
    url: "",
    locationAddress: "",
    eventTitle: "",
    eventDate: "",
    eventTime: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!nameRegex.test(formData.firstName.trim()))
      newErrors.firstName = "Bitte Vorname ausfüllen.";

    if (!nameRegex.test(formData.lastName.trim()))
      newErrors.lastName = "Bitte Nachname ausfüllen.";

    if (!POSITION_OPTIONS.includes(formData.position))
      newErrors.position = "Bitte Funktion auswählen.";

    if (!phoneRegex.test(formData.phone.trim()))
      newErrors.phone = "Bitte Telefonnummer eingeben.";

    if (
      (formData.qrType === "mail" || formData.qrType === "vcard") &&
      !emailRegex.test(formData.email.trim())
    )
      newErrors.email = "Bitte gültige E-Mail-Adresse eingeben.";

    if (formData.qrType === "url" && !urlRegex.test(formData.url.trim()))
      newErrors.url = "Bitte Webseite angeben.";

    if (formData.qrType === "location" && !formData.locationAddress.trim())
      newErrors.locationAddress = "Bitte Adresse eingeben.";

    if (formData.qrType === "event") {
      if (!formData.eventTitle.trim())
        newErrors.eventTitle = "Bitte Event-Titel eingeben.";
      if (!formData.eventDate)
        newErrors.eventDate = "Bitte Datum auswählen.";
      if (!formData.eventTime)
        newErrors.eventTime = "Bitte Uhrzeit auswählen.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  const fg = (name) => `form-group ${errors[name] ? "has-error" : ""}`;

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Personendaten</h2>

      <div className={fg("salutation")}>
        <label>Anrede*</label>
        <select
          className="form-input"
          name="salutation"
          value={formData.salutation}
          onChange={handleChange}
        >
          <option value="frau">Frau</option>
          <option value="herr">Herr</option>
        </select>
      </div>

      <div className={fg("firstName")}>
        <label>Vorname*</label>
        <input className="form-input" name="firstName" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error-text">{errors.firstName}</span>}
      </div>

      <div className={fg("lastName")}>
        <label>Nachname*</label>
        <input className="form-input" name="lastName" value={formData.lastName} onChange={handleChange} />
        {errors.lastName && <span className="error-text">{errors.lastName}</span>}
      </div>

      <div className={fg("position")}>
        <label>Funktion*</label>
        <select className="form-input" name="position" value={formData.position} onChange={handleChange}>
          <option value="">Bitte auswählen</option>
          {POSITION_OPTIONS.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        {errors.position && <span className="error-text">{errors.position}</span>}
      </div>

      <div className={fg("phone")}>
        <label>Telefon*</label>
        <input className="form-input" name="phone" value={formData.phone} onChange={handleChange} />
        {errors.phone && <span className="error-text">{errors.phone}</span>}
      </div>

      <div className={fg("email")}>
        <label>E-Mail*</label>
        <input className="form-input" name="email" value={formData.email} onChange={handleChange} />
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

      {formData.qrType === "url" && (
        <div className={fg("url")}>
          <label>Webseite*</label>
          <input className="form-input" name="url" value={formData.url} onChange={handleChange} />
          {errors.url && <span className="error-text">{errors.url}</span>}
        </div>
      )}

      {formData.qrType === "location" && (
        <div className={fg("locationAddress")}>
          <label>Adresse*</label>
          <input className="form-input" name="locationAddress" value={formData.locationAddress} onChange={handleChange} />
          {errors.locationAddress && <span className="error-text">{errors.locationAddress}</span>}
        </div>
      )}

      {formData.qrType === "event" && (
        <>
          <div className={fg("eventTitle")}>
            <label>Event-Titel*</label>
            <input className="form-input" name="eventTitle" value={formData.eventTitle} onChange={handleChange} />
            {errors.eventTitle && <span className="error-text">{errors.eventTitle}</span>}
          </div>

          <div className={fg("eventDate")}>
            <label>Datum*</label>
            <input className="form-input" type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} />
            {errors.eventDate && <span className="error-text">{errors.eventDate}</span>}
          </div>

          <div className={fg("eventTime")}>
            <label>Uhrzeit*</label>
            <input className="form-input" type="time" name="eventTime" value={formData.eventTime} onChange={handleChange} />
            {errors.eventTime && <span className="error-text">{errors.eventTime}</span>}
          </div>
        </>
      )}

      <button className="submit-btn" type="submit">
        {hasCard ? "Aktualisieren" : "Visitenkarte erstellen"}
      </button>
    </form>
  );
};

export default PersonForm;
