
function memorizza(city){
	localStorage.setItem("city", city);
	return true;
}


document.getElementById('btnBergamo').addEventListener("click", function (){memorizza('Bergamo');});
document.getElementById('btnMilano').addEventListener("click", function (){memorizza('Milano');});
document.getElementById('btnRoma').addEventListener("click", function (){memorizza('Roma');});
document.getElementById('btnBologna').addEventListener("click", function (){memorizza('Bologna');});
document.getElementById('btnTrento').addEventListener("click", function (){memorizza('Trento');});
document.getElementById('btnPalermo').addEventListener("click", function (){memorizza('Palermo');});
document.getElementById('btnLisbon').addEventListener("click", function (){memorizza('Lisbon');});
document.getElementById('btnDublin').addEventListener("click", function (){memorizza('Dublin');});
document.getElementById('btnLondon').addEventListener("click", function (){memorizza('London');});
document.getElementById('btnParis').addEventListener("click", function (){memorizza('Paris');});
document.getElementById('btnMadrid').addEventListener("click", function (){memorizza('Madrid');});
