
// ============================================================
// DONNÉES — tout dans localStorage
// ============================================================
var DK='fa_data';

var DEF={
  events:[
    {id:1,titre:"Stage saut d'obstacles",type:'CSO',jour:'21',mois:'Juin',lieu:"Ferme de l'Autour",places:'8 places',desc:"Week-end avec moniteur diplômé. Venez avec votre cheval, on travaille ensemble à votre rythme."},
    {id:2,titre:'Grande balade en forêt',type:'Balade',jour:'05',mois:'Juil',lieu:'Forêt voisine',places:'15 places',desc:"Sortie tous ensemble ! Pique-nique prévu à mi-parcours. Bonne humeur garantie."},
    {id:3,titre:'Concours interne CCE',type:'Concours',jour:'19',mois:'Juil',lieu:"Ferme de l'Autour",places:'Membres',desc:'Notre concours complet interne ! Dressage, cross et obstacles sur deux jours.'},
    {id:4,titre:'Stage dressage',type:'Dressage',jour:'09',mois:'Août',lieu:"Ferme de l'Autour",places:'6 places',desc:'Travail de la reprise avec une intervenante spécialisée. Sessions individuelles et collectives.'}
  ],
  adhesions:[
    {
        id:1,
        nom:"Adhésion adulte",
        prix:"30",
        lien:"https://www.helloasso.com/..."
    },
    {
        id:2,
        nom:"Adhésion enfant",
        prix:"15",
        lien:"https://www.helloasso.com/..."
    }
],
  membres:[
    {id:1,prenom:'Prénom',nom:'Nom',role:'Présidente',disc:'CSO & CCE',pres:'oui'},
    {id:2,prenom:'Prénom',nom:'Nom',role:'Trésorière',disc:'Dressage',pres:'non'},
    {id:3,prenom:'Prénom',nom:'Nom',role:'Secrétaire',disc:'Balade',pres:'non'}
  ],
  histo:[
    {id:1,date:'🎉 Automne 2023',titre:"Naissance de l'association !",desc:"Des propriétaires passionnés créent l'association pour organiser des événements ensemble.",type:'Création',gold:'oui'},
    {id:2,date:'🏇 Printemps 2024',titre:'Premier stage CSO',desc:'Notre tout premier stage officiel ! 8 propriétaires et leurs chevaux, un super moniteur.',type:'CSO',gold:'non'},
    {id:3,date:'🌲 Été 2024',titre:'Grande sortie en forêt',desc:'12 propriétaires pour une journée mémorable en forêt. Pique-nique, rires et grands galops.',type:'Balade',gold:'non'},
    {id:4,date:'🏅 Automne 2024',titre:'Premier concours interne CCE',desc:'Grande première ! Notre concours interne a réuni tous les membres pour une journée inoubliable.',type:'Concours',gold:'oui'}
  ],
  contact:{adresse:"Ferme de l'Autour",tel:'06 XX XX XX XX',email:'contact@ferme-autour.fr',social:'@FermeAutour'},
  textes:{titre:"L'équitation,<br>c'est mieux <span>ensemble !</span>",accroche:"Stages, concours, entraînements, balades en forêt… Une bande de passionnés réunis à la Ferme de l'Autour pour vivre des moments inoubliables avec leurs chevaux.",s1n:'4',s1l:'disciplines pratiquées',s2n:'12+',s2l:'événements par an',s3n:'30+',s3l:'propriétaires passionnés'},
  inscriptions:[],
  galerie:[],
  nid:10
};

function gd(){try{return JSON.parse(localStorage.getItem(DK))||DEF;}catch(e){return DEF;}}
function sd(d){localStorage.setItem(DK,JSON.stringify(d));}
function nid(){var d=gd();d.nid=(d.nid||10)+1;sd(d);return d.nid;}

