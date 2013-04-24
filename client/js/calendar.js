// Fix map for IE
if (!('map' in Array.prototype)) { 
  Array.prototype.map = function (mapper, that /*opt*/) { 
    var other = new Array(this.length); 
    for (var i = 0, n = this.length; i < n; i++) 
      if (i in this) 
        other[i] = mapper.call(that, this[i], i, this); 
    return other; 
  }; 
};

var buckets = 4,
	colorScheme = 'rbow2',
	days = [
		{ name: 'Apfel', abbr: 'Apfel' },
		{ name: 'Erdbeere', abbr: 'Erdbeere' },
		{ name: 'Kartoffel', abbr: 'Kartoffel' },
		{ name: 'Pilze', abbr: 'Pilze' },
		{ name: 'Salat', abbr: 'Salat' },
		{ name: 'Rote Bete', abbr: 'Rote Bete' },
		{ name: 'Gurke', abbr: 'Gurke' }
	],
	types = {
		all: 'Alle',
		pc: 'Gemüse',
		mob: 'Obst'
	},
	hours = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];
	
var data;

d3.select('#vis').classed(colorScheme, true);

d3.json('tru247.json', function(json) {
	
	data = json;

	createTiles();
	reColorTiles('all', 'all');

	/* ************************** */
	
	// All, PC, Mobile control event listener
	$('input[name="type"]').change(function() {
		
		var type = $(this).val(),
			$sel = d3.select('#map path.state.sel');
		
		d3.selectAll('fieldset#type label').classed('sel', false);
		d3.select('label[for="type_' + type + '"]').classed('sel', true);
		
		if ($sel.empty()) {
			var state = 'all';
		} else {
			var state = $sel.attr('id');
		}
		
		reColorTiles(state, type);
		d3.select('#pc2mob').attr('class', type);
		
		var type = types[selectedType()];
		d3.select('#wtf .subtitle').html(type  + ' traffic daily');
	});
	

	/* ************************** */
	
	// tiles mouseover events
	$('#tiles td').hover(function() {
	
		$(this).addClass('sel');
		
		var tmp = $(this).attr('id').split('d').join('').split('h'),
			day = parseInt(tmp[0]),
			hour = parseInt(tmp[1]);
		
		var $sel = d3.select('#map path.state.sel');
		
		var state = 'all';
		var view = 'all';

		var type = types[selectedType()];
		d3.select('#wtf .subtitle').html(type  + ' traffic on ' + days[day].name + 's');
	
	}, function() {
		
		$(this).removeClass('sel');
		
		var $sel = d3.select('#map path.state.sel');
		
		var state = 'all';

		var type = types[selectedType()];
		d3.select('#wtf .subtitle').html(type  + ' traffic daily');
	});
});

/* ************************** */

function selectedType() {
	
	//return d3.select('input[name="type"]:checked').property('value'); // IE8 doesn't like this
	return $('input[name="type"]:checked').val();
}

/* ************************** */

function getCalcs(state, view) {
	
	var min = 1,
		max = -1;
	
	// calculate min + max
	for (var d = 0; d < data[state].views.length; d++) {
		for (var h = 0; h < data[state].views[d].length; h++) {
			
			if (view === 'all') {
				var tot = data[state].views[d][h].pc + data[state].views[d][h].mob;
			} else {
				var tot = data[state].views[d][h][view];
			}
			
			if (tot > max) {
				max = tot;
			}
			
			if (tot < min) {
				min = tot;
			}
		}
	}
	
	return {'min': min, 'max': max};
};

function getSeason(vegetable) {
	
	var min = 1,
		max = -1;
	
	// calculate min + max
	for (var d = 0; d < data[state].views.length; d++) {
		for (var h = 0; h < data[state].views[d].length; h++) {
			
			if (view === 'all') {
				var tot = data[state].views[d][h].pc + data[state].views[d][h].mob;
			} else {
				var tot = data[state].views[d][h][view];
			}
			
			if (tot > max) {
				max = tot;
			}
			
			if (tot < min) {
				min = tot;
			}
		}
	}
	
	return {'min': min, 'max': max};
};

