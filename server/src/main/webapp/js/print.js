function $(id) {
    return document.getElementById(id);
}

window.onload = function() {   
    var name = localStorage.getItem('print-header');
    document.getElementById("nameRec").innerHTML= name;
    
    var recipe = localStorage.getItem('print-body');
    document.getElementById("printDiv").innerHTML= recipe;
    
    window.print();
}