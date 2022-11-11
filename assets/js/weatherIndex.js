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

async function getTemperature(city) {

	// recupero coordinate
  try{
    var responseCity = await fetch ('https://api.openweathermap.org/geo/1.0/direct?q='+ city + '&limit=1&appid='+API_KEY , {method: "GET"});

    // prendo l'output della risposta in formato json
    var jsonObjCity = await responseCity.json();

    var lat = jsonObjCity[0].lat;
    var lon = jsonObjCity[0].lon;
  } catch(err){
    console.error(err);
  }


 	// recupero il meteo corrente
  try{
    var responseMeteo = await fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid="+API_KEY+"&units=metric",{method:"GET"});

    var jsonObjMeteo = await responseMeteo.json();
  } catch (err){
    console.error(err);
  }

  	// icona
  	switch(jsonObjMeteo.weather[0].description){
  		case 'clear sky':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
   		break;
  		case 'few clouds':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon sun-shower" ><div class="cloud"></div><div class="sun"><div class="rays"></div></div></div>';
  		break;
  		case 'scattered clouds':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon cloudy"><div class="cloud"></div></div>';
  		break;
  		case 'broken clouds':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
  		break;
      case 'overcast clouds':
        document.getElementById('icon'+city).innerHTML = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
      break;
      case 'rain':
  		case 'shower rain':
      case 'heavy intensity rain':
      case 'fog':
        document.getElementById('icon'+city).innerHTML = '<div class="icon rainy"><div class="cloud"></div><div class="cloud"></div><div class="rain"></div></div>';
      break;
      case 'moderate rain':
      case 'light rain':
      case 'drizzle rain':
      case 'drizzle':
      case 'light intensity drizzle rain':
      case 'light intensity drizzle':
  			document.getElementById('icon'+city).innerHTML = ' <div class="icon sun-shower" ><div class="cloud"></div><div class="sun"><div class="rays"></div></div> <div class="rain"></div></div>';
  		break;
  		case 'thunderstorm':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon thunder-storm"><div class="cloud"></div> <div class="lightning"> <div class="bolt"></div><div class="bolt"></div> </div></div>';
  		break;
  		case 'snow':
      case 'light snow':
  			document.getElementById('icon'+city).innerHTML = ' <div class="cloud"></div>  <div class="snow"> <div class="flake"></div> <div class="flake"></div></div></div>';
  		break;
  		case 'mist':
  			document.getElementById('icon'+city).innerHTML = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
  		break;
  		default:
      document.getElementById('icon'+city).innerHTML = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
  	}

  	// temperatura
  	document.getElementById('temp'+city).innerText = parseInt(jsonObjMeteo.main.temp) + "°C";

}

var API_KEY;

getAPI().then(function(val){
  // api key di weather API
  API_KEY = val;

  // temperature del carousel
  getTemperature("Lisbon");
  document.getElementById('iconLisbon').classList.add("iconaPiccola");
  getTemperature("London");
  document.getElementById('iconLondon').classList.add("iconaPiccola");
  getTemperature("Dublin");
  document.getElementById('iconDublin').classList.add("iconaPiccola");
  getTemperature("Madrid");
  document.getElementById('iconMadrid').classList.add("iconaPiccola");
  getTemperature("Paris");
  document.getElementById('iconParis').classList.add("iconaPiccola");

  //  temperature proxGiorni città italiane
  getTemperature("Bergamo");
  getTemperature("Milano");
  getTemperature("Roma");
  getTemperature("Bologna");
  getTemperature("Trento");
  getTemperature("Palermo");
});
