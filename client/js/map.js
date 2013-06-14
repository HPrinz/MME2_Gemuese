/*
 * Initziert die Benutzerposition
 */
navigator.geolocation.getCurrentPosition(function(position) {
    this.userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    initialize(userLatLng, true);
}, function() {
    this.userLatLng = new google.maps.LatLng(52.521180, 13.413585);    
    initialize(userLatLng, false);
});


// Initzierung der MAp und Navigröße
window.onload = function() {
    var windowHeight = window.outerHeight;
    
    var karte = document.getElementById('pos');
    var k_height = windowHeight - 290;
    karte.style.height = k_height + 'px';
    
    var maerkte = document.getElementById('bioNav');
    var m_height = windowHeight - 565;
    maerkte.style.height = m_height + 'px'; 
};


// Resizehandler
window.onresize = function(event) {   
    var windowHeight = window.outerHeight;
    
    var karte = document.getElementById('pos');
    var k_height = windowHeight - 290;
    karte.style.height = k_height + 'px';
    
    var maerkte = document.getElementById('bioNav');
    var m_height = windowHeight - 565;
    maerkte.style.height = m_height + 'px';
};


// background scroll prevent für die Märkte Liste
$( '#bioNav' ).
    bind( 'mousewheel DOMMouseScroll', function ( e ) {
        // console.log("scroll");
        var delta = e.wheelDelta || -e.detail;             
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 10;
        e.preventDefault();
    });


/*
 * Auf gehts!
 */
function initialize(latlng, showUserMarker) {    
    
    this.directionsService = new google.maps.DirectionsService();
    
    // navigation
    this.directionsDisplay = new google.maps.DirectionsRenderer();
    
    var myOptions = {
        zoom: 15,
        center: latlng,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP 
    };

    this.map = new google.maps.Map(document.getElementById("pos"), myOptions);
    
    // verstecke alle points of intrests
    var noPoi = [{
        featureType: "poi",
        stylers: [{ visibility: "off" }]   
    }];

    this.map.setOptions({styles: noPoi});
    
    // navigation
    this.directionsDisplay.setMap(map);
   
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/marker/user.png",
        title: "Deine Position"
    });
    
    this.userMarker = marker;

    marker.setMap(map);
    
    this.markersArray = [];
    this.wochenmarktArray = [];
    this.biomarktArray = [];
    
    getAllMarkets();        
}


/*
 * Zeichnet einen Markt auf die Karte
 */
function showMarket(market) {
    var latlng = new google.maps.LatLng(market.latitude, market.longitude);    
        
    if(market.type == "Supermarkt") {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: market.name,
            icon: "img/marker/supermarket.png"
        });
        
        // =======================================================
        // Ausgabe auf der linken Navbar Anfang
        
        var link = document.createElement("a");        
        
        link.onclick=function() {
              centerMap();       
        };       
        
        link.id = latlng;        
        var adresse = market.address.split(",",1);
        link.innerHTML = adresse;
        document.getElementById("biomarkt").appendChild(link);
        
        // Ausgabe auf der linken Navbar Ende        
        // =======================================================
        
        this.biomarktArray.push(marker);
    }
    
    if(market.type == "Wochenmarkt") {
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: market.name,
            icon: "img/marker/farmstand.png",            
        });
        
        
        // =======================================================
        // Ausgabe auf der linken Navbar Anfang
        
        var link = document.createElement("a");        
        
        link.onclick=function() {
              centerMap();       
        };       
        
        link.id = latlng;        
        var adresse = market.address.split(",",1);
        link.innerHTML = adresse;
        document.getElementById("wochenmarkt").appendChild(link);
        
        // Ausgabe auf der linken Navbar Ende        
        // =======================================================
        
        this.wochenmarktArray.push(marker);
    }

    marker.setMap(map);        
    
    var infoBubble = new InfoBubble({
        map: map,        
        hideCloseButton: true,
        content: '<div class="infoBubbleContent">' + '<p class="infoBubbleHeadline">' + market.name + '</p>' + '<p class="infoBubbleAddress">' + market.address + '</p>' + '<p class="infoBubbleOpening">' + market.openingHours  + '</p>' + '<hr>' + '<a href="javascript:routfinder(\'' + latlng + '\')">' + "Routenplanung" + '</a>' + '</div>'
    });

    infoBubble.open(map, this.marker);

    var infoBubbleHandler = function() {
        if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);            
        }
    };
    
    this.markersArray.push(marker);
    
    // Listen for user click on map to close any open info bubbles and remove navigation
    google.maps.event.addListener(map, "click", function () { 
        infoBubble.close();
        clearNavigation();        
    });

    google.maps.event.addListener(marker, 'click', infoBubbleHandler);
}


