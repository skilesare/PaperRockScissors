(function() {
  var BASE_URL, PORT, assert, fs, http, httpPost, request, server;

  server = require("../../app.js");

  http = require("http");

  fs = require("fs");

  assert = require("assert");

  request = require("request");

  PORT = 3001;

  BASE_URL = "http://localhost:" + PORT + "/api_v1/move";

  exports.tearDown = function(done) {
    return done();
  };

  exports.test_servesMove = function(test) {
    var expectedData;
    expectedData = true;
    return httpPost({
      url: BASE_URL
    }, function(response, responseData) {
      var responseJSON;
      responseJSON = JSON.parse(responseData);
      test.equals(200, response.statusCode, "status code");
      test.equals(true, responseJSON.result, "response text");
      return test.done();
    });
  };

  exports.test_serverCompletesTurn = function(test) {
    return httpPost({
      url: BASE_URL,
      data: {
        gameID: "game1",
        move: "P"
      }
    }, function(response, responseData) {
      var responseJSON;
      responseJSON = JSON.parse(responseData);
      if (responseJSON.gameState != null) {
        test.equals(true, responseJSON.gameState.bComplete);
      } else {
        test.ok(false, "gamestate not present");
      }
      return test.done();
    });
  };

  exports.test_moveReturnsProperMove = function(test) {
    var pm, thisPlayer;
    pm = new server.PlayerManager();
    thisPlayer = new server.Player();
    thisPlayer.email = "test1@test.com";
    return pm.add(thisPlayer, function(result) {
      if (result.player != null) {
        thisPlayer = result.player;
      } else {
        test.ok(false, "Could not create player");
      }
      return httpPost({
        url: BASE_URL,
        data: {
          gameID: "game1",
          move: "P"
        }
      }, function(response, responseData) {
        var responseJSON;
        responseJSON = JSON.parse(responseData);
        if (responseJSON.gameState != null) {

        } else {
          test.ok(false, "gamestate not present");
        }
        return test.done();
      });
    });
  };

  httpPost = function(options, callback) {
    return server.start(PORT, function() {
      return request.post(options, function(err, res, body) {
        return server.stop(function() {
          if (!err) {
            return callback(res, body);
          } else {
            return callback(res, {});
          }
        });
      });
    });
  };

}).call(this);
