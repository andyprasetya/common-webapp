var helpers = {};

/* 
 * Parse a JSON string to an object in all cases, without throwing
 * */
helpers.parseJsonToObject = function(str){
  try{
    var obj = JSON.parse(str);
    return obj;
  } catch(e){
    return {};
  }
};

/* 
 * Create a random alphanumeric string
 * */
helpers.createRandomString = function(strLength){
  strLength = typeof(strLength) == 'number' && strLength > 0 ? strLength : false;
  if(strLength){
    let possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let str = '';
    for(i = 1; i <= strLength; i++) {
        let randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
        str+=randomCharacter;
    }
    return str;
  } else {
    return false;
  }
};

/*
 * form serialize
 * */
helpers.serialize = function (form) {
  var serialized = [];
  for (var i = 0; i < form.elements.length; i++) {
    var field = form.elements[i];
    if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;
    if (field.type === 'select-multiple') {
      for (var n = 0; n < field.options.length; n++) {
        if (!field.options[n].selected) continue;
          serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.options[n].value));
        }
    } else if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
      serialized.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
    }
  }
  return serialized.join('&');
};

/*
 * QueryStringToJSON
 * */
helpers.QueryStringToJSON = function(str) {
  var pairs = str.split('&');
  var result = {};
  pairs.forEach(function(pair) {
    pair = pair.split('=');
    var name = pair[0];
    var value = pair[1];
    if(name.length)
    if (result[name] !== undefined) {
      if (!result[name].push) {
        result[name] = [result[name]];
      }
      result[name].push(value || '');
    } else {
      result[name] = value || '';
    }
  });
  return( result );
};

helpers.getCurrentDate = function(_date){
  _date = typeof _date !== 'undefined' ? _date : 'today';
  if(_date == 'today'){
    var d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    return ``+ day +`/`+ month +`/`+ year +``;
  } else {
    var d = new Date(_date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;
    return ``+ day +`/`+ month +`/`+ year +``;
  }
};

helpers.getCurrentDataDate = function(){
  var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  return ``+ year +`-`+ month +`-`+ day +``;
};

helpers.getCurrentDayName = function(_date){
  _date = typeof _date !== 'undefined' ? _date : 'today';
  var weekday = new Array(7);
  weekday[0] = "Minggu";
  weekday[1] = "Senin";
  weekday[2] = "Selasa";
  weekday[3] = "Rabu";
  weekday[4] = "Kamis";
  weekday[5] = "Jum'at";
  weekday[6] = "Sabtu";
  if(_date == 'today'){
    var d = new Date();
    return weekday[d.getDay()];
  } else {
    var d = new Date(_date);
    return weekday[d.getDay()];
  }
};

helpers.getCurrentMonthNameYear = function(){
  var d = new Date();
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return ``+months[d.getMonth()]+`&nbsp;`+d.getFullYear()+``;
};

helpers.getMonthNameIDN = function(month){
  const months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  return ``+months[parseInt(month) - 1]+``;
};

helpers.getCurrentYear = function(){
  var d = new Date();
  return ``+d.getFullYear()+``;
};

helpers.monthRange = function(startDate, endDate) {
  var start = startDate.split('-'),
    end = endDate.split('-'),
    startYear = parseInt(start[0]),
    endYear = parseInt(end[0]),
    monthrange = [];

  for(var i = startYear; i <= endYear; i++) {
    var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1])-1 : 0;
    for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
      var month = j+1;
      var displayMonth = month < 10 ? '0'+month : month;
      monthrange.push([i, displayMonth].join('-'));
    }
  }
  return monthrange;
};

helpers.uniqueDateRange = function(data) {
  var arrData = data || {};
  var _arr = arrData.features || [];

  var _allDates = (_arr || []).map(_chunk => {
    let properties = (_chunk || {}).properties;
    let d_entry = (properties || {}).d_entry;
    return d_entry;
  }).filter((val, index, self) => {
    return self.indexOf(val) === index;
  });
  return _allDates;
};

helpers.uniqueDateRangeNCOV = function(data, startdate) {
  var _startDate = new Date(startdate);
  _startDate.setHours(0, 0, 0, 0);
  var arrData = data || {};
  var _arr = arrData.features || [];

  var _allDates = (_arr || []).map(_chunk => {
    let properties = (_chunk || {}).properties;
    let d_entry = (properties || {}).d_entry;
    let _d_entry = new Date(d_entry);
    _d_entry.setHours(0, 0, 0, 0);
    if(_d_entry > _startDate){
      return d_entry;
    }
  }).filter((val, index, self) => {
    return self.indexOf(val) === index;
  });
  return _allDates;
};

helpers._ifnulldata = function(data){
  if(data != null){
    return data;
  } else {
    return '-';
  }
};

helpers._zerofillnumber = function(data, prefix){
  if(prefix == 2){
    if(data == '-'){
      return '00';
    } else {
      if(parseInt(data)<10){
        return '0'+data+'';
      } else {
        return data;
      }
    }
  } else if(prefix == 3){
    if(data == '-'){
      return '000';
    } else {
      if(parseInt(data)<10){
        return '00'+data+'';
      } else if(parseInt(data)>=10 && parseInt(data)<100){
        return '0'+data+'';
      } else {
        return data;
      }
    }
  } else {
    return data;
  }
};

helpers._otf_format_date = function(mode,datestring){
  mode = typeof mode !== 'undefined' ? mode : 'tohtml';
  datestring = typeof datestring !== 'undefined' ? datestring : '1970-01-01';
  if (mode === 'tohtml') {
    var d = new Date(datestring);
    var _dd = d.getDate();
    var _mm = d.getMonth() + 1;
    var _yyyy = d.getFullYear();
    var arrStrDate = datestring.split('-');
    var strDate = ''+ _dd +'/'+ _mm +'/'+ _yyyy +'';
    return strDate;
  } else if (mode === 'todb') {
    var arrStrDate = datestring.split('/');
    var strDate = ''+ arrStrDate[2] +'-'+ arrStrDate[1] +'-'+ arrStrDate[0] +'';
    return strDate;
  } else {
    var arrStrDate = datestring.split('-');
    var strDate = ''+ arrStrDate[2] +'/'+ arrStrDate[1] +'/'+ arrStrDate[0] +'';
    return strDate;
  }
};

export default helpers;