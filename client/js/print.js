function $(id) {
    return document.getElementById(id);
}

window.onload = function() {
   
   var name = localStorage.getItem('recipename');
   document.getElementById("nameRec").innerHTML= name;
   var recipe = localStorage.getItem('recipe');
   document.getElementById("printDiv").innerHTML= recipe;
   window.print();
    
    
}