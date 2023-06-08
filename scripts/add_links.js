
let Links = {
   0: "https://github.com/Ietacok",
}

function FindDirectorySearch(url) {
   let slashCount = 0;
   let directoryStartIndex = -1;
 
   for (let i = 0; i < url.length; i++) {
     if (url[i] === "/") {
       slashCount++;
       if (slashCount === 3) {
         directoryStartIndex = i;
         break;
       }
     }
   }
 
   if (directoryStartIndex !== -1) {
     const directorySearch = url.substring(directoryStartIndex);
     return directorySearch;
   } else {
     return ""; // If the third slash is not found, return an empty string or handle the case accordingly.
   }
 }
function Add_Links(object)
{
 let list_div = document.createElement("div"); 
 let id = "links_id_special";
 
 list_div.setAttribute("id",id);

 for (let i = 0;i < Links.length;i++)
 {
   let link = Links[i];
   let dir = FindDirectorySearch(link)+"favicon.ico";
   
   let a_object = document.createElement("a");
   let img_object = document.createElement("img");
   
   a_object.appendChild(img_object);
   a_object.href = link;
   img_object.src = dir; //height and width is defined by styles
   
   list_div.appendChild(a_object);
 }

 object.appendChild(list_div);

 return list_div;
}