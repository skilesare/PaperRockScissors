(function() {
  var PRS;

  PRS = (function() {

    function PRS() {
      var $this;
      $this = this;
      this.self = this;
      this.testObject = "test";
    }

    PRS.prototype.init = function() {
      return ko.applyBindings(this);
    };

    return PRS;

  })();

  setTimeout(function() {
    return $(function() {
      var appVM;
      appVM = new PRS();
      appVM.init();
      return window.appVM = appVM;
    });
  }, 100);

}).call(this);
