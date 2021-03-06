/**
 * initial method
 */
window.onload = function() {
	
	makeHttpRequest();
	if(firstTime()){
		startTutorial();
	}
};

/**
 * sends the Request to the server to get all gemueses
 */
function makeHttpRequest() {
	var xmlhttp = new XMLHttpRequest();
	var fruitsArray = [];

	xmlhttp.open("GET", 'rest/gemueseREST/list', true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);

			for ( var i = 0; i < response.fruits.length; i++) {

				var temp = JSON.parse(response.fruits[i]);
				fruitsArray.push(temp);
			}
			initVariables(fruitsArray);
		}
	};
	xmlhttp.send("");
}

/**
 * initializes the UI
 * @param fruitsArray the array containing the fruits to show
 */
function initVariables(fruitsArray) {

	// four colors
	var buckets = 4;

	var colorScheme = 'rbow2';
	months = [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ];
	monthsEng = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];

	d3.select('#vis').classed(colorScheme, true);
	
	createTiles("all", fruitsArray);
	reColorTiles(fruitsArray);

	// All, Obst, Gemüse button event listener
	$('input[name="type"]').change(function() {
		
		console.log("input changed");
		
		var type = $(this).val();
		if (type === "all"){
			$("#all_btn").addClass("sel");
			$("#gemuese_btn").removeClass("sel");
			$("#obst_btn").removeClass("sel");
		}else if (type === "gemuese"){
			$("#gemuese_btn").addClass("sel");
			$("#all_btn").removeClass("sel");
			$("#obst_btn").removeClass("sel");
		}else if (type === "obst"){
			$("#obst_btn").addClass("sel");
			$("#all_btn").removeClass("sel");
			$("#gemuese_btn").removeClass("sel");
		}

		d3.select('#vis').classed(colorScheme, true);

		createTiles(type, fruitsArray);
		reColorTiles(fruitsArray);
		addHovers();
	});
	
	addHovers();
}

/**
 * setting the colors for the tiles dependiing to the season
 * @param fruitsArray
 */
function reColorTiles(fruitsArray) {

	var side = d3.select('#tiles').attr('class');

	if (side === 'front') {
		side = 'back';
	} else {
		side = 'front';
	}

	//through all vegetables
	for ( var d = 0; d < fruitsArray.length; d++) {
		//through  all months
		for ( var h = 0; h <= monthsEng.length; h++) {

			// select the correct tile
			var sel = '#d' + d + 'h' + h + ' .tile .' + side;
			// from "mar" to "M�r"
			var mon = monthsEng[h];
			// get the correct season (none, storage, greenhouse, fresh)
			var val = fruitsArray[d].season[mon];
			$(sel).addClass(val);
		}
	}
	// nice animation
	flipTiles(fruitsArray);
}

/**
 * adding hover animation to the tiles
 */
function addHovers(){
	
	
	
	// table tiles mouseover events
	$('#tiles td').hover(function() {
		$(this).addClass('sel');
		console.log("addHovers");

		var classlist = $("#" + $(this).attr('id') + " .tile .back").attr("class").split(/\s+/);
		$.each(classlist, function(index, item) {
			if (item == "fresh") {
				$("#leg_fresh").addClass("lihover");
				$("#leg_fresh").text("Frisch");
			} else if (item == "greenhouse") {
				$("#leg_greenhouse").addClass("lihover");
				$("#leg_greenhouse").text("Gewächshaus");
			} else if (item == "storage") {
				$("#leg_storage").addClass("lihover");
				$("#leg_storage").text("Lager");
			} else if (item == "none") {
				$("#leg_none").addClass("lihover");
				$("#leg_none").text("Keine Saison");
			}
		});

	}, function() {
		$(this).removeClass('sel');
		var classlist = $("#" + $(this).attr('id') + " .tile .back").attr("class").split(/\s+/);
		$.each(classlist, function(index, item) {
			if (item == "fresh") {
				$("#leg_fresh").removeClass("lihover");
				$("#leg_fresh").text("");
			} else if (item == "greenhouse") {
				$("#leg_greenhouse").removeClass("lihover");
				$("#leg_greenhouse").text("");
			} else if (item == "storage") {
				$("#leg_storage").removeClass("lihover");
				$("#leg_storage").text("");
			} else if (item == "none") {
				$("#leg_none").removeClass("lihover");
				$("#leg_none").text("");
			}
		});
	});
}

/**
 * nice animation
 * @param fruitsArray
 */
