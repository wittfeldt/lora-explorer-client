/*********************************************************************
* Class: Backend
********************************************************************/

function Backend(credentials) {
  var ws = new WebSocket("ws://" + location.host + "/api/client"),
  closedByUser = false,
  self = this;
  
  window.ws = ws;
      
  ws.onmessage = onMessage;
  ws.onopen = onOpen;
  ws.onclose = onClose;
  
  this.report = function(packet) {
    send({
      type: "report",
      data: packet
    })
  };
  
  this.close = function() {
    send({
      type: "unsubscribe"
    })
    ws.onclose = null;
    ws.close();
  };
  
  // Unsubscribe if user navigates away from page or closes window
  [ "unload", "pagehide", "fullscreenchange" ].forEach(function(eventType) {
    window.addEventListener(eventType, self.close.bind(self))
  });
  
  function onOpen() {
    console.log("ws onopen");
    send({
      type: "subscribe",
      data: credentials
    })
  }
  
  function onMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log("ws onmessage", msg.type);
    
    if (msg.type == "packet") {
      self.trigger("packet", msg.data);
      
    } else if (msg.type == "error" || msg.type == "feedback") {
      self.trigger(msg.type, msg.data.message);
      
    } else {
      console.error("Weird message from websocket", msg);
    }
  }
  
  function onClose() {
    self.trigger("error",
      "Lost connection to server, please restart your session")
  }
  
  function send(msg) {
    if (ws.readyState !== ws.OPEN) return;
    console.log("ws send", msg.type);
    ws.send(JSON.stringify(msg))
  }
}

MicroEvent.mixin(Backend);