// Cookie helper
function getCookie(name) {

  var value = "; " + document.cookie;
  
  var parts = value.split("; " + name + "=");
  
  if (parts.length == 2) return parts.pop().split(";").shift();
  
};

// Cookie days calculation
function setCookie(name,value,days,path) {
  
  var expires = 'expires=0; ';

  if( days ) {

    var d = new Date();

    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    
    expires = 'expires='+d.toUTCString()+'; '

  };

  return document.cookie = name + '=' + value + '; ' + expires + 'path=' + path;

}