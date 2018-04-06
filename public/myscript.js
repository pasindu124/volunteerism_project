
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

function addevent() {
    var ajaxRequest;
    ajaxRequest=checkBrowser();
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            var ajaxDisplay = document.getElementById('cevents');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }
    var caption = document.getElementById('caption').value;
    var date = document.getElementById('date').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var zip = document.getElementById('zip').value;
    var district = document.getElementById('district').value;
    var category = document.getElementById('category').value;
    var description = document.getElementById("news_description").value;
    var latitude = document.getElementById('maps_latitude').value;
    var longitude = document.getElementById('maps_longitude').value;



    var queryString = "?caption="+caption+"&date="+date+"&address="+address+"&city="+city+"&zip="+zip+"&district="+district+"&category="+category+"&description="+description+"&latitude="+latitude+"&longitude="+longitude;
    ajaxRequest.open("POST", "/addEvent"+queryString , true);
    ajaxRequest.send(null);
}

