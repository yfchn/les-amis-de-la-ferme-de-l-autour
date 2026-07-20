// MEMBRES
function renderApMb(d){
  document.getElementById('ap-mb-list').innerHTML=d.membres.map(function(m){
    return '<div class="aitem"><div class="aitem-t">'+(m.pres==='oui'?'👑 ':'')+m.prenom+' '+m.nom+'</div><div class="aitem-s">'+m.role+' · '+m.disc+'</div><div class="aitem-a"><button class="btnR" onclick="delMb('+m.id+')">🗑️ Supprimer</button></div></div>';
  }).join('');
}
function syncSaveMembre(membre){
  if(window.firestore&&typeof window.firestore.saveMembre==='function'){
    window.firestore.saveMembre(membre);
  }
}
function syncDeleteMembre(id){
  if(window.firestore&&typeof window.firestore.deleteMembre==='function'){
    window.firestore.deleteMembre(id);
  }
}
function addMb(){
  var d=gd();
  var membre={id:nid(),prenom:document.getElementById('am-p').value.trim(),nom:document.getElementById('am-n').value.trim(),role:document.getElementById('am-r').value.trim(),disc:document.getElementById('am-d').value.trim(),pres:document.getElementById('am-pr').value};
  d.membres.push(membre);
  sd(d);renderApMb(d);renderPub();tog('form-add-mb');
  syncSaveMembre(membre);
}
function delMb(id){
  if(!confirm('Supprimer ce membre ?'))return;
  var d=gd();d.membres=d.membres.filter(function(m){return m.id!==id;});sd(d);renderApMb(d);renderPub();
  syncDeleteMembre(id);
}
