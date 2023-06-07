let awaiting_callbacks = [];
let loaded = false;

function Add_Callback(callback)
{
 if (loaded) 
 {
  callback();
  return true;
 }
 awaiting_callbacks.push(callback);
 return false;
}

document.addEventListener("DOMContentLoaded",async function() //this allows to start scripts when the site has been loaded
{
    loaded = true;
    await Promise.all(awaiting_callbacks.map(callback => callback()));
})

