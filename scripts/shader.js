class Shader
{
 Sourcefrag = null;
 Sourcevert = null;
 Program = null;
 Shader = null;
 isLoaded = false;

 constructor(Source,isURL = false,type="vert")
 {
  if(isURL)
  {
   let XHR = new XMLHttpRequest();

   XHR.open("GET",Source+"\\frag.glsl");
   
   XHR.onload = function()
   {
    this.Sourcefrag = XHR.responseText;
    
    XHR.open("GET",Source+"\\vert.glsl");

    XHR.onload = function()
    {
     this.Sourcevert = XHR.responseText;
     this.isLoaded = true;
     XHR.onerror = null;
     XHR.onload = null;
    }

    XHR.send();
  
   }


   XHR.send();

   return; 
  }
  this["Source"+type] = Source;
 }

}