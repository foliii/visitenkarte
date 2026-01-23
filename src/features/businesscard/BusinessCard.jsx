import React from "react";
import "./businesscard.css";
import QRCodeComponent from "../../qrCode/qrVcard";
import Logo from "../../assets/Logo_Autohaus.png";

/* Zentrale Mapping-Logik */
const POSITION_LABELS = {
  Verkaufsberater: { frau: "Verkaufsberaterin", herr: "Verkaufsberater" },
  Kundendienstleiter: { frau: "Kundendienstleiterin", herr: "Kundendienstleiter" },
  Werkstattleiter: { frau: "Werkstattleiterin", herr: "Werkstattleiter" },
  Fuhrparkmanager: { frau: "Fuhrparkmanagerin", herr: "Fuhrparkmanager" },
  Marketingmanager: { frau: "Marketingmanagerin", herr: "Marketingmanager" },
  Geschäftsführung: { frau: "Geschäftsführung", herr: "Geschäftsführung" },
  "Assistenz der Geschäftsführung": {
    frau: "Assistenz der Geschäftsführung",
    herr: "Assistenz der Geschäftsführung",
  },
};

const Visitenkarte = ({ data, design }) => {
  if (!data) return null;

  const fontSizeMap = {
    small: "13px",
    medium: "15px",
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
      {/* LINKER BEREICH – MITARBEITER */}
      <div className="card-text">
        <div className="card-name">
          {data.firstName}&nbsp;{data.lastName}
        </div>

        {displayPosition && (
          <div className="card-position">{displayPosition}</div>
        )}

        {data.phone && (
          <div className="card-meta">Tel: {data.phone}</div>
        )}

        {data.email && (
          <div className="card-meta">E-Mail: {data.email}</div>
        )}

        <div className="card-web">www.autohaus-muster.de</div>
      </div>

      {/* RECHTER BEREICH – FIRMA */}
      <div className="card-company">
        <img src={Logo} alt="Autohaus Logo" className="card-logo" />

        <div className="company-name">Muster GmbH Mosbach</div>

        <div className="company-separator"></div>

        <div className="company-address">
          Musterstraße 12<br />
          74821 Mosbach
        </div>

        <div className="card-qr">
          <QRCodeComponent data={data} />
        </div>
      </div>
    </div>
  );
};

export default Visitenkarte;
