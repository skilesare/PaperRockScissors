(function() {
  var BASE_URL, PORT, assert, fs, http, request, server;

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

  exports.test_addPutsAPlayerObjectInthesystem = function(test) {
    var player, thisPM;
    server.PlayerManager(thisPM = new server.PlayerManager());
    player = new server.Player();
    player.email = "test1@test.com";
    return thisPM.add(player, function(result) {
      console.log(JSON.stringify(result));
      test.equals(0, result.error.errorID, "unexpected error");
      test.equals(true, result.player != null, "player didn't exist");
      test.equals(true, result.player.userID.length > 0, "userID was empty");
      return test.done();
    }, function(result) {
      test.ok(false, "Player was not added");
      return test.done();
    });
  };

  exports.test_getReturnsPlayerObject = function(test) {
    var player, thisPM;
    server.PlayerManager(thisPM = new server.PlayerManager());
    player = new server.Player();
    player.email = "test2@test.com";
    return thisPM.add(player, function(result) {
      var presult;
      return presult = thisPM.get(result.player.userID, function(presult) {
        test.equals(presult.player.email, player.email);
        return test.done();
      }, function(presult) {
        test.ok(false, "get failed");
        return test.done();
      });
    }, function(result) {
      test.ok(false, "add failed");
      return test.done();
    });
  };

  exports.test_badUserIDReturnsError = function(test) {
    var presult, thisPM;
    server.PlayerManager(thisPM = new server.PlayerManager());
    return presult = thisPM.get(server.GUID(), function(presult) {
      test.ok(false, "we found something that doesn't exist");
      return test.done();
    }, function(presult) {
      test.equals(presult.error.errorID, 301);
      return test.done();
    });
  };

  exports.test_duplicateEmailReturnsErrorForAdd = function(test) {
    var player, thisPM;
    server.PlayerManager(thisPM = new server.PlayerManager());
    player = new server.Player();
    player.email = "test3@test.com";
    return thisPM.add(player, function(result) {
      return thisPM.add(player, function(presult) {
        test.ok(false, "shouldn't have been able to double add");
        return test.done();
      }, function(presult) {
        console.log(JSON.stringify(presult));
        test.equals(presult.error.errorID, 300);
        return test.done();
      });
    }, function(result) {
      test.ok(false, "couldn't add user");
      return test.done();
    });
  };

}).call(this);
