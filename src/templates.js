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

templates._appTemplateFormSSPDBPHTB = function(){
  let d = new Date();
  let _codex = Sha1.hash(d.toString());
  let _currentdate = helpers.getCurrentDate();
  let _realname = sessionStorage.getItem('realname');
  let dom = `<section class='section' style='padding-top:10px;padding-bottom:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-file'></i></span>Form SSPD BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>
    <section class='section' style='padding-top:0;'>
      <form id='formsspdbphtb' name='formsspdbphtb'>
        <input type='hidden' id='codex' name='codex' value='`+ _codex +`'/>
        <input type='hidden' id='ektp_nik' name='ektp_nik' value=''/>
        <input type='hidden' id='ektp_no_kk' name='ektp_no_kk' value=''/>
        <input type='hidden' id='ektp_nama_lgkp' name='ektp_nama_lgkp' value=""/>
        <input type='hidden' id='ektp_jenis_klmin' name='ektp_jenis_klmin' value=''/>
        <input type='hidden' id='ektp_tmpt_lhr' name='ektp_tmpt_lhr' value=""/>
        <input type='hidden' id='ektp_tgl_lhr' name='ektp_tgl_lhr' value=''/>
        <input type='hidden' id='ektp_gol_darah' name='ektp_gol_darah' value=""/>
        <input type='hidden' id='ektp_agama' name='ektp_agama' value=""/>
        <input type='hidden' id='ektp_status_kawin' name='ektp_status_kawin' value=''/>
        <input type='hidden' id='ektp_stat_hbkel' name='ektp_stat_hbkel' value=""/>
        <input type='hidden' id='ektp_pddk_akh' name='ektp_pddk_akh' value=''/>
        <input type='hidden' id='ektp_jenis_pkrjn' name='ektp_jenis_pkrjn' value=''/>
        <input type='hidden' id='ektp_nama_lgkp_ibu' name='ektp_nama_lgkp_ibu' value=""/>
        <input type='hidden' id='ektp_nama_lgkp_ayah' name='ektp_nama_lgkp_ayah' value=""/>
        <input type='hidden' id='ektp_no_prop' name='ektp_no_prop' value=''/>
        <input type='hidden' id='ektp_prop_name' name='ektp_prop_name' value=''/>
        <input type='hidden' id='ektp_no_kab' name='ektp_no_kab' value=''/>
        <input type='hidden' id='ektp_kab_name' name='ektp_kab_name' value=""/>
        <input type='hidden' id='ektp_no_kec' name='ektp_no_kec' value=''/>
        <input type='hidden' id='ektp_kec_name' name='ektp_kec_name' value=""/>
        <input type='hidden' id='ektp_no_kel' name='ektp_no_kel' value=''/>
        <input type='hidden' id='ektp_kel_name' name='ektp_kel_name' value=""/>
        <input type='hidden' id='ektp_alamat' name='ektp_alamat' value=""/>
        <input type='hidden' id='ektp_no_rt' name='ektp_no_rt' value=''/>
        <input type='hidden' id='ektp_no_rw' name='ektp_no_rw' value=''/>
        <input type='hidden' id='ektp_dusun' name='ektp_dusun' value=""/>
        <input type='hidden' id='ektp_kode_pos' name='ektp_kode_pos' value=''/>
        <input type='hidden' id='lampiran1_hidden' name='lampiran1' value='0'/>
        <input type='hidden' id='lampiran2_hidden' name='lampiran2' value='0'/>
        <input type='hidden' id='lampiran3_hidden' name='lampiran3' value='0'/>
        <input type='hidden' id='lampiran4_hidden' name='lampiran4' value='0'/>
        <input type='hidden' id='lampiran5_hidden' name='lampiran5' value='0'/>
        <input type='hidden' id='lampiran6_hidden' name='lampiran6' value='0'/>
        <input type='hidden' id='lampiran7_hidden' name='lampiran7' value='0'/>
        <input type='hidden' id='lampiran8_hidden' name='lampiran8' value='0'/>
        <input type='hidden' id='lampiran9_hidden' name='lampiran9' value='0'/>
        <input type='hidden' id='lampiran10_hidden' name='lampiran10' value='0'/>
        <input type='hidden' id='lampiran11_hidden' name='lampiran11' value='0'/>
        <input type='hidden' id='lampiran12_hidden' name='lampiran12' value='0'/>
        <input type='hidden' id='lampiran13_hidden' name='lampiran13' value='0'/>
        <input type='hidden' id='lampiran14_hidden' name='lampiran14' value='0'/>
        <input type='hidden' id='lampiran15_hidden' name='lampiran15' value='0'/>
        <input type='hidden' id='sismiop_sppt_kd_propinsi' name='sismiop_sppt_kd_propinsi' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_dati2' name='sismiop_sppt_kd_dati2' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kecamatan' name='sismiop_sppt_kd_kecamatan' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kelurahan' name='sismiop_sppt_kd_kelurahan' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_blok' name='sismiop_sppt_kd_blok' value=""/>
        <input type='hidden' id='sismiop_sppt_no_urut' name='sismiop_sppt_no_urut' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_jns_op' name='sismiop_sppt_kd_jns_op' value=""/>
        <input type='hidden' id='sismiop_sppt_thn_pajak_sppt' name='sismiop_sppt_thn_pajak_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_siklus_sppt' name='sismiop_sppt_siklus_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kanwil_bank' name='sismiop_sppt_kd_kanwil_bank' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kppbb_bank' name='sismiop_sppt_kd_kppbb_bank' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_bank_tunggal' name='sismiop_sppt_kd_bank_tunggal' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_bank_persepsi' name='sismiop_sppt_kd_bank_persepsi' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_tp' name='sismiop_sppt_kd_tp' value=""/>
        <input type='hidden' id='sismiop_sppt_nm_wp_sppt' name='sismiop_sppt_nm_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_jln_wp_sppt' name='sismiop_sppt_jln_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_blok_kav_no_wp_sppt' name='sismiop_sppt_blok_kav_no_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_rw_wp_sppt' name='sismiop_sppt_rw_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_rt_wp_sppt' name='sismiop_sppt_rt_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_kelurahan_wp_sppt' name='sismiop_sppt_kelurahan_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_kota_wp_sppt' name='sismiop_sppt_kota_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_pos_wp_sppt' name='sismiop_sppt_kd_pos_wp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_npwp_sppt' name='sismiop_sppt_npwp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_no_persil_sppt' name='sismiop_sppt_no_persil_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kls_tanah' name='sismiop_sppt_kd_kls_tanah' value=""/>
        <input type='hidden' id='sismiop_sppt_thn_awal_kls_tanah' name='sismiop_sppt_thn_awal_kls_tanah' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_kls_bng' name='sismiop_sppt_kd_kls_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_thn_awal_kls_bng' name='sismiop_sppt_thn_awal_kls_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_jatuh_tempo_sppt' name='sismiop_sppt_tgl_jatuh_tempo_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_luas_bumi_sppt' name='sismiop_sppt_luas_bumi_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_luas_bng_sppt' name='sismiop_sppt_luas_bng_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_njop_bumi_sppt' name='sismiop_sppt_njop_bumi_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_njop_bng_sppt' name='sismiop_sppt_njop_bng_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_njop_bumi_sppt_m2' name='sismiop_sppt_njop_bumi_sppt_m2' value=""/>
        <input type='hidden' id='sismiop_sppt_njop_bng_sppt_m2' name='sismiop_sppt_njop_bng_sppt_m2' value=""/>
        <input type='hidden' id='sismiop_sppt_njop_sppt' name='sismiop_sppt_njop_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_njoptkp_sppt' name='sismiop_sppt_njoptkp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_njkp_sppt' name='sismiop_sppt_njkp_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_pbb_terhutang_sppt' name='sismiop_sppt_pbb_terhutang_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_faktor_pengurang_sppt' name='sismiop_sppt_faktor_pengurang_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_pbb_yg_harus_dibayar_sppt' name='sismiop_sppt_pbb_yg_harus_dibayar_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_status_pembayaran_sppt' name='sismiop_sppt_status_pembayaran_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_status_tagihan_sppt' name='sismiop_sppt_status_tagihan_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_status_cetak_sppt' name='sismiop_sppt_status_cetak_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_terbit_sppt' name='sismiop_sppt_tgl_terbit_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_cetak_sppt' name='sismiop_sppt_tgl_cetak_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_nip_pencetak_sppt' name='sismiop_sppt_nip_pencetak_sppt' value=""/>
        <input type='hidden' id='sismiop_sppt_jalan_op' name='sismiop_sppt_jalan_op' value=""/>
        <input type='hidden' id='sismiop_sppt_blok_kav_no_op' name='sismiop_sppt_blok_kav_no_op' value=""/>
        <input type='hidden' id='sismiop_sppt_rw_op' name='sismiop_sppt_rw_op' value=""/>
        <input type='hidden' id='sismiop_sppt_rt_op' name='sismiop_sppt_rt_op' value=""/>
        <input type='hidden' id='sismiop_sppt_no_bumi' name='sismiop_sppt_no_bumi' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_znt' name='sismiop_sppt_kd_znt' value=""/>
        <input type='hidden' id='sismiop_sppt_luas_bumi' name='sismiop_sppt_luas_bumi' value=""/>
        <input type='hidden' id='sismiop_sppt_jns_bumi' name='sismiop_sppt_jns_bumi' value=""/>
        <input type='hidden' id='sismiop_sppt_nilai_sistem_bumi' name='sismiop_sppt_nilai_sistem_bumi' value=""/>
        <input type='hidden' id='sismiop_sppt_nm_kecamatan' name='sismiop_sppt_nm_kecamatan' value=""/>
        <input type='hidden' id='sismiop_sppt_nm_kelurahan' name='sismiop_sppt_nm_kelurahan' value=""/>
        <input type='hidden' id='sismiop_sppt_no_bng' name='sismiop_sppt_no_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_jpb' name='sismiop_sppt_kd_jpb' value=""/>
        <input type='hidden' id='sismiop_sppt_no_formulir_lspop' name='sismiop_sppt_no_formulir_lspop' value=""/>
        <input type='hidden' id='sismiop_sppt_thn_dibangun_bng' name='sismiop_sppt_thn_dibangun_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_thn_renovasi_bng' name='sismiop_sppt_thn_renovasi_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_luas_bng' name='sismiop_sppt_luas_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_jml_lantai_bng' name='sismiop_sppt_jml_lantai_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_kondisi_bng' name='sismiop_sppt_kondisi_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_jns_konstruksi_bng' name='sismiop_sppt_jns_konstruksi_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_jns_atap_bng' name='sismiop_sppt_jns_atap_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_dinding' name='sismiop_sppt_kd_dinding' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_lantai' name='sismiop_sppt_kd_lantai' value=""/>
        <input type='hidden' id='sismiop_sppt_kd_langit_langit' name='sismiop_sppt_kd_langit_langit' value=""/>
        <input type='hidden' id='sismiop_sppt_nilai_sistem_bng' name='sismiop_sppt_nilai_sistem_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_jns_transaksi_bng' name='sismiop_sppt_jns_transaksi_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_pendataan_bng' name='sismiop_sppt_tgl_pendataan_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_pemeriksaan_bng' name='sismiop_sppt_tgl_pemeriksaan_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_tgl_perekaman_bng' name='sismiop_sppt_tgl_perekaman_bng' value=""/>
        <input type='hidden' id='sismiop_sppt_daya_listrik' name='sismiop_sppt_daya_listrik' value=""/>
        <input type='hidden' id='harga_transaksi' name='harga_transaksi' value='0'/>
        <input type='hidden' id='jenis_op_bp' name='jenis_op_bp' value='41107'/>
        <input type='hidden' id='entrysrc' name='entrysrc' value='BIDANG I'/>
        <input type='hidden' id='nopwp' name='nopwp' value=''/>
        <input type='hidden' id='nama4bphtb' name='nama4bphtb' value=''/>
        <input type='hidden' id='alamat4bphtb' name='alamat4bphtb' value=''/>
        <input type='hidden' id='kabupaten4bphtb' name='kabupaten4bphtb' value='TEMANGGUNG'/>
        <input type='hidden' id='kecamatan4bphtb' name='kecamatan4bphtb' value=''/>
        <input type='hidden' id='kelurahan4bphtb' name='kelurahan4bphtb' value=''/>
        <input type='hidden' id='rw4bphtb' name='rw4bphtb' value=''/>
        <input type='hidden' id='rt4bphtb' name='rt4bphtb' value=''/>
        <input type='hidden' id='kodepos4bphtb' name='kodepos4bphtb' value=''/>
        <input type='hidden' name='kdprp' id='kdprp' value=''/>
        <input type='hidden' name='kddt2' id='kddt2' value=''/>
        <input type='hidden' name='kdkc' id='kdkc' value=''/>
        <input type='hidden' name='kdkl' id='kdkl' value=''/>
        <input type='hidden' name='kdbl' id='kdbl' value=''/>
        <input type='hidden' name='kdur' id='kdur' value=''/>
        <input type='hidden' name='kdopj' id='kdopj' value=''/>
        <input type='hidden' name='luas_bumi' id='luas_bumi' value=''/>
        <input type='hidden' name='luas_bangunan' id='luas_bangunan' value=''/>
        <input type='hidden' name='njop_bumi' id='njop_bumi' value=''/>
        <input type='hidden' name='njop_bumi_m2' id='njop_bumi_m2' value=''/>
        <input type='hidden' name='njop_bangunan' id='njop_bangunan' value=''/>
        <input type='hidden' name='njop_bangunan_m2' id='njop_bangunan_m2' value=''/>
        <input type='hidden' name='njop_sppt' id='njop_sppt' value=''/>
        <input type='hidden' name='v_kd_propinsi' id='v_kd_propinsi' value=''/>
        <input type='hidden' name='v_kd_dati2' id='v_kd_dati2' value=''/>
        <input type='hidden' name='v_kd_kecamatan' id='v_kd_kecamatan' value=''/>
        <input type='hidden' name='v_kd_kelurahan' id='v_kd_kelurahan' value=''/>
        <input type='hidden' name='v_kd_blok' id='v_kd_blok' value=''/>
        <input type='hidden' name='v_no_urut' id='v_no_urut' value=''/>
        <input type='hidden' name='v_kd_jns_op' id='v_kd_jns_op' value=''/>
        <input type='hidden' name='v_thn_pajak_sppt' id='v_thn_pajak_sppt' value=''/>
        <input type='hidden' name='v_siklus_sppt' id='v_siklus_sppt' value=''/>
        <input type='hidden' name='v_kd_kanwil_bank' id='v_kd_kanwil_bank' value=''/>
        <input type='hidden' name='v_kd_kppbb_bank' id='v_kd_kppbb_bank' value=''/>
        <input type='hidden' name='v_kd_bank_tunggal' id='v_kd_bank_tunggal' value=''/>
        <input type='hidden' name='v_kd_bank_persepsi' id='v_kd_bank_persepsi' value=''/>
        <input type='hidden' name='v_kd_tp' id='v_kd_tp' value=''/>
        <input type='hidden' name='v_nm_wp_sppt' id='v_nm_wp_sppt' value=''/>
        <input type='hidden' name='v_jln_wp_sppt' id='v_jln_wp_sppt' value=''/>
        <input type='hidden' name='v_blok_kav_no_sppt' id='v_blok_kav_no_sppt' value=''/>
        <input type='hidden' name='v_rw_wp_sppt' id='v_rw_wp_sppt' value=''/>
        <input type='hidden' name='v_rt_wp_sppt' id='v_rt_wp_sppt' value=''/>
        <input type='hidden' name='v_kelurahan_wp_sppt' id='v_kelurahan_wp_sppt' value=''/>
        <input type='hidden' name='v_kota_wp_sppt' id='v_kota_wp_sppt' value=''/>
        <input type='hidden' name='v_kd_pos_wp_sppt' id='v_kd_pos_wp_sppt' value=''/>
        <input type='hidden' name='v_npwp_sppt' id='v_npwp_sppt' value=''/>
        <input type='hidden' name='v_no_persil_sppt' id='v_no_persil_sppt' value=''/>
        <input type='hidden' name='v_kd_kls_tanah' id='v_kd_kls_tanah' value=''/>
        <input type='hidden' name='v_thn_awal_kls_tanah' id='v_thn_awal_kls_tanah' value=''/>
        <input type='hidden' name='v_kd_kls_bng' id='v_kd_kls_bng' value=''/>
        <input type='hidden' name='v_thn_awal_kls_bng' id='v_thn_awal_kls_bng' value=''/>
        <input type='hidden' name='v_tgl_jatuh_tempo_sppt' id='v_tgl_jatuh_tempo_sppt' value=''/>
        <input type='hidden' name='v_luas_bumi_sppt' id='v_luas_bumi_sppt' value=''/>
        <input type='hidden' name='v_luas_bng_sppt' id='v_luas_bng_sppt' value=''/>
        <input type='hidden' name='v_njop_bumi_sppt' id='v_njop_bumi_sppt' value=''/>
        <input type='hidden' name='v_njop_bng_sppt' id='v_njop_bng_sppt' value=''/>
        <input type='hidden' name='v_njop_sppt' id='v_njop_sppt' value=''/>
        <input type='hidden' name='v_njoptkp_sppt' id='v_njoptkp_sppt' value=''/>
        <input type='hidden' name='v_njkp_sppt' id='v_njkp_sppt' value=''/>
        <input type='hidden' name='v_pbb_terhutang_sppt' id='v_pbb_terhutang_sppt' value=''/>
        <input type='hidden' name='v_faktor_pengurang_sppt' id='v_faktor_pengurang_sppt' value=''/>
        <input type='hidden' name='v_pbb_yg_harus_dibayar_sppt' id='v_pbb_yg_harus_dibayar_sppt' value=''/>
        <input type='hidden' name='v_status_pembayaran_sppt' id='v_status_pembayaran_sppt' value=''/>
        <input type='hidden' name='v_status_tagihan_sppt' id='v_status_tagihan_sppt' value=''/>
        <input type='hidden' name='v_status_cetak_sppt' id='v_status_cetak_sppt' value=''/>
        <input type='hidden' name='v_tgl_terbit_sppt' id='v_tgl_terbit_sppt' value=''/>
        <input type='hidden' name='v_tgl_cetak_sppt' id='v_tgl_cetak_sppt' value=''/>
        <input type='hidden' name='v_nip_pencetak_sppt' id='v_nip_pencetak_sppt' value=''/>
        <input type='hidden' name='v_nm_kecamatan' id='v_nm_kecamatan' value=''/>
        <input type='hidden' name='v_nm_kelurahan' id='v_nm_kelurahan' value=''/>
        <input type='hidden' id='harga_transaksi' name='harga_transaksi' value='0'/>
        <input type='hidden' id='npop' name='npop' value=''/>
        <input type='hidden' id='npoptkp' name='npoptkp' value=''/>
        <input type='hidden' id='npopkp' name='npopkp' value=''/>
        <input type='hidden' id='bphtbt' name='bphtbt' value=''/>
        <input type='hidden' id='bphtbbayar' name='bphtbbayar' value=''/>
        <div class='container has-background-light' style='padding:0.5rem;'>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-1-left'>
              <div class='field'>
                <label class='label is-size-7'>Tanggal<sup class='has-text-weight-light'>[1]</sup></label>
                <div class='control'>
                  <input id='d_entry' name='d_entry' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='`+ _currentdate +`' readonly/>
                </div>
                <p class='help has-text-grey-darker is-italic'>[1] Tanggal Pengajuan SSPD BPHTB - auto</p>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-1-right'>
              <div class='field'>
                <label class='label is-size-7'>PPAT<sup class='has-text-weight-light'>[2]</sup></label>
                <div class='control'>
                  <input id='ppat' name='ppat' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='`+ _realname +`' readonly/>
                </div>
                <p class='help has-text-grey-darker is-italic'>[2] Nama PPAT - auto</p>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>NIK Wajib Pajak<sup class='has-text-weight-light'>[3]</sup></label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='nikwp' name='nikwp' class='input is-small is-radiusless is-fullwidth' type='text' placeholder='' autocomplete='off'/>
                </div>
                <div class='control'>
                  <a class='button is-small is-info button-search-dukcapil-data'>Cari Data</a>
                </div>
              </div>
              <p id='nikwp_notice' class='help has-text-grey-darker is-italic'>[3] NIK Wajib Pajak, diisi sesuai E-KTP, 16 (enambelas) digit angka.</p>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='field'>
                <label class='label is-size-7'>Nama Wajib Pajak</label>
                <div class='control'>
                  <input id='namawp' name='namawp' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value=""/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='field'>
                <label class='label is-size-7'>Alamat Wajib Pajak</label>
                <div class='control'>
                  <input id='alamatwp' name='alamatwp' class='input is-small is-radiusless' type='text' placeholder='' value="" autocomplete='off'/>
                </div>
                <p class='help has-text-grey-darker is-italic'>Alamat wajib pajak, dapat diedit sesuai kebutuhan.</p>
              </div>
            </div>
          </div>
          <div class='columns' style='margin-bottom:0.25rem !important;'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='buttons is-right'>
                <button type='button' class='button is-small is-info button-wp-complete-info' disabled='true'>Informasi Wajib Pajak</button>
              </div>
            </div>
          </div>
          <hr style='margin-top:0;margin-right:0;margin-bottom:1rem;margin-left:0;border:1px solid #A1A1A1;'/>
          <div class='columns' style='margin-bottom:0;'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='field'>
                <label class='label is-size-7'>Lampiran Berkas SSPD<sup class='has-text-weight-light'>[4]</sup></label>
              </div>
            </div>
          </div>
          <div class='level custom-level-first-item'>
            <div class='level-left'>
              <div class='level-item is-fullwidth-mobile'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran1' name='lampiran1' value='1'><span class='is-size-7 custom-checkbox-label'>1. Pengajuan Permohonan<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran1' name='filelampiran1'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran1'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran1' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran2' name='lampiran2' value='1'><span class='is-size-7 custom-checkbox-label'>2. Surat Kuasa<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran2' name='filelampiran2'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran2'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran2' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran3' name='lampiran3' value='1'><span class='is-size-7 custom-checkbox-label'>3. Copy KTP<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran3' name='filelampiran3'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran3'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran3' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran4' name='lampiran4' value='1'><span class='is-size-7 custom-checkbox-label'>4. Copy Sertifikat Tanah<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran4' name='filelampiran4'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran4'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran4' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran5' name='lampiran5' value='1'><span class='is-size-7 custom-checkbox-label'>5.  Asli SPPT<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran5' name='filelampiran5'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran5'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran5' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran6' name='lampiran6' value='1'><span class='is-size-7 custom-checkbox-label'>6. Copy IMB<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran6' name='filelampiran6'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran6'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran6' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran7' name='lampiran7' value='1'><span class='is-size-7 custom-checkbox-label'>7. Copy Akta Jual Beli / Hadiah<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran7' name='filelampiran7'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran7'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran7' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran8' name='lampiran8' value='1'><span class='is-size-7 custom-checkbox-label'>8. Copy SK Pensiun<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran8' name='filelampiran8'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran8'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran8' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran9' name='lampiran9' value='1'><span class='is-size-7 custom-checkbox-label'>9. Copy SPPT / STTS<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran9' name='filelampiran9'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran9'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran9' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran10' name='lampiran10' value='1'><span class='is-size-7 custom-checkbox-label'>10.  Asli STTS<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran10' name='filelampiran10'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran10'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran10' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran11' name='lampiran11' value='1'><span class='is-size-7 custom-checkbox-label'>11. Copy SK Pengurangan<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran11' name='filelampiran11'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran11'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran11' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran12' name='lampiran12' value='1'><span class='is-size-7 custom-checkbox-label'>12. Copy SK Keberatan<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran12' name='filelampiran12'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran12'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran12' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran13' name='lampiran13' value='1'><span class='is-size-7 custom-checkbox-label'>13. Copy SKKPP PBB<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran13' name='filelampiran13'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran13'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran13' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran14' name='lampiran14' value='1'><span class='is-size-7 custom-checkbox-label'>14. Copy SPMKP PBB<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran14' name='filelampiran14'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran14'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran14' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <div class='level custom-level-nth-item'>
            <div class='level-left'>
              <div class='level-item'>
                <label class='checkbox'>
                  <input type='checkbox' id='lampiran15' name='lampiran15' value='1'><span class='is-size-7 custom-checkbox-label'>15. Lain-lain<span>
                </label>
              </div>
            </div>
            <div class='level-right'>
              <div class='level-item'>
                <div class='field'>
                  <div class='file is-small has-name'>
                    <label class='file-label'>
                      <input class='file-input' type='file' id='filelampiran15' name='filelampiran15'>
                      <span class='file-cta'>
                        <span class='file-icon'>
                          <i class='fa fa-upload'></i>
                        </span>
                        <span class='file-label'>File</span>
                      </span>
                      <span class='file-name selected-filelampiran15'>... ... ... ...</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class='level-item'>
                <button id='uploadlampiran15' class='button is-small is-info button-upload-file-lampiran'>Unggah File</button>
              </div>
            </div>
          </div>
          <p class='help has-text-grey-darker is-italic'>[4] Pilih berdasar kelengkapan berkas, unggah file bersifat opsional.</p>
          <hr style='margin-top:0.5rem;margin-right:0;margin-bottom:1rem;margin-left:0;border:1px solid #A1A1A1;'/>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>1. NOP SPPT<sup class='has-text-weight-light'>[5]</sup></label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='nopsppt' name='nopsppt' class='input is-small is-radiusless is-fullwidth' type='text' placeholder='' autocomplete='off'/>
                </div>
                <div class='control'>
                  <a class='button is-small is-info button-search-sismiop-sppt-data'>Cari Data</a>
                </div>
              </div>
              <p id='nopsppt_notice' class='help has-text-grey-darker is-italic'>[5] NOP SPPT, diisi sesuai SPPT PBB-P2, 18 (delapanbelas) digit angka.</p>
            </div>
          </div>
          <hr style='margin-top:0.25rem;margin-right:0;margin-bottom:0.25rem;margin-left:0;border:1px solid #A1A1A1;'/>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-1-left'>
              <div class='field'>
                <label class='label is-size-7'>Nama Wajib Pajak</label>
                <div class='control'>
                  <input id='nmwpsppt' name='nmwpsppt' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-1-right'>
              <div class='field'>
                <label class='label is-size-7'>2. Lokasi Objek Pajak</label>
                <div class='control'>
                  <input id='lokasi' name='lokasi' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <div class='field'>
                <label class='label is-size-7'>3. Blok / Kav. / Nomor</label>
                <div class='control'>
                  <input id='blokkav' name='blokkav' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <div class='field'>
                <label class='label is-size-7'>4. Desa / Kelurahan</label>
                <div class='control'>
                  <input id='nmkelurahan' name='nmkelurahan' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <div class='field'>
                <label class='label is-size-7'>5. RW / RT</label>
                <div class='control'>
                  <input id='rtrw' name='rtrw' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <div class='field'>
                <label class='label is-size-7'>6. Kecamatan</label>
                <div class='control'>
                  <input id='nmkecamatan' name='nmkecamatan' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value='' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns' style='margin-bottom:0.25rem !important;'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='buttons is-right'>
                <button type='button' class='button is-small is-info button-sppt-complete-info' disabled='true'>Informasi Objek Pajak</button>
              </div>
            </div>
          </div>
          <hr style='margin-top:0;margin-right:0;margin-bottom:0.25rem;margin-left:0;border:1px solid #A1A1A1;'/>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-1-left'>
              <label class='label is-size-7'>7. Luas Tanah / Bumi - SPPT</label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='sppt_luastnhbumi' name='sppt_luastnhbumi' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptlt' name='num_spptlt' value=''/>
                </div>
                <div class='control'>
                  <a class='button is-small is-static'>m2</a>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-1-right'>
              <label class='label is-size-7'>Luas Tanah / Bumi - SSPD</label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='sspd_luastnhbumi' name='sspd_luastnhbumi' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value=''/>
                  <input type='hidden' id='num_sspdlt' name='num_sspdlt' value=''/>
                </div>
                <div class='control'>
                  <a class='button is-small is-static'>m2</a>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>8. Luas Bangunan - SPPT</label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='sppt_luasbangunan' name='sppt_luasbangunan' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptlb' name='num_spptlb' value=''/>
                </div>
                <div class='control'>
                  <a class='button is-small is-static'>m2</a>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>Luas Bangunan - SSPD</label>
              <div class='field has-addons'>
                <div class='control is-expanded'>
                  <input id='sspd_luasbangunan' name='sspd_luasbangunan' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value=''/>
                  <input type='hidden' id='num_sspdlb' name='num_sspdlb' value=''/>
                </div>
                <div class='control'>
                  <a class='button is-small is-static'>m2</a>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>9. NJOP Tanah (Bumi) / m2 - SPPT</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sppt_njoptanahbumi' name='sppt_njoptanahbumi' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptnjopt' name='num_spptnjopt' value=''/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>NJOP Tanah (Bumi) / m2 - SSPD</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sspd_njoptanahbumi' name='sspd_njoptanahbumi' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value=''/>
                  <input type='hidden' id='num_sspdnjopt' name='num_sspdnjopt' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>10. NJOP Bangunan / m2 - SPPT</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sppt_njopbangunan' name='sppt_njopbangunan' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptnjopb' name='num_spptnjopb' value=''/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>NJOP Bangunan / m2 - SSPD</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sspd_njopbangunan' name='sspd_njopbangunan' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value=''/>
                  <input type='hidden' id='num_sspdnjopb' name='num_sspdnjopb' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>11. Angka 7 X Angka 9 - SPPT</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sppt_tanahbumi7x9' name='sppt_tanahbumi7x9' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptnjopttotal' name='num_spptnjopttotal' value=''/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>Angka 7 X Angka 9 - SSPD</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sspd_tanahbumi7x9' name='sspd_tanahbumi7x9' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_sspdnjopttotal' name='num_sspdnjopttotal' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>12. Angka 8 x Angka 10 - SPPT</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sppt_bangunan8x10' name='sppt_bangunan8x10' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptnjopbtotal' name='num_spptnjopbtotal' value=''/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>Angka 8 x Angka 10 - SSPD</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sspd_bangunan8x10' name='sspd_bangunan8x10' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_sspdnjopbtotal' name='num_sspdnjopbtotal' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-left'>
              <label class='label is-size-7'>(Angka 11 + Angka 12) - SPPT</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='hasil13' name='hasil13' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_spptnjoptbtotal' name='num_spptnjoptbtotal' value=''/>
                </div>
              </div>
            </div>
            <div class='column is-6-desktop is-12-mobile custom-section-nth-right'>
              <label class='label is-size-7'>(Angka 11 + Angka 12) - SSPD</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='sspd_hasil13' name='sspd_hasil13' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='' readonly/>
                  <input type='hidden' id='num_sspdnjoptbtotal' name='num_sspdnjoptbtotal' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Jenis Perolehan Hak atas Tanah dan Bangunan</label>
              <div class='field'>
                <div class='control'>
                  <div class='select is-small is-fullwidth'>
                    <select id='jns_perolehan' name='jns_perolehan' disabled='true'>
                      <option value=''>PILIH JENIS PEROLEHAN HTB</option>
                      <option value='1'>01. Jual Beli</option>
                      <option value='2'>02. Tukar Menukar</option>
                      <option value='3'>03. Hibah</option>
                      <option value='4'>04. Hibah Wasiat</option>
                      <option value='5'>05. Waris</option>
                      <option value='6'>06. Pemasukan Dalam Perseroan / Badan Hukum Lain</option>
                      <option value='7'>07. Pemisahan Hak Yang Mengakibatkan Peralihan</option>
                      <option value='8'>08. Penunjukan Pembeli Dalam Lelang</option>
                      <option value='9'>09. Pelaksanaan Putusan Hakim yang Mempunyai Kekuatan Hukum Tetap</option>
                      <option value='10'>10. Penggabungan Usaha</option>
                      <option value='11'>11. Peleburan Usaha</option>
                      <option value='12'>12. Pemekaran Usaha</option>
                      <option value='13'>13. Hadiah</option>
                      <option value='14'>14. Pemberian Hak Baru karena Kelanjutan Pelepasan Hak</option>
                      <option value='15'>15. Pemberian Hak Baru karena di Luar Pelepasan Hak</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Harga transaksi yang terjadi pada perolehan hak atas tanah dan / atau bangunan / nilai pasar</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='nilai_transaksi' name='nilai_transaksi' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0'/>
                  <input type='hidden' id='num_hargatrx' name='num_hargatrx' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Nomor Sertifikat Tanah / Letter C-Desa</label>
              <div class='field'>
                <div class='control is-expanded'>
                  <input id='nosertifikat' name='nosertifikat' class='input is-small is-radiusless' type='text' placeholder='' autocomplete='off' value=''/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns' style='margin-bottom:0.25rem !important;'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='buttons is-right'>
                <button type='button' class='button is-small is-info button-process-bphtb' disabled='true'>Proses Perhitungan BPHTB</button>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Nilai Perolehan Objek Pajak ( NPOP )</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='npop1' name='npop1' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Nilai Perolehan Objek Pajak Tidak Kena Pajak ( NPOPTKP )</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='npoptkp1' name='npoptkp1' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Nilai Perolehan Objek Pajak Kena Pajak ( NPOPKP )</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='npopkp1' name='npopkp1' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Bea Perolehan Hak atas Tanah dan Bangunan yang terutang</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='bphtb1' name='bphtb1' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0' readonly/>
                </div>
              </div>
            </div>
          </div>
          <div class='columns'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <label class='label is-size-7'>Bea Perolehan Hak atas Tanah dan Bangunan yang harus dibayar</label>
              <div class='field has-addons'>
                <div class='control'>
                  <a class='button is-small is-static'>Rp.</a>
                </div>
                <div class='control is-expanded'>
                  <input id='bphtbbayar1' name='bphtbbayar1' class='input is-small is-radiusless has-text-right' type='text' placeholder='' autocomplete='off' value='0' readonly/>
                </div>
              </div>
            </div>
          </div>
          <hr style='margin-top:0;margin-right:0;margin-left:0;border:1px solid #A1A1A1;'/>
          <div class='columns' style='margin-bottom:0.25rem !important;'>
            <div class='column is-12-desktop is-12-mobile custom-section-2-fullwidth'>
              <div class='buttons is-right'>
                <button type='button' class='button is-small is-info button-sspd-digitize' disabled='true'>Lokasi Objek BPHTB</button>
                <button type='submit' class='button is-small is-info button-sspd-save-data' disabled='true'>Simpan Data + Kirim ke BPPKAD</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div id='wpinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'>Informasi Wajib Pajak</p>
          <button class='delete wpinfomodal-close' aria-label='close'></button>
        </header>
        <section id='wpinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-wpcompleteinfo-modal-footer'>
          <button class='button is-small is-info wpinfomodal-close'>Tutup</button>
        </footer>
      </div>
    </div>
    <div id='spptinfomodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'>Informasi Objek Pajak - SPPT</p>
          <button class='delete spptinfomodal-close' aria-label='close'></button>
        </header>
        <section id='spptinfomodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-spptinfo-modal-footer'>
          <button class='button is-small is-info spptinfomodal-close'>Tutup</button>
        </footer>
      </div>
    </div>
    <div id='webmapmodal' class='modal'>
      <div class='modal-background'></div>
      <div class='modal-card'>
        <header class='modal-card-head'>
          <p class='modal-card-title'>Lokasi Relatif Objek Pajak - BPHTB</p>
          <button class='delete webmapmodal-close' aria-label='close'></button>
        </header>
        <section id='webmapmodalbody' class='modal-card-body'></section>
        <footer class='modal-card-foot custom-map-modal-footer'>
          <span id='objectlatlngstring'></span>
          <div class='buttons'>
            <button type='button' class='button is-small button-cancel-save-location webmapmodal-close'>Tutup</button>
            <button type='button' class='button is-small is-info button-save-location'>Simpan Lokasi</button>
          </div>
        </footer>
      </div>
    </div>`;
  return dom;
};

