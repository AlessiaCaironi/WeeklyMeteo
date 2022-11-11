const myTimeout = setTimeout(initAutocomplete, 1000);

function initAutocomplete(){
  let autocomplete = new google.maps.places.Autocomplete(document.getElementById('txtCity'),{
    types: ['locality']
    //metto come opzione di ricerca solo le località
  });

}
