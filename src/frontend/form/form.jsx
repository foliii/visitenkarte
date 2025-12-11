import React, { useState } from 'react';
import "./style.css";

// Formular wird hier aktualisiert wenn sich was ändert das macht UseState
const Form = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    position: ''
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

      <button type="submit" className="submit-btn">
        Speichern
      </button>
    </form>
  );
};

export default Form;
