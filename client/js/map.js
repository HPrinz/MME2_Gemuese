/*
 * Initziert die Benutzerposition
 */
navigator.geolocation.getCurrentPosition(function(position) {
    initialize(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), true);
}, function() {
    initialize(new google.maps.LatLng(52.521180, 13.413585), false);
});


/*
 * Auf gehts!
 */
function initialize(latlng, showUserMarker) {
    
    var myOptions = {
        zoom : 15,
        center : latlng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById("pos"), myOptions);
   
    var marker = new google.maps.Marker({
        position : latlng,
        map : map,
        icon : "img/marker/user.png",
        title : "Deine Position"
    });

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
    var latlng = new google.maps.LatLng(market.latitude, market.longitude)    
        
    if(market.type == "Supermarkt") {
        var marker = new google.maps.Marker({
            position : latlng,
            map : map,
            title : market.name,
            icon: "img/marker/supermarket.png"
        });
        this.biomarktArray.push(marker);
    }
    
    if(market.type == "Wochenmarkt") {
        var marker = new google.maps.Marker({
            position : latlng,
            map : map,
            title : market.name,
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
        content: '<div class="infoBubbleContent">' + '<p class="infoBubbleHeadline">' + market.name + '</p>' + '<p class="infoBubbleAddress">' + market.address + '</p>' + '<p class="infoBubbleOpening">' + market.openingHours  + '</p>' + '</div>'
    });

    infoBubble.open(map, this.marker);

    var infoBubbleHandler = function() {
        if (!infoBubble.isOpen()) {
            infoBubble.open(map, marker);
        }
    };
    
    this.markersArray.push(marker);
    
    // Listen for user click on map to close any open info bubbles
    google.maps.event.addListener(map, "click", function () { 
        infoBubble.close();
    });

    google.maps.event.addListener(marker, 'click', infoBubbleHandler);
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
    
    if(auswahl == "Bio- und Wochenmarkt") {
        clearOverlays();
        for(var i = 0; i < this.markersArray.length; i++) {
            this.markersArray[i].setMap(this.map);
        }
    }
    
    if(auswahl == "Biomarkt") {
        clearOverlays();
        for(var i = 0; i < this.biomarktArray.length; i++) {
            this.biomarktArray[i].setMap(this.map);
        }
    }
    
    if(auswahl == "Wochenmarkt") {
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