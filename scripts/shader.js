class Shader
{
 Sourcefrag = null;
 Sourcevert = null;
 Program = null;
 Shader = null;
 isCompiled = false;

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
    loaded = true;
   }

   while (!loaded)
   {
    Wait(0.01);
    continue;
   }
   
   return; 
  }
  this["Source"+type] = Source;
 }

}