/*
 * Initziert die Navigation
 */
function routfinder(coords) {
    this.marketCoords = coords;
    $('#route_modal').modal('show');     
}


/*
 * Berechnet die Entfernung zu einem Punkt auf der Karte
 */
function showRoute() {
    var navContent = document.getElementById('nav_content');
    navContent.innerHTML = "";    
    
    var selectedMode = document.getElementById('mode').value;
    
    var request = {
        origin: userMarker.position,
        destination: this.marketCoords,                      
        travelMode: google.maps.TravelMode[selectedMode]
    };
    
    this.directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        this.directionsDisplay.setDirections(response);
        showNavigation(response);        
    }
    });        
}


/*
 * Gibt die Navigationsdetails im Popup aus
 */
function showNavigation(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];
    
    for (var i = 0; i < myRoute.steps.length; i++) {                
        var instruction = document.createElement("p");
        instruction.innerHTML = myRoute.steps[i].instructions;
        document.getElementById('nav_content').appendChild(document.createElement("hr"));
        document.getElementById('nav_content').appendChild(instruction);              
    }        
}


/*
 * Löscht die Navigationsroute von der Karte
 */
function clearNavigation() {
    this.directionsDisplay.setDirections({routes: []});
}


/*
 * Startet einen Request und ruft showMarket mit dem Ergebnis auf
 */
function getAllMarkets() {
    var xmlhttp = null;
    var markets = new Array();

    // Mozilla
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", 'http://127.0.0.1:9090/gemuese/marketREST/list', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState != 4) {
            // $('ergebnis').innerHTML = 'Marker werde geladen ...';
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            
            for ( var i = 0; i < response.market.length; i++) {
                var market = JSON.parse(response.market[i]);                
                markets[i] = market;
                showMarket(market);
            }                       
        }
    };
    
    xmlhttp.send(null);    
}


/*
 * ChangeListener für die Märkte-Auswahl
 */
function filter() {        
    var a = document.getElementById("auswahl");
    var auswahl = a.options[a.selectedIndex].text;
    
    if(auswahl == "Alles") {
        document.getElementById("wochenmarkt").style.visibility="visible";
        document.getElementById("wochenmarkt").style.height="auto";
        
        document.getElementById("biomarkt").style.visibility="visible";
        document.getElementById("biomarkt").style.height="auto";
        clearOverlays();
        for(var i = 0; i < this.markersArray.length; i++) {
            this.markersArray[i].setMap(this.map);
        }
    }
    
    if(auswahl == "Biomarkt") { 
        document.getElementById("biomarkt").style.visibility="visible";
        document.getElementById("biomarkt").style.height="auto";
        
        document.getElementById("wochenmarkt").style.visibility="hidden";
        document.getElementById("wochenmarkt").style.height="0px";
        clearOverlays();
        for(var i = 0; i < this.biomarktArray.length; i++) {
            this.biomarktArray[i].setMap(this.map);
        }
    }
    
    if(auswahl == "Wochenmarkt") {
        document.getElementById("wochenmarkt").style.visibility="visible";
        document.getElementById("wochenmarkt").style.height="auto";
        
        document.getElementById("biomarkt").style.visibility="hidden";
        document.getElementById("biomarkt").style.height="0px";
        clearOverlays();          
        for(var i = 0; i < this.wochenmarktArray.length; i++) {
            this.wochenmarktArray[i].setMap(this.map);
        }
    }
}


/*
 * Löscht alle Marker bis auf den User Marker
 */
function clearOverlays() {
  for (var i = 0; i < this.markersArray.length; i++ ) {
    this.markersArray[i].setMap(null);
  }
}


/*
 * Zentriert die Map an der Position des Marktes
 */
function centerMap() {
    eventSrcID = (event.srcElement)?event.srcElement.id:'undefined';
    eventtype = event.type;        
    
    var temp01 = eventSrcID.split("(",2);
    var temp02 = temp01[1].split(")",1);
    
    var latitude = temp02[0].split(",",1)
    var longitude = temp02[0].split(",",2)
    
    map.setCenter(new google.maps.LatLng(latitude[0], longitude[1]));
}


/*
 * Zentriert die Karte an der Benutzerposition
 */
function centerUser() {
    map.setCenter(this.userLatLng);
}