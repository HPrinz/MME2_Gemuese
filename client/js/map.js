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


// Initzierung der Map und Navigröße
window.onload = function() {
    var windowHeight = window.outerHeight;
    
    var karte = document.getElementById('pos');
    var k_height = windowHeight - 290;
    karte.style.height = k_height + 'px';
    
    var maerkte = document.getElementById('bioNav');
    var m_height = windowHeight - 471;
    maerkte.style.height = m_height + 'px'; 
};


// Resizehandler
window.onresize = function(event) {   
    var windowHeight = window.outerHeight;
    
    var karte = document.getElementById('pos');
    var k_height = windowHeight - 290;
    karte.style.height = k_height + 'px';
    
    var maerkte = document.getElementById('bioNav');
    var m_height = windowHeight - 471;
    maerkte.style.height = m_height + 'px';
};


// background scroll prevent für die Märkte Liste
$('#bioNav').
    bind('mousewheel DOMMouseScroll', function (e) {
        // console.log("scroll");
        var delta = e.wheelDelta || -e.detail;             
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 10;
        e.preventDefault();
    });


// background scroll prevent für das Navigations-Popup
$('#nav-popup').
    bind('mousewheel DOMMouseScroll', function (e) {
        // console.log("scroll");
        var delta = e.wheelDelta || -e.detail;             
        this.scrollTop += ( delta < 0 ? 1 : -1 ) * 10;
        e.preventDefault();
    });


/*
 * Auf gehts!
 */
function initialize(latlng, showUserMarker) {    
    
    // navigation
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
   
    // user-marker
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        icon: "img/marker/user.png",
        title: "Deine Position"
    });
    
    // user-marker InfoBubble
    this.userInfoBubble = new InfoBubble({
        map: map,        
        hideCloseButton: true,
        content: '<div class="userInfoBubbleContent">' + '<p class="infoBubbleHeadline">' + 'Hier bist Du!' + '</p>' + '<p class="infoBubbleAddress">' + 'Klicke auf die Marker für nähere Informationen.' + '</p>' + '</div>'
    });    

    var infoBubbleHandler = function() {
        if (!userInfoBubble.isOpen()) {
            userInfoBubble.open(map, marker);            
        }
    };                
    
    google.maps.event.addListener(marker, 'click', infoBubbleHandler);    
    
    marker.setMap(map);            
    
    this.markersArray = [];
    this.wochenmarktArray = [];
    this.biomarktArray = [];    
    this.markerBubbleArray = [];
    
    this.userMarker = marker;        
    
    getAllMarkets();       
    
    // Cookie-Action
    if(firstTime()) {
        startTutorial();
    }
}


function showUserBubble() {    
    this.userInfoBubble.open(this.map, this.userMarker);
}

function hideUserBubble() {
    this.userInfoBubble.close();
}

function showAuswahlPopover() {
    $('#auswahl').popover('show');
}

function hideAuswahlPopover() {
    $('#auswahl').popover('destroy');
}

function showMarketPopover() {
    $('#bioNav').popover('show');
}

function hideMarketPopover() {
    $('#bioNav').popover('destroy');
}

// Tutorial Animation
function startTutorial() {
    var openUserBubbleTimeout = setTimeout(showUserBubble, 1000);
    var closeUserBubbleTimeout = setTimeout(hideUserBubble, 5000);    
    var openAuswahlPopoverTimeout = setTimeout(showAuswahlPopover, 5500);
    var closeAuswahlPopoverTimeout = setTimeout(hideAuswahlPopover, 9500);
    var openMarketPopoverTimeout = setTimeout(showMarketPopover, 10000);
    var closeMarketPopoverTimeout = setTimeout(hideMarketPopover, 14000);
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
        // Ausgabe auf der linken Navbar Anfang (BIOMÄRKTE)
        
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
        // Ausgabe auf der linken Navbar Anfang (WOCHENMÄRKTE)
        
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
      
    var markerAndBubble = [];
    markerAndBubble.push(marker);
    markerAndBubble.push(infoBubble);
    
    this.markerBubbleArray.push(markerAndBubble);
    
    // Listen for user click on map to close any open info bubbles and remove navigation
    google.maps.event.addListener(map, "click", function () { 
        infoBubble.close();              
        clearNavigation(); 
        hideUserBubble();        
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
 * Zeichnet die Route zu einem Punkt auf der Karte
 */
function showRoute() {    
    // löscht die alte ausgabe
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
    // löscht die alte ausgabe
    var navContent = document.getElementById('nav_content');
    navContent.innerHTML = "";  
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

    xmlhttp.open("GET", 'http://127.0.0.1:9090/gemuese/rest/marketREST/list', true);
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
    
    if(auswahl == "Alle") {
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
 * Zentriert die Map an der Position des Marktes und öffent eine InfoBubble
 */
function centerMap() {
    eventSrcID = (event.srcElement)?event.srcElement.id:'undefined';
    eventtype = event.type;        
    
    var temp01 = eventSrcID.split("(",2);
    var temp02 = temp01[1].split(")",1);
        
    var latitude = temp02[0].split(",",1)
    var longitude = temp02[0].split(",",2)
    
    var coords = new google.maps.LatLng(latitude[0], longitude[1])    
    
    map.setCenter(coords);
    
    for(var i = 0; i < this.markersArray.length; i++) {                                        
        var marker = this.markerBubbleArray[i][0];
        var latlng = this.markerBubbleArray[i][0].position;
        var bubble = this.markerBubbleArray[i][1];
        
        if(latlng.lat() == coords.lat()) {
            bubble.open(this.map, marker);            
        }            
    }
}


/*
 * Zentriert die Karte an der Benutzerposition
 */
function centerUser() {
    map.setCenter(this.userLatLng);
}


// ============= COOKIE ZONE - NOM NOM NOM ============= //

// Erzeuge und Speichere einen Cookie
function setCookie(c_name,value,exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}

// Holt den Wert aus einem Cookie
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

// Kontrolliert ob es bereits einen gesetzten Cookie gibt
function firstTime() {    
    var cookie = getCookie("wasHereBevore");
  
    if (cookie != null && cookie != "") {        
        
        return false;
        
    } else {        
        value="true";
        setCookie("wasHereBevore", value, 365);

        return true;
    }
}