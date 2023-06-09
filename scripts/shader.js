class Shader
{
 Sourcefrag = null;
 Sourcevert = null;
 Program = null;
 Shader = null;
 isLoaded = false;

 constructor(Source,isURL = false,type="frag")
 {
  if(isURL)
  {
   let loaded = false;
   
   let XHR = new XMLHttpRequest();

   XHR.open("GET",Source+"\\" + type + ".glsl");
   
   XHR.onload = function()
   {
    this["Source"+type] = XHR.responseText;
    this.isLoaded = true;
    XHR.onerror = null;
    XHR.onload = null;
   }

   XHR.onerror = function()
   {
    console.log("Failed to load");
    this.isLoaded = true;
    XHR.onerror = null;
    XHR.onload = null;
   }

   return; 
  }
  this["Source"+type] = Source;
 }

}