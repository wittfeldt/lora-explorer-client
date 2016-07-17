/*********************************************************************
 * Class: PacketTimer
 ********************************************************************/

function PacketTimer(el) {
  var counter = 0;
  var thread = null;
  $(el).html("Waiting for packet...");
  
  function updateDom(i) {
    var html = "Last packet was received " + i + " seconds ago";
    $(el).html(html);
  }
  this.start = function() {
    thread = setInterval(function() {
      counter+=1;
      updateDom(counter);
    }, 1000);
  }
  this.stop = function() {
    counter = 0;
    updateDom(counter);
    if (thread) clearInterval(thread);
  }
  this.restart = function() {
    this.stop();
    this.start();
  }
}