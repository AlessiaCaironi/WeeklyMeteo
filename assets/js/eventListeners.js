// recupero API key di OpenWeather
async function getAPI(){
  try{
    var credenziali = await fetch ('/key', {method: "GET"});
    var jsonObjCred = await credenziali.json();
  } catch(err){
    console.error(err);
  }
  return jsonObjCred.api_weather;
}

function passaValoreTxt(){
	var city = document.getElementById('txtCity').value;
	if(city==""){
		city = null;
	}
	memorizza(city);
}

function memorizza(city){
	localStorage.setItem("city", city);
	return true;
}

document.getElementById('btnPrevisioni').addEventListener("click", passaValoreTxt);

// POSIZIONE ATTUALE
document.getElementById('btnPosizAttuale').addEventListener("click", passaLocalCity);

function passaLocalCity(){
	memorizza(localStorage.getItem('localCity'));
	return true;
}

var API_KEY;

getAPI().then(function(val){

	  // api key di weather API
	  API_KEY = val;

		// recupero posizione attuale
		navigator.geolocation.getCurrentPosition(async function(position){

			// recupero il meteo corrente
			try{
				var responseMeteo = await fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid="+API_KEY+"&units=metric",{method:"GET"});
				var jsonObjMeteo = await responseMeteo.json();
			} catch (err){
				console.error(err);
			}
			localStorage.setItem("localCity", jsonObjMeteo.name);
		});


});
