const nameIn=document.getElementById('name');
const titleIn=document.getElementById('title');
const phoneIn=document.getElementById('phone');
const landlineIn=document.getElementById('landline');
const emailIn=document.getElementById('email');
const addressIn=document.getElementById('address');
const urlIn=document.getElementById('url');
const fontSel=document.getElementById('font');
const sizeSel=document.getElementById('fontsize');
const qrType=document.getElementById('qrtype');

const fieldName=document.getElementById('field-name');
const fieldTitle=document.getElementById('field-title');
const fieldPhone=document.getElementById('field-phone');
const fieldLandline=document.getElementById('field-landline');
const fieldEmail=document.getElementById('field-email');
const fieldAddress=document.getElementById('field-address');
const fieldUrl=document.getElementById('field-url');
const qrDiv=document.getElementById('qr');
const card=document.getElementById('card');

function updatePreview(){
  fieldName.textContent=nameIn.value;
  fieldTitle.textContent=titleIn.value;
  fieldPhone.textContent=phoneIn.value;
  fieldLandline.textContent=landlineIn.value;
  fieldEmail.textContent=emailIn.value;
  fieldAddress.textContent=addressIn.value;
  fieldUrl.textContent=urlIn.value;

  card.style.fontFamily=fontSel.value;
  const s=parseInt(sizeSel.value);
  fieldName.style.fontSize=(s+2)+'px';
  fieldTitle.style.fontSize=s+'px';

  const data={
    name:nameIn.value,
    title:titleIn.value,
    company:'Autohaus Muster GmbH',
    phone:phoneIn.value,
    landline:landlineIn.value,
    email:emailIn.value,
    address:addressIn.value,
    url:urlIn.value
  };

  let payload='';

  if(qrType.value==='vcard'){
    payload = window.makeVCard(data);
  }
  else if(qrType.value==='url'){
    payload = data.url || '';
  }
  else if(qrType.value==='mailto'){
    payload='mailto:'+(data.email||'');
  }
  else if(qrType.value==='geo'){
    payload='geo:'+(data.url||'');
  }
  else if(qrType.value==='event'){
    const start=new Date();
    const end=new Date(Date.now()+3600000);
    const pad=n=>String(n).padStart(2,'0');
    const toICS=d=>(d.getUTCFullYear()+pad(d.getUTCMonth()+1)+pad(d.getUTCDate())+'T'+pad(d.getUTCHours())+pad(d.getUTCMinutes())+pad(d.getUTCSeconds())+'Z');
    payload=`BEGIN:VEVENT
SUMMARY:${titleIn.value||'Event'}
DTSTART:${toICS(start)}
DTEND:${toICS(end)}
END:VEVENT`;
  }

  const imgSrc = window.generateQR(payload);
  qrDiv.innerHTML='';
  const img=document.createElement('img');
  img.src=imgSrc;
  img.style.width='100%';
  img.style.height='100%';
  qrDiv.appendChild(img);
}

updatePreview();

document.getElementById('update').onclick=updatePreview;

document.getElementById('download-vcard').onclick=()=>{
  const v=makeVCard({
    name:nameIn.value,
    title:titleIn.value,
    company:'Autohaus Muster GmbH',
    phone:phoneIn.value,
    landline:landlineIn.value,
    email:emailIn.value,
    address:addressIn.value,
    url:urlIn.value
  });
  const blob=new Blob([v],{type:'text/vcard;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download='visitenkarte.vcf';
  a.click();
};

document.getElementById('download-qr').onclick=()=>{
  const imgSrc = qr.toDataURL("image/png");
  const a=document.createElement('a');
  a.href=imgSrc;
  a.download='qr.png';
  a.click();
};

document.getElementById('download-card-png').onclick=()=>{
  html2canvas(card,{scale:2}).then(c=>{
    const a=document.createElement('a');
    a.href=c.toDataURL('image/png');
    a.download='visitenkarte.png';
    a.click();
  });
};

document.getElementById('export-jpg').onclick=async()=>{
  const c=await html2canvas(card,{scale:2});
  const a=document.createElement('a');
  a.href=c.toDataURL('image/jpeg',0.95);
  a.download='visitenkarte.jpg';
  a.click();
};

document.getElementById('export-pdf').onclick=async()=>{
  const { jsPDF } = window.jspdf;
  const c=await html2canvas(card,{scale:2});
  const img=c.toDataURL('image/png');
  const pdf=new jsPDF({unit:'mm',format:[90,50]});
  pdf.addImage(img,'PNG',0,0,90,50);
  pdf.save('visitenkarte.pdf');
};

//
// ⭐ NEUE FUNKTION: vCard-QR ALS JPEG EXPORTIEREN
//

document.getElementById('download-vcard-qr-jpg').onclick = () => {

  if (qrType.value !== 'vcard') {
    alert('Bitte im QR-Inhalt "vCard" auswählen.');
    return;
  }

  const vcard = makeVCard({
    name: nameIn.value,
    title: titleIn.value,
    company: 'Autohaus Muster GmbH',
    phone: phoneIn.value,
    landline: landlineIn.value,
    email: emailIn.value,
    address: addressIn.value,
    url: urlIn.value
  });

  const pngDataUrl = window.generateQR(vcard);

  const img = new Image();
  img.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(img, 0, 0);

    const jpegDataUrl = canvas.toDataURL('image/jpeg', 0.95);

    const a = document.createElement('a');
    a.href = jpegDataUrl;
    a.download = 'vcard-qr.jpg';
    a.click();
  };

  img.src = pngDataUrl;
};
