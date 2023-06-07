let website_url = "https://ietacok.github.io/";

function Load_Resource(resoucre_path,callback)
{
 let Xhr_body = new XMLHttpRequest();
 Xhr_body.open("GET",website_url+resoucre_path);   

 Xhr_body.onload = function()
 {
  callback(Xhr_body.response);
 }

 Xhr_body.send();
 
}