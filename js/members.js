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