// ============================================================
// RENDU PUBLIC
// ============================================================
function renderPub(){
  var d=gd();
  // Textes
  var tx=d.textes||{};
  document.getElementById('pub-titre').innerHTML=tx.titre||"L'équitation,<br>c'est mieux <span>ensemble !</span>";
  document.getElementById('pub-accroche').textContent=tx.accroche||'';
  if(tx.s1n)document.getElementById('ps1n').textContent=tx.s1n;
  if(tx.s1l)document.getElementById('ps1l').textContent=tx.s1l;
  if(tx.s2n)document.getElementById('ps2n').textContent=tx.s2n;
  if(tx.s2l)document.getElementById('ps2l').textContent=tx.s2l;
  if(tx.s3n)document.getElementById('ps3n').textContent=tx.s3n;
  if(tx.s3l)document.getElementById('ps3l').textContent=tx.s3l;
  // Contact
  var ct=d.contact||{};
  if(ct.adresse)document.getElementById('pub-adr').textContent=ct.adresse;
  if(ct.email)document.getElementById('pub-mail').textContent=ct.email;
  if(ct.tel)document.getElementById('pub-tel').textContent=ct.tel;
  if(ct.social)document.getElementById('pub-soc').textContent=ct.social;
  // Events
  var ec=document.getElementById('pub-ev');
  ec.innerHTML=d.events.length?d.events.map(evCard).join(''):'<p style="color:var(--muted);font-weight:700;">Aucun événement à venir pour le moment.</p>';
  // Historique
  document.getElementById('pub-histo').innerHTML=d.histo.map(function(h){
    var ph=h.photo&&h.photo.length?'<img src="'+h.photo+'" style="width:100%;border-radius:8px;margin-top:10px;max-height:220px;object-fit:cover;">':'<div class="tphoto">📷 Photos à venir — ajoute-en une dans l\'admin !</div>';
    return '<div class="ti"><div class="tdot'+(h.gold==='oui'?' g':'')+'"></div><div class="tcard"><div class="tmeta"><span class="tdate">'+h.date+'</span><span class="etag t-'+h.type+'" style="font-size:11px;padding:3px 10px;">'+h.type+'</span></div><h3>'+h.titre+'</h3><p>'+h.desc+'</p>'+ph+'</div></div>';
  }).join('');
  // Adhésions
var ac=document.getElementById('pub-adh');

if(ac){

    var adh=d.adhesions||[];

    ac.innerHTML=adh.length
    ? adh.map(function(a){

        return `
        <div class="acard">

            <h3>${a.nom}</h3>

            <div class="aprice">
                ${a.prix} €
            </div>

            <p class="adesc">
                ${a.desc || ""}
            </p>

            <a href="${a.lien}" target="_blank"
               class="btn"
               style="display:block;text-align:center;">
               J'adhère
            </a>

        </div>
        `;

    }).join('')
    : '<p style="color:var(--muted);font-weight:700;">Aucune adhésion disponible.</p>';

}
  // Membres
  document.getElementById('pub-mb').innerHTML=d.membres.map(function(m){
    var ini=(m.prenom[0]||'')+(m.nom[0]||'');
    return '<div class="mcard"><div class="ava'+(m.pres==='oui'?' g':'')+'">'+( m.pres==='oui'?'👑':ini.toUpperCase())+'</div><h3>'+m.prenom+' '+m.nom+'</h3><div class="mrole'+(m.pres==='oui'?' g':'')+'">'+m.role+'</div><p class="mdisc">'+m.disc+'</p></div>';
  }).join('');
}

function evCard(e){
var bouton = e.helloasso && e.helloasso.trim() !== ""
    ? '<button class="bsm" onclick="window.open(\''+e.helloasso+'\', \'_blank\')">🟢 Je m\'inscris</button>'
    : '<button class="bsm" disabled style="opacity:.6;cursor:not-allowed;">🔒 Inscriptions bientôt ouvertes</button>';

return '<div class="ecard"><div class="ehead"><div class="edb"><div class="day">'+e.jour+'</div><div class="mon">'+e.mois+'</div></div><span class="etag t-'+e.type+'">'+e.type+'</span></div><div class="ebody"><h3>'+e.titre+'</h3><p>'+e.desc+'</p></div><div class="efoot"><span class="espots">📍 '+e.lieu+' · '+e.places+'</span>'+bouton+'</div></div>';}

