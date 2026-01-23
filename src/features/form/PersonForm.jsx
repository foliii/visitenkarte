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
      newErrors.firstName = "Bitte gültigen Vornamen eingeben.";

    if (!nameRegex.test(formData.lastName.trim()))
      newErrors.lastName = "Bitte gültigen Nachnamen eingeben.";

    if (!POSITION_OPTIONS.includes(formData.position))
      newErrors.position = "Bitte eine Funktion auswählen.";

    if (!phoneRegex.test(formData.phone.trim()))
      newErrors.phone = "Bitte gültige Telefonnummer eingeben.";

    // E-Mail nur prüfen, wenn sie gebraucht wird
    if (
      (formData.qrType === "mail" || formData.qrType === "vcard") &&
      !emailRegex.test(formData.email.trim())
    ) {
      newErrors.email = "Bitte gültige E-Mail-Adresse eingeben.";
    }

    if (formData.qrType === "url" && !urlRegex.test(formData.url.trim()))
      newErrors.url = "Bitte gültige URL eingeben.";

    if (formData.qrType === "location" && !formData.locationAddress.trim())
      newErrors.locationAddress = "Bitte Adresse eingeben.";

    if (formData.qrType === "event") {
      if (!formData.eventTitle.trim())
        newErrors.eventTitle = "Bitte Titel eingeben.";
      if (!formData.eventDate)
        newErrors.eventDate = "Bitte Datum auswählen.";
      if (!formData.eventTime)
        newErrors.eventTime = "Bitte Uhrzeit auswählen.";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit(formData);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} noValidate>
      <h2 className="form-title">Personendaten</h2>

      <div className="form-group">
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

      <div className="form-group">
        <label>Vorname*</label>
        <input
          className="form-input"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Nachname*</label>
        <input
          className="form-input"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Funktion*</label>
        <select
          className="form-input"
          name="position"
          value={formData.position}
          onChange={handleChange}
        >
          <option value="">Bitte auswählen</option>
          {POSITION_OPTIONS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Telefon*</label>
        <input
          className="form-input"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>E-Mail*</label>
        <input
          className="form-input"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

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

      {formData.qrType === "mail" && (
        <div className="form-group">
          <label>E-Mail-Adresse*</label>
          <input
            className="form-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      )}

      {formData.qrType === "url" && (
        <div className="form-group">
          <label>Webseite*</label>
          <input
            className="form-input"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
        </div>
      )}

      {formData.qrType === "location" && (
        <div className="form-group">
          <label>Adresse*</label>
          <input
            className="form-input"
            name="locationAddress"
            placeholder="z. B. Musterstraße 12, 74821 Mosbach"
            value={formData.locationAddress}
            onChange={handleChange}
          />
        </div>
      )}

      {formData.qrType === "event" && (
        <>
          <div className="form-group">
            <label>Event-Titel*</label>
            <input
              className="form-input"
              name="eventTitle"
              value={formData.eventTitle}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Datum*</label>
            <input
              className="form-input"
              type="date"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Uhrzeit*</label>
            <input
              className="form-input"
              type="time"
              name="eventTime"
              value={formData.eventTime}
              onChange={handleChange}
            />
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
