import React, { useState } from 'react';
import Form from './form/form';
import QRCodeComponent from '../qrCode/qrVcard';

const App = () => {
  const [formData, setFormData] = useState({  //Use State verwaltet den Zustand der Komponente, wenn sich was ändert wird diese dann angepasst
    firstName: '',
    lastName: '',
    position: ''
  });

  const handleFormSubmit = (data) => { //Die Eingegebenen Dateien werden hier im Zustand gespeichert
    setFormData(data);
  };

  return (
    <div>
      <h1>Visitenkarte</h1>
      <Form onSubmit={handleFormSubmit} />
      <QRCodeComponent data={formData} /> /*QR Code wird anhand der aktuellen formData Daten generiert */
    </div>
  );
};

export default App;