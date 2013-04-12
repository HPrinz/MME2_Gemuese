function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
    $('link').onclick = function() {
        getHttpRequest();
        return false;
    };
};

function getHttpRequest() {
    var xmlhttp = null;

    // Mozilla
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    // IE
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", 'http://127.0.0.1:9090/gemuese/gemueseREST/list', true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState != 4) {
            $('ergebnis').innerHTML = 'Seite wird geladen ...';
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            var string = "";

            for ( var i = 0; i < response.fruits.length; i++) {
                var temp = JSON.parse(response.fruits[i]);
                string = string + " " + temp.name;
            }
            $('ergebnis').innerHTML = string;
        }
    };
    xmlhttp.send(null);
}