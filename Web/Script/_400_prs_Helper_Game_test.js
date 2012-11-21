(function() {
  var GameEngine, MoveCodes;

  MoveCodes = window.prs.MoveCodes;

  GameEngine = window.prs.GameEngine;

  describe("Game Engine", function() {
    return it("can handle a valid post to move", function() {
      var gameEngine, gameID, moveExecuted;
      gameEngine = new GameEngine();
      gameID = "";
      moveExecuted = false;
      runs(function() {
        return gameEngine.move(gameID, MoveCodes.paper, function(data) {
          return moveExecuted = true;
        }, function(err, des) {
          var x;
          return x = 1;
        });
      });
      waitsFor(function() {
        return moveExecuted;
      }, "The move should complete", 1000);
      return runs(function() {
        return expect(moveExecuted).toBe(true);
      });
    });
  });

}).call(this);
