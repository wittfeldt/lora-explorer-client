/*********************************************************************
 * Class: Backend
 ********************************************************************/

function Backend(appEui, accessKeys) {
  var ws = null;
  var self = this;
  
  this.subscribe = function(devEui, cb) {
    ws = new WebSocket("ws://" + location.host + "/api/ttn-explorer");
    ws.onmessage = onMessage.bind(self, cb)
    ws.onopen = function() {
      send({
        action: "subscribe",
        appEui: appEui,
        accessKeys: accessKeys,
        devEui: devEui
      })
    }
    browserEvents(true);
  }
  
  this.report = function(msr) {
    msr.action = "report";
    send(msr);
  }
  
  this.close = function() {
    console.log("Backend.close()");
    if (ws) {
      browserEvents(false)
      send({ action: "unsubscribe" })
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
  
  function onMessage(cb, ev) {
    var data = JSON.parse(ev.data);
    cb.call(null, data)
  }
  
  function send(msg) {
    console.log("Backend.send", msg)
    ws.send(typeof msg === 'string' ? msg : JSON.stringify(msg));
  }
}