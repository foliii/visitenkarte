import React from 'react';
import QRCodeComponent from '../../qrCode/qrVcard';

const Visitenkarte = ({ data, design, onDesignChange }) => {
  if (!data) return null;

  const fontSizeMap = {
    small: '12px',
    medium: '16px',
    large: '20px'
  };


 return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '24px',
        fontFamily: design.fontFamily,
        fontSize: fontSizeMap[design.fontSize]
      }}
    >
      {/* Linke Seite */}
      <div>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>
          {data.firstName} {data.lastName}
        </div>

        <div style={{ marginBottom: '12px' }}>
          {data.position}
        </div>

        {data.phone && <div>{data.phone}</div>}
        {data.email && <div>{data.email}</div>}
      </div>

      {/* Rechte Seite */}
      <div>
        <QRCodeComponent data={data} />
      </div>
    </div>
  );
};

export default Visitenkarte;