// ============================================================
// INSCRIPTION
// ============================================================
var curEv='';
function openInscr(ev){
  curEv=ev;
  document.getElementById('mEvName').textContent=ev;
  document.getElementById('mForm').style.display='block';
  document.getElementById('mOk').style.display='none';
  ['fPre','fNom','fChev','fMail','fTel','fCom'].forEach(function(i){document.getElementById(i).value='';});
  document.getElementById('ovInscr').classList.add('on');
}
function closeInscr(){document.getElementById('ovInscr').classList.remove('on');}
document.getElementById('ovInscr').addEventListener('click',function(e){if(e.target===this)closeInscr();});

function submitInscr(){
  var pre=document.getElementById('fPre').value.trim();
  var nom=document.getElementById('fNom').value.trim();
  var chev=document.getElementById('fChev').value.trim();
  var mail=document.getElementById('fMail').value.trim();
  if(!pre||!nom||!chev||!mail){alert('Merci de remplir les champs obligatoires ✍️');return;}
  var now=new Date();
  var ds=now.toLocaleDateString('fr-FR')+' '+now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});
  var d=gd();
  d.inscriptions.push({id:nid(),date:ds,evenement:curEv,prenom:pre,nom:nom,cheval:chev,email:mail,tel:document.getElementById('fTel').value.trim()||'—',commentaire:document.getElementById('fCom').value.trim()||'—'});
  sd(d);
  document.getElementById('mForm').style.display='none';
  document.getElementById('mOk').style.display='block';
  if(document.getElementById('aPanel').style.display==='block')renderAdmin();
}


// ============================================================
// ADMIN — TABS
// ============================================================
function showTab(id,el){
  document.querySelectorAll('.apc').forEach(function(c){c.classList.remove('on');});
  document.querySelectorAll('.aptab').forEach(function(t){t.classList.remove('on');});
  document.getElementById('tab-'+id).classList.add('on');
  el.classList.add('on');
}

// ============================================================
// ADMIN — RENDU
// ============================================================
function renderAdmin(){
  var d=gd();
  renderInscrits(d,'tous');
  buildFilters(d);
  renderApEv(d);
  renderAdhesions(d);
  renderApMb(d);
  renderApH(d);
  renderApGal(d);
  renderApHistoPhotos(d);
  var ct=d.contact||{};
  document.getElementById('ct-a').value=ct.adresse||'';
  document.getElementById('ct-t').value=ct.tel||'';
  document.getElementById('ct-e').value=ct.email||'';
  document.getElementById('ct-s').value=ct.social||'';
  var tx=d.textes||{};
  document.getElementById('tx-ti').value=(tx.titre||'').replace(/<[^>]+>/g,'');
  document.getElementById('tx-ac').value=tx.accroche||'';
  document.getElementById('s1n').value=tx.s1n||'';
  document.getElementById('s1l').value=tx.s1l||'';
  document.getElementById('s2n').value=tx.s2n||'';
  document.getElementById('s2l').value=tx.s2l||'';
  document.getElementById('s3n').value=tx.s3n||'';
  document.getElementById('s3l').value=tx.s3l||'';
}

