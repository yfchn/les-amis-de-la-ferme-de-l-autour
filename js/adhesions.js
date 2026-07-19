// ============================================================
// ADHÉSIONS
// ============================================================

var editPackId = null;

function syncSaveAdhesion(adhesion){
  if(window.firestore&&typeof window.firestore.saveAdhesion==='function'){
    window.firestore.saveAdhesion(adhesion);
  }
}

function syncDeleteAdhesion(id){
  if(window.firestore&&typeof window.firestore.deleteAdhesion==='function'){
    window.firestore.deleteAdhesion(id);
  }
}

function renderAdhesions(d){

  var c=document.getElementById('packsList');

  if(!c) return;

  if(!d.adhesions) d.adhesions=[];

  c.innerHTML=d.adhesions.length
  ? d.adhesions.map(function(a){

      return '<div class="aitem">'+
                '<div class="aitem-t">'+a.nom+'</div>'+
                '<div class="aitem-s">'+
                  a.prix+' €'+
                '</div>'+
                '<div class="aitem-a">'+
                  '<button class="btnT" onclick="editPack('+a.id+')">✏️ Modifier</button>'+
                  '<button class="btnR" onclick="delPack('+a.id+')">🗑️ Supprimer</button>'+
                '</div>'+
             '</div>';

    }).join('')
  : '<p style="color:var(--muted);font-weight:700;margin-bottom:1rem;">Aucun pack d\'adhésion.</p>';

}


function addPack(){

  var d=gd();

  if(!d.adhesions) d.adhesions=[];

  var adhesionToSave=null;

  if(editPackId!==null){

    var a=d.adhesions.find(function(p){
      return p.id===editPackId;
    });

    if(a){

      a.nom=document.getElementById('ad-nom').value.trim();
      a.prix=document.getElementById('ad-prix').value.trim();
      a.lien=document.getElementById('ad-lien').value.trim();
      a.desc=document.getElementById('ad-desc').value.trim();

      adhesionToSave=a;

    }

    editPackId=null;

    document.querySelector('#form-add-pack .savebtn').innerHTML='✔ Ajouter';

  }else{

    var adhesion={

      id:nid(),

      nom:document.getElementById('ad-nom').value.trim(),

      prix:document.getElementById('ad-prix').value.trim(),

      lien:document.getElementById('ad-lien').value.trim(),

      desc:document.getElementById('ad-desc').value.trim()

    };

    d.adhesions.push(adhesion);

    adhesionToSave=adhesion;

  }

  sd(d);

  renderAdhesions(d);

  renderPub();

  document.getElementById('ad-nom').value='';
  document.getElementById('ad-prix').value='';
  document.getElementById('ad-lien').value='';
  document.getElementById('ad-desc').value='';

  tog('form-add-pack');

  if(adhesionToSave)syncSaveAdhesion(adhesionToSave);

}


function editPack(id){

  var d=gd();

  var a=d.adhesions.find(function(p){
    return p.id===id;
  });

  if(!a) return;

  editPackId=id;

  document.getElementById('ad-nom').value=a.nom;
  document.getElementById('ad-prix').value=a.prix;
  document.getElementById('ad-lien').value=a.lien;
  document.getElementById('ad-desc').value=a.desc||'';

  document.querySelector('#form-add-pack .savebtn').innerHTML='💾 Enregistrer';

  var f=document.getElementById('form-add-pack');

  if(!f.classList.contains('on')){
      tog('form-add-pack');
  }

}


function delPack(id){

  if(!confirm("Supprimer cette adhésion ?")) return;

  var d=gd();

  d.adhesions=d.adhesions.filter(function(a){
    return a.id!==id;
  });

  sd(d);

  renderAdhesions(d);

  renderPub();

  syncDeleteAdhesion(id);

}
