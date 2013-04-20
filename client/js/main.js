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
    this.fruits = new Array();

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
            
        }
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = JSON.parse(xmlhttp.responseText);
            var string = "";

            for ( var i = 0; i < response.fruits.length; i++) {
                var temp = JSON.parse(response.fruits[i]);
                fruits[i] = temp;
                string = string + " " + temp.name;
            }
            
            proceedFruits(fruits);
        }
    };
    xmlhttp.send(null);
}

function proceedFruits(e) {
    for(var i = 0; i < e.length; i++) {
        
        this.img = document.createElement("img");
        this.beschreibung = "";
        
        if(e[i].name=="Apfel") {
            img.src="img/vegies/apple.png"; 
            img.id="Apfel";            
        }    
        if(e[i].name=="Melone") {
            img.src="img/vegies/melone.png"; 
            img.id="Melone";
        }
        if(e[i].name=="Mais") {
            img.src="img/vegies/mais.png"; 
            img.id="Mais";
        }
        if(e[i].name=="Karotte") {
            img.src="img/vegies/carrot.png"; 
            img.id="Karotte";
        }
        if(e[i].name=="Tomate") {
            img.src="img/vegies/tomato.png"; 
            img.id="Tomate";
        }
        
        img.onclick=function(){
              writeDescription();       
        };        
        
        document.getElementById("testDiv").appendChild(img); 
    }
}

function writeDescription() {
    eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
    eventtype=event.type;    
    
    for(var i = 0; i < fruits.length; i++) {
        if(fruits[i].name == eventSrcID) {
            var pic = document.createElement("img");
            pic.src=document.getElementById(eventSrcID).src;
            document.getElementById("firstDiv").innerHTML = "";
            document.getElementById("secondDiv").innerHTML = "";
            document.getElementById("firstDiv").appendChild(pic);
            document.getElementById("secondDiv").innerHTML = fruits[i].description;            
        }
    }
}