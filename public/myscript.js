
function checkBrowser() {
    try {
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
        return ajaxRequest;
    } catch (e) {

        // Internet Explorer Browsers
        try {
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            return ajaxRequest;
        } catch (e) {

            try {
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                return ajaxRequest;
            } catch (e) {
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
}

function ajaxFunction(id) {
    var admin_id=id;
    var ajaxRequest;  // The variable that makes Ajax possible!
    ajaxRequest=checkBrowser();

    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('adminlist');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }

    var queryString = "?id="+admin_id;
    ajaxRequest.open("GET", "/org/refreshAdminList" +queryString , true);
    ajaxRequest.send(null);

}

function addAdmin() {
    var ajaxRequest;
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('adminlist');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }

    var userid = document.getElementById('userid').value;
    var queryString = "?uid="+userid;
    ajaxRequest.open("GET", "/org/addAdmin" +queryString , true);
    ajaxRequest.send(null);
}

function Contribute(id) {
    var event_id = id;
    //console.log(event_id)
    var ajaxRequest;
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('reacts'+event_id);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }


    var queryString = "?eid="+event_id;
    ajaxRequest.open("GET", "/contribute" +queryString , true);
    ajaxRequest.send(null);
}

function contributers(id) {
    var event_id = id;
    //console.log(id);
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('conModel'+event_id);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }


    var queryString = "?eid="+event_id;
    ajaxRequest.open("GET", "/contributers" +queryString , true);
    ajaxRequest.send(null);
}

function addComment(com,eid) {
    var comment = com;
    var event_id = eid;
    //console.log(com);
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('com'+event_id);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }


    var queryString = "?comment="+comment+"&eid="+event_id;
    ajaxRequest.open("GET", "/addComment" +queryString , true);
    ajaxRequest.send(null);
}

function showComments(eid) {

    var event_id = eid;
    console.log(event_id);

    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('com'+event_id);
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }

    var queryString = "?eid="+event_id;
    console.log(queryString);
    ajaxRequest.open("GET", "/showComment" +queryString , true);
    ajaxRequest.send(null);


}

function empty() {
    var x;
    x = document.getElementById("username").value;
    y = document.getElementById("password").value;
    if (x == "" && y=="") {
        //alert("Enter Username & Password");
        document.getElementById("uinfo").innerHTML = "<span style=\"color:red;font-weight:bold\">Enter your username here!</span>";
        document.getElementById("pinfo").innerHTML = "<span style=\"color:red;font-weight:bold\">Enter your password here!</span>";
        return false;
    }else if (x == ""){
        document.getElementById("uinfo").innerHTML = "<span style=\"color:red;font-weight:bold\">Enter your username here!</span>";
        return false;
    }else if(y == ""){
        document.getElementById("pinfo").innerHTML = "<span style=\"color:red;font-weight:bold\">Enter your password here!</span>";
        return false;
    }
}

function approveEvent(eid) {
    var ajaxRequest;
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('cutcp');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }


    var queryString = "?eid="+eid;
    ajaxRequest.open("GET", "/admin/approveEvent" + queryString  , true);
    ajaxRequest.send(null);
}
function deleteEvent(eid) {
    var ajaxRequest;
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('cutcp');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }


    var queryString = "?eid="+eid;
    ajaxRequest.open("GET", "/admin/deleteEvent" + queryString  , true);
    ajaxRequest.send(null);
}