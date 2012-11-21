(function() {
  var GameEngine, MoveCodes, PRS;

  window.prs = {};

  window.prs.constants = {};

  window.prs.constants.BaseURL = "http://localhost:3001";

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

  window.prs.PRS = PRS;

  GameEngine = (function() {

    function GameEngine() {}

    GameEngine.prototype.move = function(gameID, moveCode, moveSuccess, moveError) {
      console.log("posting move");
      return $.ajax({
        url: window.prs.constants.BaseURL + "/api_v1/move",
        cache: false,
        type: 'POST',
        data: {
          gameID: gameID,
          moveCode: moveCode
        },
        dataType: 'json',
        success: function(data) {
          if (moveSuccess != null) {
            return moveSuccess(data);
          }
        },
        error: function(err, desc) {
          if (moveError != null) {
            return moveError(err, desc);
          }
        }
      });
    };

    return GameEngine;

  })();

  window.prs.GameEngine = GameEngine;

  MoveCodes = {
    paper: "p",
    rock: "r",
    scisors: "s"
  };

  window.prs.MoveCodes = MoveCodes;

  setTimeout(function() {
    return $(function() {
      var appVM;
      appVM = new PRS();
      appVM.init();
      return window.appVM = appVM;
    });
  }, 100);

}).call(this);
