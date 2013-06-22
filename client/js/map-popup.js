function popUp(b,e,d) {
    var a = "top=20,left=200,scrollbars=yes,resizable=no,status=no,toolbar=no,menubar=no,location=no";
    
    if(d == "pro" || d == "int") {
        var c= ",width=800, height=600"
    } else {
        if(d == "sef") {
            var c = ",width=800,height=700,scrollbars=no"
        } else {
            if( d == "APSP") {
                var c = ",width=850,height=700,scrollbars=no"                
                } else {
                    if(d == "poi") {
                        var c = ",width=800,height=480"
                    } else {
                        if(d == "pri") {
                            var c = ",width=850,height=600"
                        } else {
                            if(d == "vtk") {
                                var c = ",width=650,height=500"
                            } else {
                                if(d == "cms") {
                                    var c = ",width=1109";
                                    var a = "top=20,left=200,scrollbars=yes,resizable=yes,status=no,toolbar=no,menubar=no,location=no" 
                                } else {
                                    if(d == "pro2") {
                                        var c = ",width=550,height=150"
                                    } else {
                                        if(d == "ris") {
                                            var c = ",width=900,height=600"
                                        } else {
                                            if(d == "stInfo") { 
                                                var c = ",width=800,height=650"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
        }
    }    
    newwin = window.open(b, e, a + "" + c);
    newwin.focus(self)
}