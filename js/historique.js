// HISTORIQUE
function renderApH(d){
  document.getElementById('ap-h-list').innerHTML=d.histo.map(function(h){
    return '<div class="aitem"><div class="aitem-t">'+(h.gold==='oui'?'⭐ ':'')+h.date+' — '+h.titre+'</div><div class="aitem-s">'+h.type+'</div><div class="aitem-a"><button class="btnR" onclick="delH('+h.id+')">🗑️ Supprimer</button></div></div>';
  }).join('');
}
function syncSaveHistoItem(item){
  if(window.firestore&&typeof window.firestore.saveHistoItem==='function'){
    void window.firestore.saveHistoItem(item);
  }
}
function syncDeleteHistoItem(id){
  if(window.firestore&&typeof window.firestore.deleteHistoItem==='function'){
    window.firestore.deleteHistoItem(id);
  }
}
function addH(){
  var d=gd();
  var item={id:nid(),date:document.getElementById('ah-d').value.trim(),titre:document.getElementById('ah-ti').value.trim(),desc:document.getElementById('ah-de').value.trim(),type:document.getElementById('ah-t').value,gold:document.getElementById('ah-g').value};
  d.histo.push(item);
  sd(d);renderApH(d);renderPub();tog('form-add-h');
  syncSaveHistoItem(item);
}
function delH(id){
  if(!confirm('Supprimer cet élément ?'))return;
  var d=gd();d.histo=d.histo.filter(function(h){return h.id!==id;});sd(d);renderApH(d);renderPub();
  syncDeleteHistoItem(id);
}

// CONTACT
function syncSaveContact(contact){
  if(window.firestore&&typeof window.firestore.saveContact==='function'){
    void window.firestore.saveContact(contact);
  }
}
function saveCt(){
  var d=gd();
  d.contact={adresse:document.getElementById('ct-a').value.trim(),tel:document.getElementById('ct-t').value.trim(),email:document.getElementById('ct-e').value.trim(),social:document.getElementById('ct-s').value.trim()};
  sd(d);renderPub();flash('sb-ct');
  syncSaveContact(d.contact);
}
