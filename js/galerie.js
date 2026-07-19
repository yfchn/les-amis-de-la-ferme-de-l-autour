// GALERIE
function renderApGal(d){
  var c=document.getElementById('ap-gal-list');
  var gal=d.galerie||[];
  if(!gal.length){c.innerHTML='<p style="color:var(--muted);font-weight:700;grid-column:1/-1;">Aucune photo pour l\'instant.</p>';return;}
  c.innerHTML=gal.map(function(g){
    return '<div class="gthumb"><img src="'+g.url+'" alt="'+(g.leg||'')+'" onerror="this.style.opacity=.3"><div class="gthumb-lbl">'+(g.leg||'Photo')+'</div><button class="gthumb-del" onclick="delGal('+g.id+')">✕</button></div>';
  }).join('');
}

function syncSaveGalerieEntry(galerie){
  if(window.firestore&&typeof window.firestore.saveGalerieEntry==='function'){
    void window.firestore.saveGalerieEntry(galerie);
  }
}

function syncDeleteGalerieEntry(id){
  if(window.firestore&&typeof window.firestore.deleteGalerieEntry==='function'){
    void window.firestore.deleteGalerieEntry(id);
  }
}

function prevGal(inp){

  if(!inp.files || !inp.files.length) return;

  var r=new FileReader();

  r.onload=function(e){
    document.getElementById('gal-prev-img').src=e.target.result;
    document.getElementById('gal-prev').style.display='block';
    document.getElementById('gal-url').value='';
  };

  r.readAsDataURL(inp.files[0]);

}

function addGal(){

  var url=document.getElementById('gal-url').value.trim();
  var fi=document.getElementById('gal-file');
  var leg=document.getElementById('gal-leg').value.trim();

  // Ajout par URL
  if(url){
    saveGalEntry(url,leg);
    return;
  }

  // Plusieurs images
  if(fi.files && fi.files.length){

    var d=gd();

    if(!d.galerie) d.galerie=[];

    var fichiers=Array.from(fi.files);
    var restants=fichiers.length;
    var galerieEntries=[];

    fichiers.forEach(function(file){

      var r=new FileReader();

      r.onload=function(e){

        var galerie={
          id:nid(),
          url:e.target.result,
          leg:leg||''
        };

        d.galerie.push(galerie);
        galerieEntries.push(galerie);

        restants--;

        if(restants===0){

          sd(d);
          renderApGal(d);
          renderPubGal(d);

          document.getElementById('gal-url').value='';
          document.getElementById('gal-leg').value='';
          document.getElementById('gal-file').value='';
          document.getElementById('gal-prev').style.display='none';

          tog('form-add-gal');

          flash('sb-gal');

          galerieEntries.forEach(function(galerie){
            syncSaveGalerieEntry(galerie);
          });

        }

      };

      r.readAsDataURL(file);

    });

    return;

  }

  alert("Colle une URL ou sélectionne une ou plusieurs images !");

}

function saveGalEntry(url,leg){
  var d=gd();if(!d.galerie)d.galerie=[];
  var galerie={id:nid(),url:url,leg:leg||''};
  d.galerie.push(galerie);
  sd(d);renderApGal(d);renderPubGal(d);
  document.getElementById('gal-url').value='';
  document.getElementById('gal-leg').value='';
  document.getElementById('gal-file').value='';
  document.getElementById('gal-prev').style.display='none';
  tog('form-add-gal');flash('sb-gal');
  syncSaveGalerieEntry(galerie);
}

function delGal(id){
  if(!confirm('Supprimer cette photo ?'))return;
  var d=gd();d.galerie=d.galerie.filter(function(g){return g.id!==id;});
  sd(d);renderApGal(d);renderPubGal(d);
  syncDeleteGalerieEntry(id);
}

