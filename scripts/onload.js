let awaiting_callbacks = [];
let loaded = false;

function add_callback(callback)
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

