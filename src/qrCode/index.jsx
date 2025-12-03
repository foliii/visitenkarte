let qr;

function generateQR(payload) {
  if (!qr) {
    qr = new QRious({
      element: document.createElement('canvas'),
      size: 80
    });
  }
  qr.set({ value: payload || " " });
  return qr.toDataURL("image/png");
}

window.generateQR = generateQR;