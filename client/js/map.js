function initialize(latlng, showUserMarker) {

    var myOptions = {
        zoom : 14,
        center : latlng,
        mapTypeId : google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("pos"), myOptions);

    if (showUserMarker) {
        var marker = new google.maps.Marker({
            position : latlng,
            map : map,
            title : "Deine Position"
        });

        marker.setMap(map);
    }

}

navigator.geolocation.getCurrentPosition(function(position) {
    initialize(new google.maps.LatLng(position.coords.latitude, position.coords.longitude), true);
}, function() {
    initialize(new google.maps.LatLng(52.521180, 13.413585), false);
});
