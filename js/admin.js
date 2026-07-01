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
function checkPwd(){
  if(document.getElementById('aPwd').value===PWD){
    closeLogin();
    document.getElementById('aPanel').style.display='block';
    document.body.style.overflow='hidden';
    renderAdmin();
  }else{
    document.getElementById('aPwdErr').style.display='block';
  }
}

function closeAdmin(){
  document.getElementById('aPanel').style.display='none';
  document.body.style.overflow='';
}