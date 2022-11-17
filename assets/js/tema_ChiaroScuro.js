// formato: giorni passati dal 1970
var dataCorrente = new Date().getTime() / (1000*60*60*24);;
var dataScelta;

if(localStorage.getItem('tema') == null){
	// se non ho memorizzato nessuna preferenza, allora salvo il tema 'chiaro' come preferenza e imposto la data di ultimo cambio tema alla data corrente
	localStorage.setItem('tema', 'chiaro');
	localStorage.setItem('data', dataCorrente);
} else {
	// se ho memorizzato una preferenza, allora controllo se la preferenza è scura e se dalla data della scelta sono passati meno di 10 giorni. Se entrambe sono vere vado a mettere la pagina scura, altrimenti metto il tema chiaro e salvo come data di ultima scelta la data corrente
	dataScelta = localStorage.getItem('data');
	if((localStorage.getItem('tema') == 'scuro') && (dataCorrente-dataScelta < 10)){
		localStorage.setItem('tema', 'chiaro');
		temaScuro();
	} else {
		localStorage.setItem('tema', 'chiaro');
		localStorage.setItem('data', dataCorrente);
	}
}

// funzione che modifica la pagina per passare al tema scuro
function temaScuro(){

	if (localStorage.getItem('tema') == 'chiaro'){
		localStorage.setItem('tema', 'scuro');
		document.getElementById('emoji').innerHTML = "☽";
	} else {
		localStorage.setItem('tema', 'chiaro');
		document.getElementById('emoji').innerHTML = "☼";
	}

	// aggiorno data di ultimo cambio tema
	dataCorrente = new Date().getTime() / (1000*60*60*24);
	localStorage.setItem('data', dataCorrente);

	// in base alla pagina in cui mi trovo applico regole diverse
	var location = window.location.pathname;

	document.getElementById('btnCrediti').classList.toggle("btn-outline-light");

	// index.html
	if ((location == '/index.html') || (location == '/index') || (location == '/')){

		var elementBody = document.body;
		elementBody.classList.toggle("dark-mode-body");

		var main = document.getElementsByTagName('main');
		main[0].classList.toggle("dark-mode-main");

		var footer = document.getElementsByTagName('footer');
		footer[0].classList.toggle("dark-mode-footer");

		document.getElementById('citIta').classList.toggle("dark-mode-citIta");

		document.getElementById('btnBergamo').classList.toggle("btn-outline-light");
		document.getElementById('btnMilano').classList.toggle("btn-outline-light");
		document.getElementById('btnRoma').classList.toggle("btn-outline-light");
	  document.getElementById('btnBologna').classList.toggle("btn-outline-light");
		document.getElementById('btnTrento').classList.toggle("btn-outline-light");
		document.getElementById('btnPalermo').classList.toggle("btn-outline-light");


		document.getElementById('imgArt1').classList.toggle("dark-mode-foto");
		document.getElementById('imgArt2').classList.toggle("dark-mode-foto");

		document.getElementById('citIta').classList.toggle("dark-mode-citIta");

		document.getElementById('articolo1').classList.toggle("dark-mode-articoli");
		document.getElementById('articolo2').classList.toggle("dark-mode-articoli");


	}

	// ricerca.html
	if((location == '/ricerca.html') || (location == '/ricerca')){
		var body = document.getElementsByTagName('body');
		body[0].classList.toggle("dark-mode-body-ricerca");
		var main = document.getElementsByTagName('main');
		main[0].classList.toggle("dark-mode-main-ricerca");
		document.getElementById('giornoCorrente').classList.toggle("dark-mode-giornoCorrente");
		var footer = document.getElementsByTagName('footer');
		footer[0].classList.toggle("dark-mode-footer");
	}

	// credits.html
	if((location == '/credits.html') || (location == '/credits')){
		var main = document.getElementById('mainCredits');
		main.classList.toggle("dark-mode-main-credits");
		var body = document.getElementsByTagName('body');
		body[0].classList.toggle("dark-mode-body-credits");
		var footer = document.getElementsByTagName('footer');
		footer[0].classList.toggle("dark-mode-footer-credits");
	}


}
