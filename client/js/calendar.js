function makeHttpRequest() {
	var xmlhttp = new XMLHttpRequest();
	var f = [];

	xmlhttp.open("GET", 'http://127.0.0.1:9090/gemuese/rest/gemueseREST/list', true);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState != 4) {

		}
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var response = JSON.parse(xmlhttp.responseText);

			for ( var i = 0; i < response.fruits.length; i++) {

				var temp = JSON.parse(response.fruits[i]);
				f.push(temp);
			}
			initVariables(f);
		}
	};
	xmlhttp.send("");

}

makeHttpRequest();

function initVariables(f) {

	var fruitsArray = f;

	// four colors
	var buckets = 4;

	var colorScheme = 'rbow2';

	months = [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez' ];

	monthsEng = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];

	d3.select('#vis').classed(colorScheme, true);

	createTiles("all", fruitsArray);
	reColorTiles('obst', fruitsArray);

	/* ************************** */

	// All, Obst, Gemüse button event listener
	$('input[name="type"]').change(function() {

		var type = $(this).val();

		console.log("type = " + type);

		state = "obst";

		createTiles(type, fruitsArray);
		reColorTiles(state, fruitsArray, buckets);
	});

	/* ************************** */

	// tiles mouseover events
	$('#tiles td').hover(function() {
		$(this).addClass('sel');
		
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

/* ************************** */

function reColorTiles(state, fruitsArray) {

	var side = d3.select('#tiles').attr('class');

	if (side === 'front') {
		side = 'back';
	} else {
		side = 'front';
	}

	for ( var d = 0; d < fruitsArray.length; d++) {
		for ( var h = 0; h <= monthsEng.length; h++) {

			var sel = '#d' + d + 'h' + h + ' .tile .' + side;

			var mon = monthsEng[h];

			var val = fruitsArray[d].season[mon];

			$(sel).addClass(val);
		}
	}
	flipTiles(fruitsArray);
}

/* ************************** */

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

/* ************************** */

function createTiles(type, fruitsArray) {

	var html = '<table id="tiles" class="front">';

	html += '<tr><th><div>&nbsp;</div></th>';

	for ( var h = 0; h < months.length; h++) {
		html += '<th class="h' + h + '">' + months[h] + '</th>';
	}

	html += '</tr>';

	for ( var d = 0; d < fruitsArray.length; d++) {
		if ((fruitsArray[d].vegetable == false && type == "obst")
				|| (fruitsArray[d].vegetable == true && type == "gemuese") || type == "all") {
			html += '<tr class="d' + d + '">';
			html += '<th class="fruitname"><a href="index.html">' + fruitsArray[d].name + '</a></th>';
			for ( var h = 0; h < months.length; h++) {

				var mm = new Date().getMonth();
				if (h === mm) {
					html += '<td class="tdcurr" id="d'
							+ d
							+ 'h'
							+ h
							+ '" class="d'
							+ d
							+ ' h'
							+ h
							+ '"><div class="tile tilecurr"><div class="face facecurr front"></div><div class="face facecurr back"></div></div></td>';
				} else {
					html += '<td id="d'
							+ d
							+ 'h'
							+ h
							+ '" class="d'
							+ d
							+ ' h'
							+ h
							+ '"><div class="tile"><div class="face front"></div><div class="face back"></div></div></td>';
				}
			}

			html += '</tr>';
		}
	}

	html += '</table>';
	d3.select('#vis').html(html);
}
