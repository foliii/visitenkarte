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
