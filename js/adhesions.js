// ============================================================
// ADHÉSIONS
// ============================================================

var editPackId = null;

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

  if(editPackId!==null){

    var a=d.adhesions.find(function(p){
      return p.id===editPackId;
    });

    if(a){

      a.nom=document.getElementById('ad-nom').value.trim();
      a.prix=document.getElementById('ad-prix').value.trim();
      a.lien=document.getElementById('ad-lien').value.trim();
      a.desc=document.getElementById('ad-desc').value.trim();

    }

    editPackId=null;

    document.querySelector('#form-add-pack .savebtn').innerHTML='✔ Ajouter';

  }else{

    d.adhesions.push({

      id:nid(),

      nom:document.getElementById('ad-nom').value.trim(),

      prix:document.getElementById('ad-prix').value.trim(),

      lien:document.getElementById('ad-lien').value.trim(),

      desc:document.getElementById('ad-desc').value.trim()

    });

  }

  sd(d);

  renderAdhesions(d);

  renderPub();

  document.getElementById('ad-nom').value='';
  document.getElementById('ad-prix').value='';
  document.getElementById('ad-lien').value='';
  document.getElementById('ad-desc').value='';

  tog('form-add-pack');

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

}