// HISTORIQUE
function renderApH(d){
  document.getElementById('ap-h-list').innerHTML=d.histo.map(function(h){
    return '<div class="aitem"><div class="aitem-t">'+(h.gold==='oui'?'⭐ ':'')+h.date+' — '+h.titre+'</div><div class="aitem-s">'+h.type+'</div><div class="aitem-a"><button class="btnR" onclick="delH('+h.id+')">🗑️ Supprimer</button></div></div>';
  }).join('');
}
function addH(){
  var d=gd();
  d.histo.push({id:nid(),date:document.getElementById('ah-d').value.trim(),titre:document.getElementById('ah-ti').value.trim(),desc:document.getElementById('ah-de').value.trim(),type:document.getElementById('ah-t').value,gold:document.getElementById('ah-g').value});
  sd(d);renderApH(d);renderPub();tog('form-add-h');
}
function delH(id){
  if(!confirm('Supprimer cet élément ?'))return;
  var d=gd();d.histo=d.histo.filter(function(h){return h.id!==id;});sd(d);renderApH(d);renderPub();
}

// CONTACT
function saveCt(){
  var d=gd();
  d.contact={adresse:document.getElementById('ct-a').value.trim(),tel:document.getElementById('ct-t').value.trim(),email:document.getElementById('ct-e').value.trim(),social:document.getElementById('ct-s').value.trim()};
  sd(d);renderPub();flash('sb-ct');
}
