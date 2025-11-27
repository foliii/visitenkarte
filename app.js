<script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>

// Dropdowns mit Beispieldaten füllen
document.addEventListener("DOMContentLoaded", () => {

    const posSelect = document.getElementById("position");
    const locSelect = document.getElementById("location");

    POSITIONS.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.innerText = p;
        posSelect.appendChild(opt);
    });

    LOCATIONS.forEach(l => {
        const opt = document.createElement("option");
        opt.value = l;
        opt.innerText = l;
        locSelect.appendChild(opt);
    });

});


// Felder live updaten
const bind = (inputId, previewId, prefix = "") => {
    document.getElementById(inputId).addEventListener("input", e => {
        document.getElementById(previewId).innerText = prefix + e.target.value;
    });
};

bind("fullName", "pName");
bind("position", "pPosition");
bind("location", "pLocation");
bind("email", "pEmail");
bind("mobile", "pMobile", "Mobil: ");
bind("phone", "pPhone", "Tel.: ");
bind("website", "pWebsite");


// Zurücksetzen
document.getElementById("resetBtn").addEventListener("click", () => {
    document.querySelectorAll("input").forEach(i => i.value = "");
    document.querySelectorAll("select").forEach(s => s.selectedIndex = 0);

    document.getElementById("pName").innerText = "Max Mustermann";
    document.getElementById("pPosition").innerText = "Beispiel Position";
    document.getElementById("pLocation").innerText = "Standort";
    document.getElementById("pEmail").innerText = "max@firma.de";
    document.getElementById("pMobile").innerText = "Mobil: ...";
    document.getElementById("pPhone").innerText = "Tel.: ...";
    document.getElementById("pWebsite").innerText = "www.firma.de";
});

function generateVCard() {
    const name = document.getElementById("fullName").value || "";
    const position = document.getElementById("position").value || "";
    const location = document.getElementById("location").value || "";
    const email = document.getElementById("email").value || "";
    const mobile = document.getElementById("mobile").value || "";
    const phone = document.getElementById("phone").value || "";
    const website = document.getElementById("website").value || "";

    const vcard =
`BEGIN:VCARD
VERSION:3.0
N:${name}
TITLE:${position}
ADR;WORK:${location}
EMAIL:${email}
TEL;CELL:${mobile}
TEL;WORK:${phone}
URL:${website}
END:VCARD`;

    return vcard;
}


// ----------------------
// QR aktualisieren
// ----------------------

let qr;

function updateQRCode() {
    const container = document.getElementById("qrContainer");
    container.innerHTML = ""; // alten QR löschen

    const vcardData = generateVCard();

    qr = new QRCode(container, {
        text: vcardData,
        width: 120,
        height: 120
    });
}


// ----------------------
// QR bei jeder Änderung aktualisieren
// ----------------------
[
    "fullName", "position", "location", "email",
    "mobile", "phone", "website"
].forEach(id => {
    document.getElementById(id).addEventListener("input", updateQRCode);
});

// Initial erzeugen
updateQRCode();
