(function() {
  var GameEngine, PRS;

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

  GameEngine = (function() {

    function GameEngine() {}

    GameEngine.prototype.move = function(gameID, moveCode) {
      return $.ajax({
        url: window.constants.BaseURL + "/api_v1/move",
        cache: false,
        type: 'post',
        data: {
          gameID: gameID,
          moveCode: moveCode
        },
        dataType: 'json',
        success: function(data) {}
      });
    };

    return GameEngine;

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
