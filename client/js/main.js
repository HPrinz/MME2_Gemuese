function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
    pickDate();
    makeHttpRequest();  
    
    window.onresize = function(event) {
        document.getElementById("gemueseFirstDiv").innerHTML="";
        document.getElementById("gemueseSecondDiv").innerHTML = "";
        proceedFruits(currentFruits);
        }

   
};

function pickDate(){
    var s = "-";
    this.date = new Date();
    if(date.getMonth()<10){
        s += "0";
    }
    var x =date.getMonth()+1;
    
    $('#mydatepicker').attr('value',  date.getDate()+ s + x +"-"+date.getFullYear());
    $('#mydatepicker').datepicker({
        format: 'dd-mm-yyyy',
        todayBtn: 'linked',
    });
    $('#mydatepicker').datepicker().on('changeDate', function(ev){
      
        date = ev.date;
        
        document.getElementById("gemueseFirstDiv").innerHTML = "";
        document.getElementById("gemueseSecondDiv").innerHTML = "";
        
        $( '#upLink' ).click (); 
        
        getCurrentFruitList();
                              
    });


}

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
                fruits.push(temp);
                string = string + " " + temp.name;
            }  
            
            getCurrentFruitList();
        }
    };
    xmlhttp.send(null);
}


function getCurrentFruitList(){
     
    this.currentFruits = new Array();
        for ( var i = 0; i < fruits.length; i++) {
            if (getCurrentFruit(fruits[i])==true){
                currentFruits.push(fruits[i]);
            }
        }
        proceedFruits(currentFruits);
}


function getCurrentFruit(fruit) {
        
            var begin = new Date(Date.parse(fruit.seasonbegin));
            var end = new Date(Date.parse(fruit.seasonend));
            begin.setFullYear(date.getFullYear());
            end.setFullYear(date.getFullYear());
            
            if (begin<end){
     
                if(date <= end && date >= begin) {
                    return true;
                }
                else {
                    return false;
                }
            }             
            else {
               
               if (date>begin||date<end){
                   return true;
               }
               else return false;            
            }        
        
}


function proceedFruits(e) {
    for(var i = 0; i < e.length; i++) {
        
        this.singleGemueseDiv = document.createElement("div");
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
        else if(e[i].name=="Bohnen") {
            img.src="img/vegies/sugar_snap.png"; 
            img.id="Bohnen";
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
        else if(e[i].name=="Kartoffeln") {
            img.src="img/vegies/potato.png"; 
            img.id="Kartoffeln";
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
        else if(e[i].name=="Pilze") {
            img.src="img/vegies/mushroom.png"; 
            img.id="Pilze";
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
        else if(e[i].name=="Zwiebeln") {
             img.src="img/vegies/onion.png"; 
            img.id="Zwiebeln";
        }
        
        img.onclick=function(){
              writeDescription();       
        }; 
      
        
        singleGemueseDiv.id="singleGemueseDiv";
        singleGemueseDiv.appendChild(img);

        if(i<1){
            document.getElementById("down").style.visibility='hidden';
            document.getElementById("gemueseFirstDiv").appendChild(singleGemueseDiv);
        }  
        
        var breiteGemuese = parseInt(document.getElementById("singleGemueseDiv").offsetWidth);
        var breite = parseInt(document.getElementById("gemueseFirstDiv").offsetWidth);
        var hoehe = parseInt(document.getElementById("gemueseFirstDiv").offsetHeight);
        var anzahlBreite = parseInt(breite/breiteGemuese );
        var anzahlHoehe = parseInt(hoehe/breiteGemuese );   
        var gesamtZahl = anzahlBreite * anzahlHoehe;
        
        if (i<gesamtZahl){
            document.getElementById("down").style.visibility='hidden';
            document.getElementById("gemueseFirstDiv").appendChild(singleGemueseDiv);
        }
            else {
                document.getElementById("down").style.visibility='visible';
                document.getElementById("gemueseSecondDiv").appendChild(singleGemueseDiv);
            }
         
    }
}


function writeDescription() {
    eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
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

    }
 }

}