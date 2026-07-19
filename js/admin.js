const ADMIN_EMAIL = 'yannfamechon@icloud.com';

// ============================================================
// ADMIN — LOGIN
// ============================================================
function showLogin(){
  document.getElementById('aLogin').classList.add('on');
  document.getElementById('aPwd').value='';
  document.getElementById('aPwdErr').style.display='none';
  setTimeout(function(){document.getElementById('aPwd').focus();},100);
}
function closeLogin(){document.getElementById('aLogin').classList.remove('on');}
async function checkPwd(){
  document.getElementById('aPwdErr').style.display='none';
  try{
    await window.firebaseAuth.signInWithEmailAndPassword(
      window.firebaseAuth.auth,
      ADMIN_EMAIL,
      document.getElementById('aPwd').value
    );
    closeLogin();
    document.getElementById('aPanel').style.display='block';
    document.body.style.overflow='hidden';
    renderAdmin();
  }catch(e){
    document.getElementById('aPwdErr').style.display='block';
  }
}

function closeAdmin(){
  document.getElementById('aPanel').style.display='none';
  document.body.style.overflow='';
  if(window.firebaseAuth&&typeof window.firebaseAuth.signOut==='function'){
    void window.firebaseAuth.signOut(window.firebaseAuth.auth);
  }
}

window.addEventListener('load',function(){
  if(window.firebaseAuth&&typeof window.firebaseAuth.onAuthStateChanged==='function'){
    window.firebaseAuth.onAuthStateChanged(window.firebaseAuth.auth,function(user){
      if(!user){
        document.getElementById('aPanel').style.display='none';
        document.body.style.overflow='';
      }
    });
  }
});
