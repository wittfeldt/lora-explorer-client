/*********************************************************************
 * Class: PacketTimer
 ********************************************************************/

function PacketTimer(el) {
  var counter = 0,
  thread = null,
  feedback = null;
    
  $(el).html("Waiting for packet...");
  
  function updateDom(i) {
    var html = "Last packet was received " + i + " seconds ago. ";
    if (feedback) {
      html+="<br/><i>" + feedback + "</i>";
    }
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
    $(el).html("Waiting for packet...");
    if (thread) clearInterval(thread);
  }
  this.restart = function() {
    this.stop();
    this.start();
  }
  this.setFeedback = function(msg) {
    feedback = msg;
  }
}