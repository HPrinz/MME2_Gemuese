function makeHttpRequest() {
	var xmlhttp = new XMLHttpRequest();
	var f = [];

	xmlhttp.open("GET", 'http://127.0.0.1:9090/gemuese/gemueseREST/list', true);
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

//	console.log("fruitsArray = " + fruitsArray);

	// four colors
	var buckets = 4;

	var colorScheme = 'rbow2';

	var types = {
		obst : 'Alle',
		gemuese : 'Gemüse',
		mob : 'Obst'
	};

	months = [ 'Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep',
			'Okt', 'Nov', 'Dez' ];

	monthsEng = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug',
			'sep', 'oct', 'nov', 'dec' ];

	// for the colors TODO what is vis?
	d3.select('#vis').classed(colorScheme, true);

	createTiles("all", fruitsArray);
	reColorTiles('obst', fruitsArray, buckets);

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

	}, function() {
		$(this).removeClass('sel');
	});
}

/* ************************** */

function reColorTiles(state, fruitsArray, buckets) {

	var range = [];
	
	for ( var i = 1; i <= buckets; i++) {
		range.push(i);
	}

	// console.log("range: " + range);
	// console.log("calcs: " + calcs.min + "/" + calcs.max);

	var bucket = d3.scale.quantize().domain([ 0, 4 ]).range(range);
	var side = d3.select('#tiles').attr('class');

	if (side === 'front') {
		side = 'back';
	} else {
		side = 'front';
	}

//	console.log("length: " + fruitsArray[0].season.length);

	for ( var d = 0; d < fruitsArray.length; d++) {
		for ( var h = 0; h <= monthsEng.length; h++) {

			var sel = '#d' + d + 'h' + h + ' .tile .' + side;

			var mon = monthsEng[h];

			var val = fruitsArray[d].season[mon];

			if (val === "none") {
				val = 3;
			} else if (val === "storage") {
				val = 2;
			} else if (val === "greenhouse") {
				val = 1;
			} else if (val === "fresh") {
				val = 0;
			}

			// console.log("sel: " + sel);
			// console.log("val: " + val);

			// erase all previous bucket designations on this cell
			for ( var i = 1; i <= buckets; i++) {
				var cls = 'q' + i + '-' + buckets;
				d3.select(sel).classed(cls, false);
			}

			// set new bucket designation for this cell
			var cls = 'q' + (val > 0 ? bucket(val) : 1) + '-' + buckets;

			// console.log("cls = " + (val > 0 ?bucket(val) : 0) + "-" +
			// buckets);

			d3.select(sel).classed(cls, true);
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
			setTimeout(flipper(h, d, side), (h * 20) + (d * 20)
					+ (Math.random() * 10));
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
				|| (fruitsArray[d].vegetable == true && type == "gemuese")
				|| type == "all") {
			html += '<tr class="d' + d + '">';
			html += '<th>' + fruitsArray[d].name + '</th>';
			for ( var h = 0; h < months.length; h++) {

				var mm = new Date().getMonth() + 1;
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
