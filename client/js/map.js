function initialize(coords) {
    var latlng = new google.maps.LatLng(coords.latitude, coords.longitude);
    var myOptions = {
        zoom: 14,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,      
    };
    
    var map = new google.maps.Map(document.getElementById("pos"), myOptions);
            
    var marker = new google.maps.Marker({
        position: latlng, 
        map: map, 
        title: "your position"
    });
    
    
}


navigator.geolocation.getCurrentPosition(function(position) { 
    initialize(position.coords);
}, function() {
    document.getElementById('pos').innerHTML = 'Deine Position konnte leider nicht ermittelt werden';
});
  