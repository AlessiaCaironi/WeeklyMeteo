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

function initMap(lati, longi, city){
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lati, lng: longi},
    zoom: 7
    });
  var marker = new google.maps.Marker({
    position: {lat: lati, lng: longi},
    map: map,
    title: city
  });
}

var timezone;

function addDayToDate(days){
    var res = new Date();
    res.setDate(res.getDate()+days);
    return res;
}

function orario(){
  var dataUTC = new Date();
  var hh = (dataUTC.getUTCHours() + timezone).toString();
  if (hh.length == 1) {hh = "0"+hh};
  var mm = dataUTC.getUTCMinutes().toString();
  if (mm.length == 1) {mm = "0"+mm};

  document.getElementById('g1').innerText = giorni[i] + " " + addDayToDate(0).getDate() + ", " + hh + ":" + mm;

  setTimeout('orario()', 5000);
}

function getIcona(str){
  switch(str){
    case 'clear sky':
      strIcona = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';
    break;
    case 'few clouds':
      strIcona = '<div class="icon sun-shower" ><div class="cloud"></div><div class="sun"><div class="rays"></div></div></div>';
    break;
    case 'scattered clouds':
      strIcona = '<div class="icon cloudy"><div class="cloud"></div></div>';
    break;
    case 'broken clouds':
      strIcona = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;
    case 'overcast clouds':
      strIcona = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;
    case 'shower rain':
    case 'rain':
    case 'heavy intensity rain':
    case 'fog':
      strIcona = '<div class="icon rainy"><div class="cloud"></div><div class="cloud"></div><div class="rain"></div></div>';
    break;
    case 'light rain':
    case 'drizzle rain':
    case 'drizzle':
    case 'light intensity drizzle rain':
    case 'light intensity drizzle':
    case 'moderate rain':
      strIcona = ' <div class="icon sun-shower" ><div class="cloud"></div><div class="sun"><div class="rays"></div></div> <div class="rain"></div></div>';
    break;
    case 'thunderstorm':
      strIcona= '<div class="icon thunder-storm"><div class="cloud"></div> <div class="lightning"> <div class="bolt"></div><div class="bolt"></div> </div></div>';
    break;
    case 'snow':
    case 'light snow':
      strIcona = '<div class="icon cloudy"><div class="cloud"></div>  <div class="snow"> <div class="flake"></div> <div class="flake"></div></div></div></div>';
    break;
    case 'mist':
      strIcona = '<div class="icon cloudy"><div class="cloud"></div><div class="cloud"></div></div>';
    break;
    default:
      strIcona = '<div class="icon sunny"><div class="sun"><div class="rays"></div></div></div>';;
  }
  return strIcona;
}