// INSCRITS
var curFilt='tous';
function buildFilters(d){
  var evts=[...new Set((d.inscriptions||[]).map(function(i){return i.evenement.split('—')[0].trim();}))];
  var h='<div class="ifilter on" onclick="filtI(\'tous\',this)">Tous ('+d.inscriptions.length+')</div>';
  evts.forEach(function(ev){
    var c=d.inscriptions.filter(function(i){return i.evenement.startsWith(ev);}).length;
    h+='<div class="ifilter" onclick="filtI(\''+ev.replace(/'/g,"\\'")+'\',this)">'+ev+' ('+c+')</div>';
  });
  document.getElementById('ifilters').innerHTML=h;
}
function filtI(f,el){
  curFilt=f;
  document.querySelectorAll('#ifilters .ifilter').forEach(function(b){b.classList.remove('on');});
  el.classList.add('on');
  renderInscrits(gd(),f);
}
function renderInscrits(d,f){
  var data=(d.inscriptions||[]).filter(function(i){return f==='tous'||i.evenement.toLowerCase().indexOf(f.toLowerCase())!==-1;});
  var c=document.getElementById('itbl');
  if(!data.length){c.innerHTML='<div class="iempty">📭 Aucune inscription.</div>';return;}
  var h='<table class="itable"><thead><tr>';
  ['Date','Événement','Prénom','Nom','Cheval','Email','Tél','Commentaire'].forEach(function(x){h+='<th>'+x+'</th>';});
  h+='</tr></thead><tbody>';
  data.forEach(function(r){
    h+='<tr><td style="white-space:nowrap;">'+r.date+'</td><td><span class="etag t-Stage" style="font-size:11px;">'+r.evenement.split('—')[0].trim()+'</span></td><td>'+r.prenom+'</td><td>'+r.nom+'</td><td>🐴 '+r.cheval+'</td><td>'+r.email+'</td><td>'+r.tel+'</td><td>'+r.commentaire+'</td></tr>';
  });
  h+='</tbody></table>';
  c.innerHTML=h;
}
function exportCSV(){
  var d=gd();
  var data=curFilt==='tous'?d.inscriptions:d.inscriptions.filter(function(i){return i.evenement.toLowerCase().indexOf(curFilt.toLowerCase())!==-1;});
  if(!data.length){alert('Aucune inscription à exporter !');return;}
  var heads=['Date','Événement','Prénom','Nom','Cheval','Email','Téléphone','Commentaire'];
  var rows=data.map(function(r){return[r.date,r.evenement,r.prenom,r.nom,r.cheval,r.email,r.tel,r.commentaire];});
  var csv=[heads].concat(rows).map(function(row){return row.map(function(c){return'"'+String(c).replace(/"/g,'""')+'"';}).join(';');}).join('\n');
  var a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));
  a.download='inscrits-'+new Date().toLocaleDateString('fr-FR').replace(/\//g,'-')+'.csv';
  a.click();
}

// TEXTES
function syncSaveTextes(textes){
  if(window.firestore&&typeof window.firestore.saveTextes==='function'){
    void window.firestore.saveTextes(textes);
  }
}
function saveTx(){
  var d=gd();
  d.textes={titre:document.getElementById('tx-ti').value.trim(),accroche:document.getElementById('tx-ac').value.trim(),s1n:document.getElementById('s1n').value.trim(),s1l:document.getElementById('s1l').value.trim(),s2n:document.getElementById('s2n').value.trim(),s2l:document.getElementById('s2l').value.trim(),s3n:document.getElementById('s3n').value.trim(),s3l:document.getElementById('s3l').value.trim()};
  sd(d);renderPub();flash('sb-tx');
  syncSaveTextes(d.textes);
}

// MOT DE PASSE
async function chgPwd(){
  var p1=document.getElementById('np1').value;
  var p2=document.getElementById('np2').value;
  var err=document.getElementById('pErr');
  err.textContent='Les mots de passe ne correspondent pas.';
  if(!p1||p1!==p2){err.style.display='block';return;}

  if(!window.firebaseAuth.auth.currentUser){
    err.textContent='Vous devez être connecté.';
    err.style.display='block';
    return;
  }

  try{
    await window.firebaseAuth.updatePassword(
      window.firebaseAuth.auth.currentUser,
      p1
    );
    err.style.display='none';
    document.getElementById('np1').value='';document.getElementById('np2').value='';
    flash('sb-pwd');
  }catch(e){
    if(e.code==='auth/requires-recent-login'){
      err.textContent='Veuillez vous reconnecter au panneau Admin avant de modifier votre mot de passe.';
    }else{
      err.textContent='Une erreur est survenue lors de la modification du mot de passe.';
    }
    err.style.display='block';
  }
}

// UTILS
function tog(id){document.getElementById(id).classList.toggle('on');}
function flash(id){var b=document.getElementById(id);b.style.display='block';setTimeout(function(){b.style.display='none';},2500);}

// FIRESTORE — lecture des événements uniquement
async function syncEventsFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadEvents!=='function')return;
    var events=await window.firestore.loadEvents();
    if(!Array.isArray(events)||!events.length)return;
    var d=gd();
    d.events=events;
    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser les événements Firestore.',e);
  }
}

async function syncHistoryFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadHisto!=='function')return;
    var histo=await window.firestore.loadHisto();
    if(!Array.isArray(histo))return;

    var d=gd();
    var localHistory=Array.isArray(d.histo)?d.histo:[];

    if(!histo.length){
      await Promise.all(localHistory.map(function(item){
        return window.firestore.saveHistoItem(item);
      }));
      return;
    }

    var localPhotos={};
    localHistory.forEach(function(item){
      if(Object.prototype.hasOwnProperty.call(item,'photo')){
        localPhotos[String(item.id)]=item.photo;
      }
    });

    d.histo=histo.map(function(item){
      var localItem={
        id:item.id,
        date:item.date,
        titre:item.titre,
        desc:item.desc,
        type:item.type,
        gold:item.gold
      };

      if(Object.prototype.hasOwnProperty.call(localPhotos,String(item.id))){
        localItem.photo=localPhotos[String(item.id)];
      }

      return localItem;
    });

    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser l’historique Firestore.',e);
  }
}

