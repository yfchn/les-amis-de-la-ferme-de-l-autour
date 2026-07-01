var editEventId = null;

function syncSaveEvent(event){
  if(window.firestore&&typeof window.firestore.saveEvent==='function'){
    window.firestore.saveEvent(event);
  }
}

function syncUpdateEvent(event){
  if(window.firestore&&typeof window.firestore.updateEvent==='function'){
    window.firestore.updateEvent(event);
  }
}

function syncDeleteEvent(id){
  if(window.firestore&&typeof window.firestore.deleteEvent==='function'){
    window.firestore.deleteEvent(id);
  }
}

// ÉVÉNEMENTS
function renderApEv(d){
  document.getElementById('ap-ev-list').innerHTML=d.events.length?d.events.map(function(e){
    return '<div class="aitem"><div class="aitem-t">'+e.jour+' '+e.mois+' — '+e.titre+'</div><div class="aitem-s">'+e.type+' · '+e.lieu+' · '+e.places+'</div><div class="aitem-a"><button class="btnT" onclick="editEv('+e.id+')">✏️ Modifier</button><button class="btnR" onclick="delEv('+e.id+')">🗑️ Supprimer</button></div></div>';
  }).join(''):'<p style="color:var(--muted);font-weight:700;margin-bottom:1rem;">Aucun événement.</p>';
}

function addEv(){

  var d=gd();
  var eventToSync=null;
  var syncMode=null;

  if(editEventId!==null){

    var e=d.events.find(function(ev){
      return ev.id===editEventId;
    });

    if(e){

      e.titre=document.getElementById('ae-t').value.trim();
      e.type=document.getElementById('ae-type').value;
      e.jour=document.getElementById('ae-j').value.trim();
      e.mois=document.getElementById('ae-m').value.trim();
      e.lieu=document.getElementById('ae-l').value.trim();
      e.places=document.getElementById('ae-pl').value.trim();
      e.desc=document.getElementById('ae-d').value.trim();
      e.helloasso=document.getElementById('ae-ha').value.trim();
      eventToSync=e;
      syncMode='update';

    }

    editEventId=null;

    document.querySelector('#form-add-ev .savebtn').innerHTML='✔ Ajouter';

  }else{

    eventToSync={
      id:nid(),
      titre:document.getElementById('ae-t').value.trim(),
      type:document.getElementById('ae-type').value,
      jour:document.getElementById('ae-j').value.trim(),
      mois:document.getElementById('ae-m').value.trim(),
      lieu:document.getElementById('ae-l').value.trim(),
      places:document.getElementById('ae-pl').value.trim(),
      desc:document.getElementById('ae-d').value.trim(),
      helloasso:document.getElementById('ae-ha').value.trim()
    };

    d.events.push(eventToSync);
    syncMode='save';

  }

  sd(d);
  renderApEv(d);
  renderPub();

  if(eventToSync&&syncMode==='save'){
    syncSaveEvent(eventToSync);
  }

  if(eventToSync&&syncMode==='update'){
    syncUpdateEvent(eventToSync);
  }

  document.getElementById('ae-t').value='';
  document.getElementById('ae-j').value='';
  document.getElementById('ae-m').value='';
  document.getElementById('ae-l').value='';
  document.getElementById('ae-pl').value='';
  document.getElementById('ae-d').value='';
  document.getElementById('ae-ha').value='';

  tog('form-add-ev');

}

function editEv(id){

  var d=gd();

  var e=d.events.find(function(ev){
    return ev.id===id;
  });

  if(!e) return;

  editEventId=id;

  document.getElementById('ae-t').value=e.titre;
  document.getElementById('ae-type').value=e.type;
  document.getElementById('ae-j').value=e.jour;
  document.getElementById('ae-m').value=e.mois;
  document.getElementById('ae-l').value=e.lieu;
  document.getElementById('ae-pl').value=e.places;
  document.getElementById('ae-d').value=e.desc||'';
  document.getElementById('ae-ha').value=e.helloasso||'';

  document.querySelector('#form-add-ev .savebtn').innerHTML='💾 Enregistrer';

  tog('form-add-ev');

}

function delEv(id){

  if(!confirm('Supprimer cet événement ?')) return;

  var d=gd();

  d.events=d.events.filter(function(e){
    return e.id!==id;
  });

  sd(d);

  renderApEv(d);

  renderPub();

  syncDeleteEvent(id);

}
