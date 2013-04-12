function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
    $('link').onclick = function() {
        makeHttpRequest();
        return false;
    };
};

function makeHttpRequest() {
    var xmlhttp = null;
    var fruits = new Array();

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
            // var string = "";

            for ( var i = 0; i < response.fruits.length; i++) {
                var temp = JSON.parse(response.fruits[i]);
                fruits[i] = temp;
                string = string + " " + temp.name;
            }
            $('ergebnis').innerHTML = '';
            proceedFruits(fruits);
        }
    };
    xmlhttp.send(null);
}

function proceedFruits(e) {
    for(var i = 0; i < e.length; i++) {

        var img = document.createElement("img");

        if(e[i].name=="Apfel") {
            img.src="img/vegies/apple.png";
        }

        if(e[i].name=="Melone") img.src="img/vegies/melone.png";
        if(e[i].name=="Mais") img.src="img/vegies/mais.png";
        if(e[i].name=="Karotte") img.src="img/vegies/carrot.png";
        if(e[i].name=="Tomate") img.src="img/vegies/tomato.png";

        document.getElementById("testDiv").appendChild(img);
    }
}