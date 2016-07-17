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
  return packet;
}

/*

this.provider = "ttn-explorer-client";

// Use LoRa stats of the gateway with the strongest signal
var topGw = loraData.metadata.sort(function(a,b) { a.rssi < b.rssi })[0];
this.timestamp = new Date(topGw.server_time);

[ "rssi", "lsnr", "frequency", "datarate" ].forEach(function(k) {
  this[k] = topGw[k];
}.bind(this));

this.location = pos.latitude + "," + pos.longitude;
this.accuracy = pos.accuracy;
this.dev_eui = settings.devEui;
this.app_eui = settings.appEui;

// Can perhaps be useful in the future
this.metadata = loraData.metadata;

this.validForReport = function() {
  return settings.shareResults == "1" && 
    (this.accuracy <= accuracyTreshold);
}

*/