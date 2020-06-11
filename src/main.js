import './stylesheets/custom.scss';
import './stylesheets/font-awesome.min.css';

import config from './config';
import ui from './ui';

let activeSession = sessionStorage.getItem('sessionid');
if(!activeSession){
  let xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.onload = function(){
    let responseObj = xhr.response;
    sessionStorage.setItem('initialtoken', responseObj.token);
    sessionStorage.setItem('tokenExpire', responseObj.expires);
  };
  xhr.onerror = function(error){
    /* todo */
  };
  xhr.open('GET', ''+ config.endPointBaseURL +''+ config.endPointBaseDirectory +'/getInitToken');
  xhr.send();
} else {
  var appsTimeout = function () {
    var timeout;
    window.onload = resetTimer;
    document.onmousemove = resetTimer;
    document.onkeypress = resetTimer;

    function logout() {
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
    };
    
    function resetTimer() {
      clearTimeout(timeout);
      timeout = setTimeout(logout, config.applicationRefreshTimeout);
    };
  };
  appsTimeout();
}

ui.initUI();

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});

document.querySelectorAll('.navbar-link').forEach(function(navbarLink){
  navbarLink.addEventListener('click', function(){
    navbarLink.nextElementSibling.classList.toggle('is-hidden-mobile');
  });
});