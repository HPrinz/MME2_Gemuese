function $(id) {    
    return document.getElementById(id);
}


window.onload = function() {    
    pickDate();
    makeHttpRequest();
    this.cond = true;
    
    // Tutorial
    if(firstTime()) {
        $('#welcome-modal').modal('show');     
    }
    
    
    document.getElementById("arrow").onclick=function() {
        cond = true;
    }
};


// Größenänderung des Fensters
window.onresize = function(event) {   
    document.getElementById("gemueseFirstDiv").innerHTML="";
    document.getElementById("gemueseSecondDiv").innerHTML = "";
    proceedFruits(currentFruits); 
};

/*
 * Datepicker 
 * bei Änderung des Datum, werden die entsprechenden Früchte angezeigt
 */
function pickDate() { 
    var r = "";
    var s = "-";
    this.date = new Date();
    if(date.getMonth()<10){
        s += "0";
    }
    if(date.getDate()<10){
        r += "0";
    }
    var x =date.getMonth()+1;
    
    $('#mydatepicker').attr('value', r + date.getDate()+ s + x +"-"+date.getFullYear());
    $('#mydatepicker').datepicker({
        format: 'dd-mm-yyyy',
        todayBtn: 'linked',
    });
    $('#mydatepicker').datepicker().on('changeDate', function(ev){      
        date = ev.date;
        
        document.getElementById("gemueseFirstDiv").innerHTML = "";
        document.getElementById("gemueseSecondDiv").innerHTML = "";
        
        $('#upLink').click (); 
        
        getCurrentFruitList();                              
    });
}


// Tutorial-Stuff - zeigt dem Nutzer die Funktionalitäten in Popover-FensternS
function showMapLinkPopover() {
    $('#map-link').popover('show');    
}

function hideMapLinkPopover() {
    $('#map-link').popover('destroy');
}

function showDatepickerPopover() {
    $('#mydatepicker').popover('show');
}

function hideDatepickerPopover() {
    $('#mydatepicker').popover('destroy');
}

function showFruitPopover() {
    $('#fruitTooltip').popover('show');
}

function hideFruitPopover() {
    $('#fruitTooltip').popover('destroy');
}

function startTutorial() {
    var openDatepickerPopoverTimeout = setTimeout(showDatepickerPopover, 1000);
    var closeDatepickerPopoverTimeout = setTimeout(hideDatepickerPopover, 5000);
    var openFruitPopoverTimeout = setTimeout(showFruitPopover, 5500);
    var closeFruitPopoverTimeout = setTimeout(hideFruitPopover, 9500);
    var openMapLinkPopoverTimeout = setTimeout(showMapLinkPopover, 10000);
    var openMapLinkPopoverTimeout = setTimeout(hideMapLinkPopover, 14000);
}

// Request der Obst-/Gemüsesorten
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

    xmlhttp.open("GET", 'rest/gemueseREST/list', true);
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState != 4) {}
            
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var response = JSON.parse(xmlhttp.responseText);
                var string = "";
                
                //Speicherung aller Früchte im Array fruits
                for ( var i = 0; i < response.fruits.length; i++) {
                    
                    var temp = JSON.parse(response.fruits[i]);
                    fruits.push(temp);
                    string = string + " " + temp.name;
                }  
                
                getCurrentFruitList();
            }
        };
    xmlhttp.send(null);
}

// iteriert über das fruits Array und zeigt nur nach Datum ausgewählte Sorten an
function getCurrentFruitList() {        
    this.currentFruits = new Array();
    for ( var i = 0; i < fruits.length; i++) {
        if (getCurrentFruit(fruits[i])==true){
            currentFruits.push(fruits[i]);
        }
    }
    
    proceedFruits(currentFruits);        
}

// gibt true zurück, wenn die Erntezeit der Frucht mit dem Datum übereinstimmt
function getCurrentFruit(fruit) {       
    var begin = new Date(Date.parse(fruit.seasonbegin));
    var end = new Date(Date.parse(fruit.seasonend));
    begin.setFullYear(date.getFullYear());
    end.setFullYear(date.getFullYear());
            
    if (begin < end) {
        if(date <= end && date >= begin) {
            return true;
        } else {
            return false;
        }
    } else {
        if (date > begin || date < end) {
            return true;
        } else {
            return false;            
        }
    }                
}