async function getMeteo(city) {

  // recupero coordinate
  try{
    var responseCity = await fetch ('https://api.openweathermap.org/geo/1.0/direct?q='+ city + '&limit=1&appid='+API_KEY , {method: "GET"});

    // prendo l'output della risposta in formato json
    var jsonObjCity = await responseCity.json();

    var lat = jsonObjCity[0].lat;
    var lon = jsonObjCity[0].lon;

    initMap(lat,lon,city);

    // città e stato
    document.getElementById('nomeCit').innerText = jsonObjCity[0].name + " (" + jsonObjCity[0].country + ")";

    // recupero il meteo corrente
    try{
      var responseMeteo = await fetch ("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid="+API_KEY+"&units=metric",{method:"GET"});
      var jsonObjMeteo = await responseMeteo.json();
    } catch (err){
      console.error(err);
    }

    var descCorr = jsonObjMeteo.weather[0].description;
    if(descCorr == 'fog'){
      descCorr = "light rain";
    }
    document.getElementById('descCorr').innerText = descCorr.charAt(0).toUpperCase()+descCorr.substring(1).toLowerCase();

    document.getElementById('iconCorr').innerHTML = getIcona(descCorr);

    // temperatura corrente
    document.getElementById('tempCorr').innerText = parseInt(jsonObjMeteo.main.temp) + "°C";

    // temperatura corrente percepita
    document.getElementById('tempPerc').innerText = "Feels like " + parseInt(jsonObjMeteo.main.feels_like) + "°C";

    // umidità corrente
    document.getElementById('umiditaCorr').innerText = "Humidity " + parseInt(jsonObjMeteo.main.humidity) + "%";

    // visibilità corrente
    document.getElementById('visibCorr').innerText = "Visibility " + (jsonObjMeteo.visibility /1000) + " km";

    // pressione corrente
    document.getElementById('pressCorr').innerText = "Pressure " + jsonObjMeteo.main.pressure + " hPa";

    // vento corrente
    document.getElementById('ventoCorr').innerText = "Wind " + jsonObjMeteo.wind.speed + " m/s" ;

    // sunset corrente
    document.getElementById('sunsetCorr').innerText = "Sunset 17:20";

    // orario corrente
    timezone = parseInt(jsonObjMeteo.timezone / (60*60));
    orario();

    // recupero il meteo futuro
    try{
      var responseFuturo = await fetch ("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid="+API_KEY+"&units=metric",{method:"GET"});
      var jsonObjFuturo = await responseFuturo.json();
    } catch (err){
      console.error(err);
    }

    var k=1;
    var continua = true;
    var dd ='';
    var giornoFuturo = addDayToDate(1).getDate();
    var descFut; var minT; var maxT;

    // giorno seguente
    while(continua){
      dd = parseInt(jsonObjFuturo.list[k].dt_txt.substr(8,2));
      if(giornoFuturo==dd){
        //prendo il meteo di mezzogiorno
        descFut = jsonObjFuturo.list[k+4].weather[0].description;
        document.getElementById('iconFut2').innerHTML = getIcona(descFut);
        document.getElementById('descFut2').innerText = descFut.charAt(0).toUpperCase()+descFut.substring(1).toLowerCase();
        continua = false;
      } else {
        k++;
      }
    }

    // calcolo temperatura min e massima di 1 giorno dopo
    var t;
    minT = jsonObjFuturo.list[k].main.temp;
    maxT = jsonObjFuturo.list[k].main.temp;
    for(let i=(k+1); i<(k+8); i++){
      t = jsonObjFuturo.list[i].main.temp;
      if(t<minT){minT=t}
      if(t>maxT){maxT=t}
    }
    document.getElementById('tempFut2').innerText = parseInt(minT) + " / " + parseInt(maxT) + " °C";

    // due giorni dopo
    k += 8;
    descFut = jsonObjFuturo.list[k+4].weather[0].description; // sommo 4 perchè considero quello di mezzogiorno
    document.getElementById('iconFut3').innerHTML = getIcona(descFut);
    document.getElementById('descFut3').innerText = descFut.charAt(0).toUpperCase()+descFut.substring(1).toLowerCase();

    // calcolo temperatura min e massima di 2 giorni dopo
    minT = jsonObjFuturo.list[k].main.temp;
    maxT = jsonObjFuturo.list[k].main.temp;
    for(let i=(k+1); i<(k+8); i++){
      t = jsonObjFuturo.list[i].main.temp;
      if(t<minT){minT=t}
      if(t>maxT){maxT=t}
    }
    document.getElementById('tempFut3').innerText = parseInt(minT) + " / " + parseInt(maxT) + " °C";

    // tre giorni dopo
    k += 8;
    descFut = jsonObjFuturo.list[k+4].weather[0].description; // sommo 4 perchè considero quello di mezzogiorno
    document.getElementById('iconFut4').innerHTML = getIcona(descFut);
    document.getElementById('descFut4').innerText = descFut.charAt(0).toUpperCase()+descFut.substring(1).toLowerCase();

    // calcolo temperatura min e massima di 3 giorni dopo
    minT = jsonObjFuturo.list[k].main.temp;
    maxT = jsonObjFuturo.list[k].main.temp;
    for(let i=(k+1); i<(k+8); i++){
      t = jsonObjFuturo.list[i].main.temp;
      if(t<minT){minT=t}
      if(t>maxT){maxT=t}
    }
    document.getElementById('tempFut4').innerText = parseInt(minT) + " / " + parseInt(maxT) + " °C";

  } catch(err){
    document.getElementById('nomeCit').innerText = "ERROR";
    document.getElementById('giornoCorrente').innerHTML = "<h5 style='margin-bottom:0;padding-top: 5%;'>Insert a valid city</h5>";
    document.getElementById('giornoCorrente').style.width = "100%";
    document.getElementById('g2').innerText = "";
    document.getElementById('g3').innerText = "";
    document.getElementById('g4').innerText = "";
    return false;
  }


}

var API_KEY;
// IMPORTANTE -> La città è da passare
var city = localStorage.getItem('city');

// GIORNI E ORARI
var data = new Date();
var giorni = new Array();
giorni = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// getDay() restituisce l'inice del giorno della settimana corrente
var i = data.getDay();

document.getElementById('g1').innerText = giorni[i] + " " + addDayToDate(0).getDate();
document.getElementById('g2').innerText = giorni[(i+1)%7] + " " + addDayToDate(1).getDate();
document.getElementById('g3').innerText = giorni[(i+2)%7] + " " + addDayToDate(2).getDate();
document.getElementById('g4').innerText = giorni[(i+3)%7] + " " + addDayToDate(3).getDate();

// controllo se ha inserito qualcosa
if(city=='null'){
  document.getElementById('nomeCit').innerText = "ERROR";
  document.getElementById('giornoCorrente').innerHTML = "<h5 style='margin-bottom:0;padding-top: 5%;'>Insert a valid city</h5>";
  document.getElementById('giornoCorrente').style.width = "100%";
} else {
  getAPI().then(function(val){
    // api key di weather API
    API_KEY = val;
    getMeteo(city);
  });

}
