function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
    var s = "-";
    this.date = new Date();
    if(date.getMonth()<10){
        s += "0";
    }
    var x =date.getMonth()+1;
    
    
    $('#dp1').attr('value',  date.getDate()+ s + x +"-"+date.getFullYear());
            $('#dp1').datepicker({
				format: 'dd-mm-yyyy',
                todayBtn: 'linked',
                
			});
    $('#dp1').datepicker().on('changeDate', function(ev){
            date = ev.date;
            document.getElementById("testDiv").innerHTML = "";
            makeHttpRequest();

    });

        makeHttpRequest();
    
   
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
                if (getCurrentVegie(temp)==true){
                fruits.push(temp);
                string = string + " " + temp.name;
                }
                
                
            }
            
            proceedFruits(fruits);
        }
    };
    xmlhttp.send(null);
}

function proceedFruits(e) {
    for(var i = 0; i < e.length; i++) {
        
        var newDiv = document.createElement("div");
        this.img = document.createElement("img");
        this.beschreibung = "";
        this.text = document.createElement("h1");
        
        
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
            text = document.createTextNode("Karotte");
        }
        
        if(e[i].name=="Karotte") {
            img.src="img/vegies/carrot.png"; 
            img.id="Karotte";
        }
        if(e[i].name=="Tomate") {
            img.src="img/vegies/tomato.png"; 
            img.id="Tomate";
        }
        if(e[i].name=="Chicoree") {
            img.src="img/vegies/chicoree.png"; 
            img.id="Chicoree";
        }
        
        if(e[i].name=="Champignon") {
            text = document.createTextNode("Champignon");
            img.src="img/vegies/champignon.png"; 
            img.id="Champignon";
        }
        
        if(e[i].name=="Kartoffel") {
            img.src="img/vegies/potato.png"; 
            img.id="Kartoffel";
        }
        
        if(e[i].name=="Zucchini") {
            img.src="img/vegies/zucchini.png"; 
            img.id="Zucchini";
        }
        
        if(e[i].name=="Zwiebel") {
             img.src="img/vegies/onion.png"; 
            img.id="Zwiebel";
        }
        
        img.onclick=function(){
              writeDescription();       
        }; 
        
        newDiv.id="newDiv";
        //newDiv.appendChild(text);
        newDiv.appendChild(img);
        
        
        
        document.getElementById("testDiv").appendChild(newDiv); 
    }
}

function writeDescription() {
    eventSrcID=(event.srcElement)?event.srcElement.id:'undefined';
    eventtype=event.type;    
    
    for(var i = 0; i < fruits.length; i++) {
        if(fruits[i].name == eventSrcID) {
            var pic = document.createElement("img");
            pic.src=document.getElementById(eventSrcID).src;
            
            document.getElementById("gemuese").innerHTML = "";
            document.getElementById("firstDiv").innerHTML = "";
            document.getElementById("secondDiv").innerHTML = "";
            
            document.getElementById("gemuese").appendChild(document.createTextNode(fruits[i].name));
            document.getElementById("firstDiv").appendChild(pic);
            document.getElementById("secondDiv").innerHTML = fruits[i].description;  

    }
 }
}
function getCurrentVegie(fruit) {
            
            
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