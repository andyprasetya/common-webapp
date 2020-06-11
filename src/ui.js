import templates from './templates';
import config from './config';
import helpers from './helpers';
import modules from './modules';

var ui = {};

ui.initUI = function(){
  let activeSession = sessionStorage.getItem('sessionid');
  let mainAnchorElement = document.getElementById('app');
  mainAnchorElement.insertAdjacentHTML('beforebegin', templates._topNavigation());
  if(activeSession){
    this._menuActionsApply();
    document.getElementById('logoffbutton').addEventListener('click', function(evt){
      evt.preventDefault();
      ui.doExitApplication();
    });
    mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateHome());
  } else {
    mainAnchorElement.innerHTML = templates._publicFrontpage();
    document.getElementById('loginbutton').addEventListener('click', function(evt){
      evt.preventDefault();
      ui.createLoginBox();
    });
  }
};

ui._menuActionsApply = function(){
  let _menuElements = document.querySelectorAll('a.navbar-item');
  let mainAnchorElement = document.getElementById('app');
  _menuElements.forEach(function(element){
    element.addEventListener('click', function(e){
      e.preventDefault();
      mainAnchorElement.innerHTML = ``;
      if(this.getAttribute('id') == 'home' || this.getAttribute('id') == 'landingpage'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateHome());
      } else if(this.getAttribute('id') == 'formsspdbphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateFormSSPDBPHTB());
        modules._applyFormSSPDBPHTB();
      } else if(this.getAttribute('id') == 'formreduksibphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateFormReduksiBPHTB());
      } else if(this.getAttribute('id') == 'progressverifybphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateProgressVerifyBPHTB());
      } else if(this.getAttribute('id') == 'progressverifyreduksibphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateProgressVerifyReduksiBPHTB());
      } else if(this.getAttribute('id') == 'listverifybphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateListVerifyBPHTB());
      } else if(this.getAttribute('id') == 'listsspdnihil'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateListSSPDNihil());
      } else if(this.getAttribute('id') == 'liststatusbayarbphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateListStatusBayarBPHTB());
      } else if(this.getAttribute('id') == 'listverifyreduksibphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateListVerifyReduksiBPHTB());
      } else if(this.getAttribute('id') == 'lbppat'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateLBPPAT());
      } else if(this.getAttribute('id') == 'lphppat'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateLPHPPAT());
      } else if(this.getAttribute('id') == 'mapobjectbphtb'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateMapObjectBPHTB());
      } else if(this.getAttribute('id') == 'accesscredential'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateAccessCredential());
      } else if(this.getAttribute('id') == 'contactinfo'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateContactInfo());
      } else if(this.getAttribute('id') == 'apphelp'){
        mainAnchorElement.insertAdjacentHTML('afterbegin', templates._appTemplateAppHelp());
      } else {
        console.log('__undefined__');
      }
    });
  });
};

ui.createLoginBox = function(){
  let mainAnchorElement = document.getElementById('app');
  mainAnchorElement.innerHTML = templates._loginBox();
  this._loginBoxAction();
};

ui._loginBoxAction = function(){
  let loginForm = document.getElementById('loginform');
  loginForm.addEventListener('submit', function(evt){
    evt.preventDefault();
    let _activeInitialtoken = sessionStorage.getItem('initialtoken'), 
      _currentDateTime = new Date().getTime(), 
      _initialToken = window.btoa(config.initialHash +'.'+ _activeInitialtoken +'.'+ _currentDateTime);
    let iun = document.getElementById('username').value;
    let ipw = document.getElementById('password').value;
    if(iun.length < 5 || ipw.length < 5){
      let noticeElement = document.getElementById('loginnotice');
      noticeElement.innerHTML = `Username/password Anda salah.`;
      noticeElement.classList.remove('has-text-black');
      noticeElement.classList.add('has-text-danger');
      setTimeout(function(){
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        noticeElement.innerHTML = `Masukkan <span class='is-italic'>Username</span> dan <span class='is-italic'>Password</span> Anda.`;
        noticeElement.classList.remove('has-text-danger');
        noticeElement.classList.add('has-text-black');
        document.getElementById('username').focus();
      },1500);
    } else {
      let form = document.querySelector('#loginform'),
      formData = helpers.serialize(form), 
      jsonData = helpers.QueryStringToJSON(decodeURIComponent(formData));
      fetch(''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/doNotarisPPATLogin', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Token': _initialToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
      })
      .then(function(response){
        return response.json();
      })
      .then(function(data){
        if (data.status == 201) {
          let noticeElement = document.getElementById('loginnotice');
          noticeElement.innerHTML = `Login berhasil. Memuat aplikasi...`;
          noticeElement.classList.remove('has-text-black');
          noticeElement.classList.add('has-text-success');
          sessionStorage.setItem('sessionid', data.sessionid);
          sessionStorage.setItem('userid', data.id);
          sessionStorage.setItem('realname', data.realname);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('alamat', data.alamat);
          sessionStorage.setItem('email', data.email);
          sessionStorage.setItem('phone', data.phone);
          sessionStorage.setItem('expires', data.expires);
          setTimeout(function(){
            document.location = './';
          },2000);
        } else {
          let noticeElement = document.getElementById('loginnotice');
          noticeElement.innerHTML = `Login gagal.`;
          noticeElement.classList.remove('has-text-black');
          noticeElement.classList.add('has-text-danger');
          setTimeout(function(){
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            noticeElement.innerHTML = `Masukkan <span class='is-italic'>Username</span> dan <span class='is-italic'>Password</span> Anda.`;
            noticeElement.classList.remove('has-text-danger');
            noticeElement.classList.add('has-text-black');
            document.getElementById('username').focus();
          },1500);
        }
      })
      .catch(function(err){
        console.log(err);
      });
    }
  });
};

ui.doExitApplication = function(){
  let activeSession = sessionStorage.getItem('sessionid');
  if(activeSession){
    fetch(''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/doNotarisPPATLogoff', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"sessionid":activeSession})
    })
    .then(function(response){
      return response.json();
    })
    .then(function(data){
      if (data.status == 201) {
        sessionStorage.clear();
        setTimeout(function(){
          document.location = './';
        },1000);
      } else {
        sessionStorage.clear();
        setTimeout(function(){
          document.location = './';
        },1000);
      }
    })
    .catch(function(err){
      sessionStorage.clear();
      setTimeout(function(){
        document.location = './';
      },1000);
    });
  } else {
    sessionStorage.clear();
    setTimeout(function(){
      document.location = './';
    },1000);
  }
};

export default ui;