/*********************************************************************
 * Class: RunLog
 ********************************************************************/
function RunLog(el) {
  var $el = $(el);
  
  this.append = function(p) {
    var topGw = p.gateways[0]; // they are sorted after RSSI
    
    var distance = topGw.distance;
    var $tr = $("<tr>" + 
        "<td>" + formatTime(topGw.time)          + "</td>" +
        "<td>" + p.gateways.length               + "</td>" +
        "<td>" + formatDistance(topGw.distance)  + "</td>" + 
        "<td>" + topGw.lsnr                      + "</td>" +
        "<td>" + p.frequency                     + "</td>" + 
        "<td>" + p.datarate.split("BW")[0]       + "</td>" +
        "<td>" + topGw.rssi                      + "</td>" +
        "</tr>");
    $el.append($tr);
  }
  
  this.clear = function() {
    $el.empty();
  }
  
  function formatTime(date) {
    return new Date(date).toISOString()
      .split("T")[1].replace(/\..*$/, "");
  }
  
  function formatDistance(m) {
    if (m) {
      if (m > 1000) {
        return Math.round(m/10)/100 + "km";
      } else {
        return Math.round(m) + "m";
      }
    }
    return "";
  }
}