/* ************************** */

function reColorTiles(state, view) {
	
	var calcs = getCalcs(state, view),
		range = [];
	
	for (var i = 1; i <= buckets; i++) {
		range.push(i);
	}
	
    console.log("range: " + range);
    console.log("calcs: " +calcs.min + "/" + calcs.max);
    
	var bucket = d3.scale.quantize().domain([0, 0.02]).range(range),
		side = d3.select('#tiles').attr('class');
	
	
	if (side === 'front') {
		side = 'back';
	} else {
		side = 'front';
	}
	
	for (var d = 0; d < data[state].views.length; d++) {
		for (var h = 0; h < data[state].views[d].length; h++) {

			var sel = '#d' + d + 'h' + h + ' .tile .' + side,
				val = data[state].views[d][h].pc + data[state].views[d][h].mob;
			
			if (view !== 'all') {
				val = data[state].views[d][h][view];
			}
			
			// erase all previous bucket designations on this cell
			for (var i = 1; i <= buckets; i++) {
				var cls = 'q' + i + '-' + buckets;
				d3.select(sel).classed(cls , false);
			}
			
			// set new bucket designation for this cell
			var cls = 'q' + (val > 0 ? bucket(val) : 0) + '-' + buckets;
            
            console.log("cls: " + cls);
            
			d3.select(sel).classed(cls, true);
		}
	}
	flipTiles();
}

/* ************************** */

function flipTiles() {

	var oldSide = d3.select('#tiles').attr('class'),
		newSide = '';
	
	if (oldSide == 'front') {
		newSide = 'back';
	} else {
		newSide = 'front';
	}
	
	var flipper = function(h, d, side) {
		return function() {
			var sel = '#d' + d + 'h' + h + ' .tile',
				rotateY = 'rotateY(180deg)';
			
			if (side === 'back') {
				rotateY = 'rotateY(0deg)';	
			}

				d3.select(sel).style('-webkit-transform', rotateY);
		};
	};
	
	for (var h = 0; h < hours.length; h++) {
		for (var d = 0; d < days.length; d++) {
			var side = d3.select('#tiles').attr('class');
			setTimeout(flipper(h, d, side), (h * 20) + (d * 20) + (Math.random() * 100));
		}
	}
	d3.select('#tiles').attr('class', newSide);
}

/* ************************** */

function updateIE8percents(state) {

	var rawMobPercent = 100 / (data[state].pc2mob + 1);
	
	if (rawMobPercent < 1) {
		var mobPercent = '< 1',
			pcPercent = '> 99';
	} else {
		var mobPercent = Math.round(rawMobPercent),
			pcPercent = 100 - mobPercent;
	}
	
	d3.select('#pc2mob .pc span').html(pcPercent + '%');
	d3.select('#pc2mob .mob span').html(mobPercent + '%');
	
	var html = d3.select('#pc2mob ul').html();
	d3.select('#ie8_percents').html(html);
}

/* ************************** */

function createTiles() {

	var html = '<table id="tiles" class="front">';

	html += '<tr><th><div>&nbsp;</div></th>';

	for (var h = 0; h < hours.length; h++) {
		html += '<th class="h' + h + '">' + hours[h] + '</th>';
	}
	
	html += '</tr>';

	for (var d = 0; d < days.length; d++) {
		html += '<tr class="d' + d + '">';
		html += '<th>' + days[d].abbr + '</th>';
		for (var h = 0; h < hours.length; h++) {
			html += '<td id="d' + d + 'h' + h + '" class="d' + d + ' h' + h + '"><div class="tile"><div class="face front"></div><div class="face back"></div></div></td>';
		}
		html += '</tr>';
	}
	
	html += '</table>';
	d3.select('#vis').html(html);
}
