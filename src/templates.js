import config from './config';
import helpers from './helpers';
import Sha1 from './jslibs/crypto_sha1';

var templates = {};

templates._topNavigation = function(){
  document.title = config.documentTitle;
  document.body.classList.add('has-navbar-fixed-top');
  let activeSession = sessionStorage.getItem('sessionid');
  if(activeSession){
    let realname = sessionStorage.getItem('realname');
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'><div class='navbar-brand'><a id='landingpage' class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a><a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'><span aria-hidden='true'></span><span aria-hidden='true'></span><span aria-hidden='true'></span></a></div><div id='navbarMainMenu' class='navbar-menu'><div class='navbar-start'><a class='navbar-item' id='home'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a><div class='navbar-item has-dropdown is-hoverable'><a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a><div class='navbar-dropdown'><a class='navbar-item' id='formsspdbphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-file'></i></span>Form SSPD BPHTB</a><a class='navbar-item' id='formreduksibphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-bookmark'></i></span>Form Pengurangan BPHTB</a><hr class='navbar-divider'><a class='navbar-item' id='progressverifybphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Verifikasi BPHTB</a><a class='navbar-item' id='progressverifyreduksibphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Verifikasi Pengurangan BPHTB</a></div></div><div class='navbar-item has-dropdown is-hoverable'><a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a><div class='navbar-dropdown'><a class='navbar-item' id='listverifybphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-search-plus'></i></span>Verifikasi BPHTB</a><a class='navbar-item' id='listsspdnihil'><span class='icon' style='margin-right:1px'><i class='fa fa-circle-o'></i></span>SSPD Nihil</a><a class='navbar-item' id='liststatusbayarbphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-gavel'></i></span>Status Pembayaran BPHTB</a><hr class='navbar-divider'><a class='navbar-item' id='listverifyreduksibphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-search-minus'></i></span>Verifikasi Pengurangan BPHTB</a><hr class='navbar-divider'><a class='navbar-item' id='lbppat'><span class='icon' style='margin-right:1px'><i class='fa fa-newspaper-o'></i></span>Laporan Bulanan</a><a class='navbar-item' id='lphppat'><span class='icon' style='margin-right:1px'><i class='fa fa-clipboard'></i></span>Laporan Perpindahan Hak</a><hr class='navbar-divider'><a class='navbar-item' id='mapobjectbphtb'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Objek BPHTB</a></div></div></div><div class='navbar-end'><div class='navbar-item has-dropdown is-hoverable'><a class='navbar-link'><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>`+ realname +`</a><div class='navbar-dropdown'><a class='navbar-item' id='accesscredential'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a><a class='navbar-item' id='contactinfo'><span class='icon' style='margin-right:1px'><i class='fa fa-address-card'></i></span>Informasi Kontak</a><a class='navbar-item' id='apphelp'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a></div></div><div class='navbar-item'><div class='buttons'><a id='logoffbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-sign-out'></i></span>Keluar</a></div></div></div></div></nav>`;
    return dom;
  } else {
    let dom = `<nav class='navbar is-fixed-top is-dark' role='navigation' aria-label='main navigation'><div class='navbar-brand'><a class='navbar-item' href='./'><h1>`+ config.appTitle +`</h1></a><a role='button' class='navbar-burger burger' aria-label='menu' aria-expanded='false' data-target='navbarMainMenu'><span aria-hidden='true'></span><span aria-hidden='true'></span><span aria-hidden='true'></span></a></div><div id='navbarMainMenu' class='navbar-menu'><div class='navbar-start'></div><div class='navbar-end'><div class='navbar-item'><div class='buttons'><a id='loginbutton' class='button has-background-dark has-text-light is-outlined is-radiusless is-fullwidth-mobile'><span class='icon' style='margin-right:1px;'><i class='fa fa-lock'></i></span>Login PPAT</a></div></div></div></div></nav>`;
    return dom;
  }
};

templates._appTemplateHome = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-home'></i></span>Beranda</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._publicFrontpage = function(){
  let dom = `<section class='hero is-link is-fullheight-with-navbar'>
    <div class='hero-body bg-img'>
      <div class='container has-text-centered'>
        <p class='title'>`+ config.appGreetingsTitle +`</p>
        <p class='subtitle'>`+ config.appGreetingsSubtitle +`</p>
      </div>
    </div>
  </section>
  <div class='container is-fluid'>
    <hr/>
    <!-- <div class='columns'>
      <div class='column'>
        <div class='card'>
          <div class='card-content'>
            <p class='title'>Title 1</p>
            <p class='subtitle'>Subtitile 1</p>
          </div>
          <footer class='card-footer'>
            <p class='card-footer-item'>
              <span><a href='#' class='button is-primary'>Detail</a></span>
            </p>
          </footer>
        </div>
      </div>
      <div class='column'>
        <div class='card'>
          <div class='card-content'>
            <p class='title'>Title 2</p>
            <p class='subtitle'>Subtitle 2</p>
          </div>
          <footer class='card-footer'>
            <p class='card-footer-item'>
              <span><a href='#' class='button is-primary'>Detail</a></span>
            </p>
          </footer>
        </div>
      </div>
      <div class='column'>
        <div class='card'>
          <div class='card-content'>
            <p class="title">Title 3</p>
            <p class="subtitle">Subtitle 3</p>
          </div>
          <footer class='card-footer'>
            <p class='card-footer-item'>
              <span><a href='#' class='button is-primary'>Detail</a></span>
            </p>
          </footer>
        </div>
      </div>
    </div> -->
  </div>
  <footer class='footer'>
    <div class='content has-text-centered'>
      <p>--&nbsp;`+ config.appTitle +`&nbsp;--</p>
    </div>
  </footer>`;
  return dom;
};

templates._loginBox = function(){
  let dom = `<section class='hero is-light is-fullheight-with-navbar'><div class='hero-body'><div class='container has-text-centered'><div class='column is-4 is-offset-4'><h3 class='title has-text-black'>Login PPAT</h3><hr class='login-hr'><p id='loginnotice' class='subtitle has-text-black'>Masukkan <span class='is-italic'>Username</span> dan <span class='is-italic'>Password</span> Anda.</p><div class='box is-radiusless'><form id='loginform' name='loginform'><div class='field'><div class='control'><input id='username' name='username' class='input is-large is-radiusless' type='text' placeholder='Username' autofocus='' autocomplete='off'/></div></div><div class='field'><div class='control'><input id='password' name='password' class='input is-large is-radiusless' type='password' placeholder='Password' autocomplete='off'/></div></div><button type='submit' class='button is-block is-info is-large is-fullwidth is-radiusless'>Login <i class='fa fa-sign-in' aria-hidden='true'></i></button></form></div></div></div></div></section>`;
  return dom;
};

export default templates;