templates._appTemplateFormReduksiBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-bookmark'></i></span>Form Pengurangan BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateProgressVerifyBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Verifikasi BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateProgressVerifyReduksiBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-shield'></i></span>Data</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-paper-plane'></i></span>Verifikasi Pengurangan BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateListVerifyBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-search-plus'></i></span>Verifikasi BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateListSSPDNihil = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-circle-o'></i></span>SSPD Nihil</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateListStatusBayarBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-gavel'></i></span>Status Pembayaran BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateListVerifyReduksiBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-search-minus'></i></span>Verifikasi Pengurangan BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateLBPPAT = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-newspaper-o'></i></span>Laporan Bulanan</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateLPHPPAT = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-clipboard'></i></span>Laporan Perpindahan Hak</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateMapObjectBPHTB = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-book'></i></span>Laporan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-map'></i></span>Peta Objek BPHTB</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateAccessCredential = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Privasi dan Pengaturan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-lock'></i></span>Password</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateContactInfo = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Privasi dan Pengaturan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-address-card'></i></span>Informasi Kontak</a></li>
          </ul>
        </nav>
      </div>
    </section>`;
  return dom;
};

templates._appTemplateAppHelp = function(){
  let dom = `<section class='section' style='padding-top:10px;'>
      <div class='container has-background-light' style='padding:0.5rem;'>
        <nav class='breadcrumb has-bullet-separator' aria-label='breadcrumbs'>
          <ul>
            <li><a href='#'><span class='icon' style='margin-right:1px'><i class='fa fa-cog'></i></span>Privasi dan Pengaturan</a></li>
            <li class='is-active'><a href='#' aria-current='page'><span class='icon' style='margin-right:1px'><i class='fa fa-life-ring'></i></span>Bantuan</a></li>
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