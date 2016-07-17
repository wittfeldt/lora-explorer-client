/*********************************************************************
 * Class: FormStore
 ********************************************************************/

function Settings(el) {
  var key = "settings";
  var $el = $(el);
  var self = this;
  this.load = function() {
    var data = JSON.parse(localStorage.getItem(key) || "{}");
    Object.keys(data).forEach(function(k) {
      $el.find("[name=" + k + "]").val(data[k]);
    })
  }
  this.read = function() {
    var data = $el.serializeArray().reduce(function(memo, kv) {
      memo[kv.name] = (kv.value.length > 0) ? kv.value : null;
      return memo;
    }, {});
    return data;
  }
  this.get = function(k) {
    return this.read()[k];
  }
  this.save = function() {
    localStorage.setItem(key, JSON.stringify(this.read()));
  }
  this.validate = function() {
    var err = $el.serializeArray().find(function(kv) { 
      return !kv.value 
    });
    return err ? err.name + " is required" : null;
  }
}
