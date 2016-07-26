/*********************************************************************
 * Class: FormStore
 ********************************************************************/

function Settings(form, key) {
  var $form = $(form);
  this.load = function() {
    var data = {};
    try { 
      data = JSON.parse(localStorage.getItem(key) || "{}");
    } catch(err) {
      // no localstorage support, or incognito window
    }
    Object.keys(data).forEach(function(k) {
      $form.find("[name=" + k + "]").val(data[k]);
    })
  }
  this.read = function() {
    var data = $form.serializeArray().reduce(function(memo, kv) {
      memo[kv.name] = (kv.value.length > 0) ? kv.value : null;
      return memo;
    }, {});
    return data;
  }
  this.get = function(k) {
    return this.read()[k];
  }
  this.save = function() {
    try {
      localStorage.setItem(key, JSON.stringify(this.read()));
    } catch(err) {
      // no localstorage support, or incognito window
    }
  }
  this.validate = function() {
    var err = $form.serializeArray().find(function(kv) {
      return !kv.value 
    });
    return err ? err.name + " is required" : null;
  }
}