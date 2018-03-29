
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

function initMap() {
    //var loce=loc;
    //console.log(<%=evtlocations%>);


    var locations = [
        ['Jaffna', 9.661498, 80.025547, 1]
    ];
    for(var i=0;i<5;i++){
        //locations.push(['Matara', 5.954920, 80.554956, 5]);
    }
    locations.push(['Matara', 5.954920, 80.554956, 4]);

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7.7,
        center: new google.maps.LatLng(7.290572, 80.633726),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            icon:'/map/blue_MarkerA.png',
            map: map
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infowindow.setContent(locations[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }
}