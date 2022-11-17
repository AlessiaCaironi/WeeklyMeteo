// recupero API key di google maps
async function getAPI(){
  try{
    var credenziali = await fetch ('/key', {method: "POST"});
    var jsonObjCred = await credenziali.json();
  } catch(err){
    console.error(err);
  }
  //console.log(jsonObjCred.api_key_google);
  return jsonObjCred.api_key_google;
}

window.onload = getAPI().then(function(val){
  // val contiene l'API KEY di google
    let script = document.createElement('script');
    script.src = "https://maps.googleapis.com/maps/api/js?key=" + val + "&libraries=places&callback=initAutocomplete";
    //console.log("https://maps.googleapis.com/maps/api/js?key=" + val + "&libraries=places&callback=initAutocomplete");
    document.head.append(script);
});
