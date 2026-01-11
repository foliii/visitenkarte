import React from "react";
import "./style.css";
import QRCodeComponent from "../../qrCode/qrVcard";

/* Zentrale Mapping-Logik */
const POSITION_LABELS = {
  Verkaufsberater: { frau: 'Verkaufsberaterin', herr: 'Verkaufsberater' },
  Kundendienstleiter: { frau: 'Kundendienstleiterin', herr: 'Kundendienstleiter' },
  Werkstattleiter: { frau: 'Werkstattleiterin', herr: 'Werkstattleiter' },
  Fuhrparkmanager: { frau: 'Fuhrparkmanagerin', herr: 'Fuhrparkmanager' },
  Marketingmanager: { frau: 'Marketingmanagerin', herr: 'Marketingmanager' },
  Geschäftsführung: { frau: 'Geschäftsführung', herr: 'Geschäftsführung' },
  'Assistenz der Geschäftsführung': {
    frau: 'Assistenz der Geschäftsführung',
    herr: 'Assistenz der Geschäftsführung'
  }
};

const Visitenkarte = ({ data, design }) => {
  if (!data) return null;

  const fontSizeMap = {
    small: "13px",
    medium: "16px",
    large: "19px",
  };

  const displayPosition =
    POSITION_LABELS[data.position]?.[data.salutation] || data.position;

  return (
    <div
      className="card-canvas"
      style={{
        fontFamily: design?.fontFamily || "Arial",
        fontSize: fontSizeMap[design?.fontSize] || fontSizeMap.medium,
      }}
    >
      <div className="card-text">
        <div className="card-name">
          {data.firstName} {data.lastName}
        </div>

        {displayPosition && (
          <div className="card-position">{displayPosition}</div>
        )}

        {data.phone && <div className="card-meta">{data.phone}</div>}
        {data.email && <div className="card-meta">{data.email}</div>}
      </div>

      <div className="card-qr">
        <QRCodeComponent data={data} />
      </div>
    </div>
  );
};

export default Visitenkarte;
