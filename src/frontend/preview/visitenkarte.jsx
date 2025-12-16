import React from 'react';
import QRCodeComponent from '../../qrCode/qrVcard';

const Visitenkarte = ({ data }) => {
  if (!data) return null;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        gap: '24px'
      }}
    >
      {/* Linke Seite: Text */}
      <div>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
          {data.firstName} {data.lastName}
        </div>

        <div style={{ marginBottom: '12px' }}>
          {data.position}
        </div>

        {data.phone && (
          <div>{data.phone}</div>
        )}

        {data.email && (
          <div>{data.email}</div>
        )}
      </div>

      {/* Rechte Seite: QR-Code */}
      <div>
        <QRCodeComponent data={data} />
      </div>
    </div>
  );
};

export default Visitenkarte;