// holt sich zu jeder Frucht des jeweilige Bild
function proceedFruits(e) {  
    for(var i = 0; i < e.length; i++) {    
        this.singleGemueseDiv = document.createElement('a');
        this.img = document.createElement("img");
        this.beschreibung = "";
        this.text = document.createElement("h1");        
        
        if(e[i].name=="Apfel") {
            img.src="img/vegies/apple.png"; 
            img.id="Apfel";            
        }    
        else if(e[i].name=="Aubergine") {
            img.src="img/vegies/eggplant.png"; 
            img.id="Aubergine";
        }
        else if(e[i].name=="Bohne") {
            img.src="img/vegies/sugar_snap.png"; 
            img.id="Bohne";
        }
        else if(e[i].name=="Broccoli") {
            img.src="img/vegies/broccoli.png"; 
            img.id="Broccoli";
        }
        else if(e[i].name=="Chicoree") {
            img.src="img/vegies/chicoree.png"; 
            img.id="Chicoree";
        }
        else if(e[i].name=="Erdbeere") {
            img.src="img/vegies/strawberry.png"; 
            img.id="Erdbeere";
        }
        else if(e[i].name=="Heidelbeere") {
            img.src="img/vegies/blueberries.png"; 
            img.id="Heidelbeere";
        }
        else if(e[i].name=="Karotte") {
            img.src="img/vegies/carrot.png"; 
            img.id="Karotte";
        }
        else if(e[i].name=="Kartoffel") {
            img.src="img/vegies/potato.png"; 
            img.id="Kartoffel";
        }
        else if(e[i].name=="Kohlrabi") {
            img.src="img/vegies/kohlrabi.png"; 
            img.id="Kohlrabi";
        }
        else if(e[i].name=="Mais") {
            img.src="img/vegies/mais.png"; 
            img.id="Mais";
        }
        else if(e[i].name=="Melone") {
            img.src="img/vegies/melone.png"; 
            img.id="Melone";
        }
        else if(e[i].name=="Paprika") {
            img.src="img/vegies/bell_pepper.png"; 
            img.id="Paprika";
        }
        else if(e[i].name=="Pilz") {
            img.src="img/vegies/mushroom.png"; 
            img.id="Pilz";
        }
        else if(e[i].name=="Radieschen") {
            img.src="img/vegies/radish.png"; 
            img.id="Radieschen";
        }
        else if(e[i].name=="Salat") {
            img.src="img/vegies/lettuce.png"; 
            img.id="Salat";
        }
        else if(e[i].name=="Sellerie") {
            img.src="img/vegies/celery.png"; 
            img.id="Sellerie";
        }
        else if(e[i].name=="Tomate") {
            img.src="img/vegies/tomato.png"; 
            img.id="Tomate";
        }
        else if(e[i].name=="Zucchini") {
            img.src="img/vegies/zucchini.png"; 
            img.id="Zucchini";
        }
        else if(e[i].name=="Zwiebel") {
            img.src="img/vegies/onion.png"; 
            img.id="Zwiebel";
        }
        
        img.onclick=function() {
              writeDescription();  
              cond = false;
        }; 
              
        singleGemueseDiv.href = "#myCarousel";                
        singleGemueseDiv.setAttribute('data-slide', 'next');
        singleGemueseDiv.id="singleGemueseDiv";
        singleGemueseDiv.appendChild(img);
         
        this.gesamtZahl;

        if (i < 1) {
            document.getElementById("down").style.visibility='hidden';
            document.getElementById("gemueseFirstDiv").appendChild(singleGemueseDiv);
            getNumberOfFruits();
        }
        else if (i < gesamtZahl) {
            document.getElementById("down").style.visibility='hidden';
            document.getElementById("gemueseFirstDiv").appendChild(singleGemueseDiv);
        } else {
            document.getElementById("down").style.visibility='visible';
            document.getElementById("gemueseSecondDiv").appendChild(singleGemueseDiv);
        }         
    }      
}

// holt sich zu jeder Frucht die Beschreibung und Rezepte und befüllt damit die entsprechenden Divs 
function writeDescription() {    
    //eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
    eventSrcID=(event.target)?event.target.id:'undefined';
    eventtype=event.type;    
    
    for(var i = 0; i < currentFruits.length; i++) {
        if(currentFruits[i].name == eventSrcID) {
            var pic = document.createElement("img");
            pic.src=document.getElementById(eventSrcID).src;
            
            document.getElementById("gemueseName").innerHTML = "";
            document.getElementById("gemuesePic").innerHTML = "";
            document.getElementById("beschreibung").innerHTML = "";
            
            document.getElementById("gemueseName").appendChild(document.createTextNode(currentFruits[i].name));
            document.getElementById("gemuesePic").appendChild(pic);
            document.getElementById("beschreibung").innerHTML = currentFruits[i].description;  
            
            makeRecipeRequest(currentFruits[i].name);            
        }
    }    
}

