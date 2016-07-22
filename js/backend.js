/*********************************************************************
 * Class: Backend
 ********************************************************************/

function Backend() {
  var ws = null;
  var self = this;
  
  this.subscribe = function(credentials, cb) {
    ws = new WebSocket("ws://" + location.host + "/api/client");
    ws.onmessage = onMessage.bind(self, cb)
    ws.onopen = function() {
      console.log("WS open")
      send({
        action: "subscribe",
        payload: credentials
      })
    }
    browserEvents(true);
  }
  
  this.report = function(packet) {
    send({
      action: "report",
      payload: packet
    })
  }
  
  this.close = function() {
    console.log("Backend.close()");
    if (ws) {
      browserEvents(false)
      send({
        action: "unsubscribe",
        payload: {}
      })
      ws.close();
    }
  }
  /*********************************************************************
   * Unsubscribe when user navigates from or closes the browser during
   * a session To do: Fix iOS full screen support
   ********************************************************************/
  
  function browserEvents(activate) {
    [ "unload", "pagehide", "fullscreenchange" ].forEach(function(eventType) {
      var func = activate ? "addEventListener" : "removeEventListener";
      window[func].call(null, eventType, self.close.bind(self))
    })
  }
  
  function onMessage(cb, msg) {
    var data = JSON.parse(msg.data);
    cb.call(null, data)
  }
  
  function send(msg) {
    ws.send(typeof msg === 'string' ? 
      msg : JSON.stringify(msg));
  }
}