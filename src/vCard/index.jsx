function escapeVCard(str){
  if(!str) return '';
  return str.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,');
}

function makeVCard(data){
  const lines=[];
  lines.push('BEGIN:VCARD');
  lines.push('VERSION:3.0');
  lines.push('N:'+escapeVCard(data.name));
  lines.push('FN:'+escapeVCard(data.name));
  lines.push('ORG:'+escapeVCard(data.company));
  if(data.title) lines.push('TITLE:'+escapeVCard(data.title));
  if(data.phone) lines.push('TEL;TYPE=CELL:'+escapeVCard(data.phone));
  if(data.landline) lines.push('TEL;TYPE=WORK:'+escapeVCard(data.landline));
  if(data.email) lines.push('EMAIL;TYPE=INTERNET:'+escapeVCard(data.email));
  if(data.address) lines.push('ADR;TYPE=WORK:;;'+escapeVCard(data.address.replace(/\n/g,';')));
  if(data.url) lines.push('URL:'+data.url);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

window.makeVCard = makeVCard;