// Rezepte-Request
function makeRecipeRequest(veg) {  
    
    document.getElementById("moreButton").onclick=function() {
        
        window.open("http://www.chefkoch.de/rs/s0e1n1z1i1/" + veg + "/Rezepte.html");
    };
    
    var xmlhttp = null;
    this.recipes = new Array();
    
    // Mozilla
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    
    // IE
    else if (window.ActiveXObject) {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET", 'rest/recipeREST/findByFruit/' + veg.toLowerCase(), true);
    xmlhttp.onreadystatechange = function() {
        
    if (xmlhttp.readyState != 4) {
            
    }
        
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var response = JSON.parse(xmlhttp.responseText);
            
        var string = "";
        
        for ( var i = 0; i < response.recipes.length; i++) {                
            var temp = JSON.parse(response.recipes[i]);
            recipes.push(temp);
        }  
        
        document.getElementById("recipeUebersicht").innerHTML = "";            
        
        // für jedes Rezept wird der Name und ein Miniaturbild angezeigt
        if (recipes.length > 0) {            
            for(var a = 0; a < recipes.length; a++) {
                var recDiv = document.createElement('div');
                recDiv.innerHTML="";
                recDiv.id="recDiv";
                var link = document.createElement('a');
                link.href = "#modal";  
                link.setAttribute('data-toggle', 'modal');
                                                
                var image = document.createElement('img');
                image.className="smallPic img-polaroid";
                image.id="" + a;
                image.src=recipes[a].pictures[0];                 
                
                recDiv.appendChild(document.createTextNode(recipes[a].name));
                link.appendChild(image);
                recDiv.appendChild(link);  
                document.getElementById("recipeUebersicht").appendChild(recDiv);
                
                link.onclick=function() {
                   eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
                   setModuleText(eventSrcID);                   
                }
            }     
        }
    }    
    };

    xmlhttp.send(null);   
}

// zeigt ein Modul des ausgewählten Rezepts
function setModuleText(id) {   
    var br = document.createElement("br");
                    
    document.getElementById("myModalLabel").innerHTML = recipes[id].name;
                                      
    var recImage = document.createElement('img');
    recImage.id="recImage";
    recImage.src=recipes[id].pictures[0]; 
                    
    document.getElementById("recipe").innerHTML="";                    
    document.getElementById("recipe").appendChild(recImage);
                   
    var element = document.createElement('h3');
    element.appendChild(document.createTextNode("Zutaten"));
    document.getElementById("recipe").appendChild(element);
    document.getElementById("recipe").appendChild(br);
                    
    var blub = new Array;
                   
    for (var i = 0; i < recipes[id].ingridients.length; i++) {
        var br = document.createElement("br");
        document.getElementById("recipe").appendChild(document.createTextNode(recipes[id].ingridients[i]));
        document.getElementById("recipe").appendChild(br);
    } 

    var zubereitung = document.createElement('h3');
    zubereitung.appendChild(document.createTextNode("Zubereitung"));
    document.getElementById("recipe").appendChild(zubereitung); 
    document.getElementById("recipe").appendChild(br);
                    
    blub = recipes[id].description.split("~");
    
    for (var j = 0; j < blub.length; j++) {
        var br = document.createElement("br");
        document.getElementById("recipe").appendChild(document.createTextNode(blub[j]));
        document.getElementById("recipe").appendChild(br);                                         
    }    
}

// speichert des Rezept in den LocalStorage
function printRecipe() {   
    localStorage.setItem('print-header', document.getElementById("myModalLabel").innerHTML);
    localStorage.setItem('print-body', document.getElementById("recipe").innerHTML);
}

// bestimmt die Anzeigezahl der Früchte
function getNumberOfFruits(){
    if (cond) {
        var i = document.getElementById("mynavbar").offsetWidth;
        var j = document.getElementById("mynavbar").offsetHeight;
        var k = document.getElementById("singleGemueseDiv").offsetWidth;
        
        var l = parseInt(i/k);
        var m = parseInt(j/k);
        
        gesamtZahl = m*l;
    } else {
        var breite = window.outerWidth;        
            
        if (breite > 1226) {
            gesamtZahl = 12;
        } else if (breite > 794) {
            gesamtZahl = 10;
        } else if (breite > 789) {
            gesamtZahl = 21;
        } else if (breite > 657) {
            gesamtZahl = 18;
        } else if (breite > 576) {
            gesamtZahl = 15;
        } else if (breite > 470) {
            gesamtZahl = 12;
        }
    }
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
    var cookie = getCookie("watchedIndexTutorial");
  
    if (cookie != null && cookie != "") {        
        return false;
        
    } else {        
        value="true";
        setCookie("watchedIndexTutorial", value, 365);          
        return true;
    }
}

function hideTutorial() {
    value="true";
    setCookie("watchedCalendarTutorial", value, 365);
    setCookie("watchedMapTutorial", value, 365);
}