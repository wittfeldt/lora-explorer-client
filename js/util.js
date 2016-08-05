/*********************************************************************
 * Function: navigate
 ********************************************************************/

var pageStack = [];
function navigate(el) {
  console.log("navigate", el);
  var $from = $("body div.active");
  var $to = $(el);
  $from.trigger("willhide").removeClass("active").trigger("didhide");
  $to.trigger("willshow").addClass("active").trigger("didshow");
  pageStack.unshift(el);
  window.history.replaceState({}, "", el);
  $("#back").css("display", pageStack.length > 1 ? "block" : "none");
}

function goBack() {
  pageStack.shift();
  var page = pageStack.shift();
  if (page) navigate(page);
}

/*********************************************************************
 * Function: getLocation
 ********************************************************************/

function getLocation(done) {
  if (typeof navigator.geolocation === "undefined") {
    alert("Geolocation not supported");
    return;
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  navigator.geolocation.getCurrentPosition(
    function(pos) {
      var c = pos.coords
      done({
        latitude: c.latitude,
        longitude: c.longitude,
        accuracy: c.accuracy,
        altitude: c.altitude
      })
    },
    function(err) { 
      alert("GPS error: " + err.message);
    },
    options);
}

/*********************************************************************
 * Function: flashPage
 ********************************************************************/

function flashPage(ok) {
  var cls = "flash" + (ok ? "" : " err");
  $("body").addClass(cls);
  setTimeout(function() {
    $("body").removeClass(cls);
  },50)
}

/*********************************************************************
 * Function: annotatePacket
 ********************************************************************/

function annotatePacket(packet, pos) {
  // Calculate distance to all gateways
  packet.gateways.forEach(function(gw) {
    try {
      gw.distance = distanceMeters(
        gw.latitude, gw.longitude,
        pos.latitude, pos.longitude);
    } catch(err) {
      console.error(err);
    }
  })
  packet.mapper = pos;
  return packet;
}

function distanceMeters(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
  c(lat1 * p) * c(lat2 * p) * 
  (1 - c((lon2 - lon1) * p))/2;
    
  return 12742 * Math.asin(Math.sqrt(a)) * 1000; // 2 * R; R = 6371 km
}