function renderApHistoPhotos(d){
  var c=document.getElementById('ap-histo-photos');
  c.innerHTML=d.histo.map(function(h){
    var hasPh=h.photo&&h.photo.length>0;
    return '<div class="hpr">'+(hasPh?'<img class="hpr-img" src="'+h.photo+'" onerror="this.style.opacity=.3">':'<div class="hpr-ph">📷</div>')+'<div style="flex:1;min-width:0;"><div style="font-size:13px;font-weight:800;color:var(--text);margin-bottom:6px;">'+h.titre+'</div><div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;"><input id="hp-'+h.id+'" value="'+(h.photo||'')+'" placeholder="URL de la photo…" style="flex:1;min-width:160px;padding:7px 10px;border:2px solid var(--border);border-radius:8px;font-family:Nunito,sans-serif;font-size:12px;font-weight:600;outline:none;background:var(--cream);"><label style="font-size:11px;font-weight:700;color:var(--teal);cursor:pointer;">📁 Uploader<input type="file" accept="image/*" style="display:none;" onchange="uploadHistoPhoto(this,'+h.id+')"></label><button class="btnT" onclick="saveHistoPhoto('+h.id+')">💾</button></div></div></div>';
  }).join('');
}

function uploadHistoPhoto(inp,id){
  if(inp.files&&inp.files[0]){
    var r=new FileReader();
    r.onload=function(e){document.getElementById('hp-'+id).value=e.target.result;saveHistoPhoto(id);};
    r.readAsDataURL(inp.files[0]);
  }
}

function saveHistoPhoto(id){
  var url=document.getElementById('hp-'+id).value.trim();
  var d=gd();
  var item=null;
  d.histo=d.histo.map(function(h){if(h.id===id){h.photo=url;item=h;}return h;});
  sd(d);renderPub();renderApHistoPhotos(d);flash('sb-gal');
  if(item)syncSaveHistoItem(item);
}

function renderPubGal(d){
  const c = document.getElementById("pub-gal");
  if(!c) return;

  const gal = d.galerie || [];

  if(gal.length === 0){
    c.innerHTML = `
      <div class="gitem"><span style="font-size:2rem">📷</span><span>Aucune photo</span></div>
    `;
    return;
  }

  c.innerHTML = gal.map((g,i)=>`
    <div class="gitem"
         style="padding:0;overflow:hidden;cursor:pointer;position:relative"
         onclick="openLightbox(${i})">

      <img
        src="${g.url}"
        alt="${g.leg||''}"
        loading="lazy"
        style="width:100%;height:100%;object-fit:cover;transition:.3s"
        onerror="this.src='https://placehold.co/600x400?text=Image+introuvable'">

      <div style="
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        background:rgba(0,0,0,.45);
        color:white;
        padding:6px;
        font-size:12px;
        font-weight:700;">
        ${g.leg||''}
      </div>

    </div>
  `).join("");
}  let currentPhoto = 0;

function openLightbox(i){

    currentPhoto = i;

    const gal = gd().galerie;

    if(!gal.length) return;

    let box = document.getElementById("lightbox");

    if(!box){

        box = document.createElement("div");

        box.id="lightbox";

        box.style=`
position:fixed;
inset:0;
background:rgba(0,0,0,.92);
display:flex;
justify-content:center;
align-items:center;
z-index:99999;
`;

        box.innerHTML=`
<button id="lbPrev"
style="position:absolute;left:20px;font-size:40px;background:none;border:none;color:white;cursor:pointer;">❮</button>

<img id="lbImg"
style="max-width:92%;max-height:90%;border-radius:12px;box-shadow:0 0 30px black;">

<button id="lbNext"
style="position:absolute;right:20px;font-size:40px;background:none;border:none;color:white;cursor:pointer;">❯</button>

<button id="lbClose"
style="position:absolute;top:20px;right:20px;font-size:35px;background:none;border:none;color:white;cursor:pointer;">✕</button>

<div id="lbCaption"
style="position:absolute;bottom:20px;color:white;font-weight:700;font-size:15px;"></div>
`;

        document.body.appendChild(box);

        document.getElementById("lbClose").onclick=()=>box.remove();

        document.getElementById("lbPrev").onclick=()=>{
            currentPhoto--;
            if(currentPhoto<0) currentPhoto=gal.length-1;
            updateLightbox();
        };

        document.getElementById("lbNext").onclick=()=>{
            currentPhoto++;
            if(currentPhoto>=gal.length) currentPhoto=0;
            updateLightbox();
        };

    }

    updateLightbox();
}

function updateLightbox(){

    const gal=gd().galerie;

    document.getElementById("lbImg").src=gal[currentPhoto].url;

    document.getElementById("lbCaption").textContent=
        gal[currentPhoto].leg||"";
}
