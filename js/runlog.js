/*********************************************************************
 * Class: RunLog
 ********************************************************************/
function RunLog(el) {
  var $el = $(el);
  
  this.append = function(p) {
    var $tr = $("<tr>" + 
        "<td>" + formatTime(p.time)        + "</td>" +
        "<td>" + p.num_gws                 + "</td>" +
        "<td>" + p.mapper.accuracy         + "</td>" + 
        "<td>" + p.top_gw.lsnr             + "</td>" +
        "<td>" + p.frequency               + "</td>" + 
        "<td>" + p.datarate.split("BW")[0] + "</td>" +
        "<td>" + p.top_gw.rssi             + "</td>" +
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
}