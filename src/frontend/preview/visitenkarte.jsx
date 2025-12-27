import React from "react";
import QRCodeComponent from "../../qrCode/qrVcard";

const Visitenkarte = ({ data, design }) => {
  if (!data) return null;

  const fontSizeMap = {
    small: "12px",
    medium: "16px",
    large: "20px",
  };

  const safeDesign = {
    fontFamily: design?.fontFamily || "Arial",
    fontSize: design?.fontSize || "medium",
  };

  return (
    <div
      className="card-canvas"
      style={{
        fontFamily: safeDesign.fontFamily,
        fontSize: fontSizeMap[safeDesign.fontSize] || fontSizeMap.medium,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "24px",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 600, marginBottom: "4px", color: "#0b1220" }}>
            {(data.firstName || "")} {(data.lastName || "")}
          </div>

          {data.position ? (
            <div style={{ marginBottom: "12px", color: "#0b1220", opacity: 0.85 }}>
              {data.position}
            </div>
          ) : null}

          {data.phone ? <div style={{ color: "#0b1220", opacity: 0.9 }}>{data.phone}</div> : null}
          {data.email ? <div style={{ color: "#0b1220", opacity: 0.9 }}>{data.email}</div> : null}
        </div>

        <div className="card-qr">
          <QRCodeComponent data={data} />
        </div>
      </div>
    </div>
  );
};

export default Visitenkarte;