function flipTiles(fruitsArray) {

	var oldSide = d3.select('#tiles').attr('class'), newSide = '';

	if (oldSide == 'front') {
		newSide = 'back';
	} else {
		newSide = 'front';
	}

	var flipper = function(h, d, side) {
		return function() {
			var sel = '#d' + d + 'h' + h + ' .tile', rotateY = 'rotateY(180deg)';

			if (side === 'back') {
				rotateY = 'rotateY(0deg)';
			}

			d3.select(sel).style('-webkit-transform', rotateY);
		};
	};

	for ( var h = 0; h < months.length; h++) {
		for ( var d = 0; d < fruitsArray.length; d++) {
			var side = d3.select('#tiles').attr('class');
			setTimeout(flipper(h, d, side), (h * 20) + (d * 20) + (Math.random() * 10));
		}
	}
	d3.select('#tiles').attr('class', newSide);
}

/**
 * create the table
 * @param type the type of fruit to show (all, gemuese or obst)
 * @param fruitsArray the fruits
 */
function createTiles(type, fruitsArray) {

	var html = '<table id="tiles" class="front">';

	html += '<tr><th><div>&nbsp;</div></th>';

	// zeilen
	for ( var h = 0; h < months.length; h++) {
		html += '<th class="h' + h + '">' + months[h] + '</th>';
	}

	html += '</tr>';

	// zellen
	for ( var d = 0; d < fruitsArray.length; d++) {
		if ((fruitsArray[d].vegetable == false && type == "obst")
				|| (fruitsArray[d].vegetable == true && type == "gemuese") || type == "all") {
			html += '<tr class="d' + d + '">';
			html += '<th class="fruitname">' + fruitsArray[d].name + '</a></th>';
			for ( var month = 0; month < months.length; month++) {

				var currentMonth = new Date().getMonth();
				if (month === currentMonth) {
					html += '<td class="tdcurr" id="d'
							+ d
							+ 'h'
							+ month
							+ '" class="d'
							+ d
							+ ' h'
							+ month
							+ '"><div class="tile tilecurr"><div class="face facecurr front"></div><div class="face facecurr back"></div></div></td>';
				} else {
					html += '<td id="d'
							+ d
							+ 'h'
							+ month
							+ '" class="d'
							+ d
							+ ' h'
							+ month
							+ '"><div class="tile"><div class="face front"></div><div class="face back"></div></div></td>';
				}
			}

			html += '</tr>';
		}
	}

	html += '</table>';
	// add the table to the vis-Element
	d3.select('#vis').html(html);
}

function showAuswahlPopover() {
	$('#gemuese_btn').popover('show');
}

function hideAuswahlPopover() {
	$('#gemuese_btn').popover('destroy');
}

function showLegendPopover() {
	$('#legend').popover('show');
}

function hideLegendPopover() {
	$('#legend').popover('destroy');
}

// Tutorial Animation
function startTutorial() {
	var openAuswahlTimeout = setTimeout(showAuswahlPopover, 1000);
	var closeAuswahlTimeout = setTimeout(hideAuswahlPopover, 5000);
	var openAuswahlPopoverTimeout = setTimeout(showLegendPopover, 5500);
	var closeAuswahlPopoverTimeout = setTimeout(hideLegendPopover, 9500);
}

//============= COOKIE ZONE - NOM NOM NOM ============= //

//Erzeuge und Speichere einen Cookie
function setCookie(c_name,value,exdays) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + exdays);
 var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
 document.cookie = c_name + "=" + c_value;
}

//Holt den Wert aus einem Cookie
function getCookie(c_name) {
 var c_value = document.cookie;
 var c_start = c_value.indexOf(" " + c_name + "=");
 
 if (c_start == -1) {
     c_start = c_value.indexOf(c_name + "=");
 }
 
 if (c_start == -1) {
     c_value = null;
     
 } else {
     c_start = c_value.indexOf("=", c_start) + 1;
     
     var c_end = c_value.indexOf(";", c_start);
     
     if (c_end == -1) {
         c_end = c_value.length;
     }
     
     c_value = unescape(c_value.substring(c_start, c_end));
 }

 return c_value;
}

//Kontrolliert ob es bereits einen gesetzten Cookie gibt
function firstTime() {    
 var cookie = getCookie("watchedCalendarTutorial");

 if (cookie != null && cookie != "") {        
     
     return false;
     
 } else {        
     value="true";
     setCookie("watchedCalendarTutorial", value, 365);

     return true;
 }
}