async function syncMembresFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadMembres!=='function')return;
    var membres=await window.firestore.loadMembres();
    if(!Array.isArray(membres))return;

    var d=gd();
    var localMembres=Array.isArray(d.membres)?d.membres:[];

    if(!membres.length){
      await Promise.all(localMembres.map(function(membre){
        return window.firestore.saveMembre(membre);
      }));
      return;
    }

    d.membres=membres;
    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser les membres Firestore.',e);
  }
}

async function syncAdhesionsFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadAdhesions!=='function')return;
    var adhesions=await window.firestore.loadAdhesions();
    if(!Array.isArray(adhesions))return;

    var d=gd();
    var localAdhesions=Array.isArray(d.adhesions)?d.adhesions:[];

    if(!adhesions.length){
      await Promise.all(localAdhesions.map(function(adhesion){
        return window.firestore.saveAdhesion(adhesion);
      }));
      return;
    }

    d.adhesions=adhesions;
    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser les adhésions Firestore.',e);
  }
}

async function syncGalerieFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadGalerie!=='function')return;
    var galerie=await window.firestore.loadGalerie();
    if(galerie===null)return;

    var d=gd();
    var localGalerie=Array.isArray(d.galerie)?d.galerie:[];

    if(!galerie.length){
      localGalerie.forEach(function(item){
        void window.firestore.saveGalerieEntry(item);
      });
      return;
    }

    d.galerie=galerie;
    sd(d);
    renderPubGal(d);
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser la galerie Firestore.',e);
  }
}

async function syncContactFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadContact!=='function')return;
    var contact=await window.firestore.loadContact();
    if(contact===null)return;

    var d=gd();

    if(typeof contact==='undefined'){
      if(window.firestore&&typeof window.firestore.saveContact==='function'){
        void window.firestore.saveContact(d.contact||{});
      }
      return;
    }

    d.contact=contact;
    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser le contact Firestore.',e);
  }
}

async function syncTextesFromFirestore(){
  try{
    if(!window.firestore||typeof window.firestore.loadTextes!=='function')return;
    var textes=await window.firestore.loadTextes();
    if(textes===null)return;

    var d=gd();

    if(typeof textes==='undefined'){
      if(window.firestore&&typeof window.firestore.saveTextes==='function'){
        void window.firestore.saveTextes(d.textes||{});
      }
      return;
    }

    d.textes=textes;
    sd(d);
    renderPub();
    var panel=document.getElementById('aPanel');
    if(panel&&panel.style.display==='block'){
      renderAdmin();
    }
  }catch(e){
    console.error('Impossible de synchroniser les textes Firestore.',e);
  }
}

// INIT
renderPub();
renderPubGal(gd());
window.addEventListener('load',syncEventsFromFirestore);
window.addEventListener('load',syncHistoryFromFirestore);
window.addEventListener('load',syncMembresFromFirestore);
window.addEventListener('load',syncAdhesionsFromFirestore);
window.addEventListener('load',syncGalerieFromFirestore);
window.addEventListener('load',syncContactFromFirestore);
window.addEventListener('load',syncTextesFromFirestore);
