/*********************************************************************
 * Class: RunLog
 ********************************************************************/
function RunLog(el) {
  var $el = $(el);
  
  this.append = function(msr) {
    var $tr = $("<tr>" + 
        "<td>" + formatTime(msr.timestamp)   + "</td>" +
        "<td>" + msr.metadata.length         + "</td>" +
        "<td>" + msr.accuracy                + "</td>" + 
        "<td>" + msr.lsnr                    + "</td>" +
        "<td>" + msr.frequency               + "</td>" + 
        "<td>" + msr.datarate.split("BW")[0] + "</td>" +
        "<td>" + msr.rssi                    + "</td>" +
        "</tr>");
    $el.append($tr);
  }
  
  this.clear = function() {
    $el.empty();
  }
  
  function formatTime(date) {
    return date.toISOString().split("T")[1].replace(/\..*$/, "");
  }
}