/*********************************************************************
* Class: Backend
********************************************************************/

function Backend(settings) {
  var proto = location.protocol.match("https") ? "wss" : "ws";
  var ws = new WebSocket(proto + "://" + location.host + "/api/client"),
  self = this;
  
  window.ws = ws;
      
  ws.onmessage = onMessage;
  ws.onopen = onOpen;
  ws.onclose = onClose;
  
  this.report = function(packet) {
    send({
      type: "report",
      payload: packet
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
      payload: settings
    })
  }
  
  function onMessage(msg) {
    msg = JSON.parse(msg.data);
    console.log("ws onmessage", msg.type);
    
    if (msg.type == "packet") {
      self.trigger("packet", msg.payload);
      
    } else if (msg.type == "error" || msg.type == "feedback") {
      self.trigger(msg.type, msg.payload.message);
      
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
    msg.token = localStorage.getItem("token");
    ws.send(JSON.stringify(msg))
  }
}

MicroEvent.mixin(Backend);