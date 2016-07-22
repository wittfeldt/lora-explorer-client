/*********************************************************************
 * Function: navigate
 ********************************************************************/

function navigate(el) {
  var $from = $("body div.active");
  var $to = $(el);
  $from.trigger("willhide").removeClass("active").trigger("didhide");
  $to.trigger("willshow").addClass("active").trigger("didshow");
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
    function(err) { alert(err) },
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

function annotatePacket(packet, pos, settings) {
  var mapper = {
    location: pos.latitude + "," + pos.longitude,
    altitude: pos.altitude,
    accuracy: pos.accuracy
  }
  packet.mapper = mapper;
  return packet;
}