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
      console.log("getLocation", err);
      done({
        latitude: 60,
        longitude: 14,
        accuracy: 5,
        altitude: 100
      })
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
  packet.mapper = {
    location: pos.latitude + "," + pos.longitude,
    altitude: pos.altitude,
    accuracy: pos.accuracy,
    user_token: localStorage.getItem("token")
  }
  // Calculate distance to all gateways
  var mapperArgs = packet.mapper.location.split(",");
  packet.gateways.forEach(function(gw) {
    if (gw.location) {
      try {
        var args = mapperArgs.concat(gw.location.split(",")).map(parseFloat);
        gw.distance = distance.apply(null, args) * 1000;
      } catch(err) {
      }
    }
  })
  return packet;
}

function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
  c(lat1 * p) * c(lat2 * p) * 
  (1 - c((lon2 - lon1) * p))/2;
    
  return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
}

