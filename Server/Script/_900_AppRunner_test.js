(function() {
  var BASE_URL, PORT, assert, fs, http, httpGet, request, server;

  server = require("../../app.js");

  http = require("http");

  fs = require("fs");

  assert = require("assert");

  request = require("request");

  PORT = 3001;

  BASE_URL = "http://localhost:" + PORT;

  exports.tearDown = function(done) {
    return done();
  };

  exports.test_servesHomePageFromFile = function(test) {
    var expectedData;
    expectedData = "Game";
    return httpGet(BASE_URL, function(response, responseData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(true, responseData.indexOf(expectedData) >= 0, "response text");
      return test.done();
    });
  };

  httpGet = function(url, callback) {
    return server.start(PORT, function() {
      return request.get(BASE_URL, function(err, res, body) {
        return server.stop(function() {
          if (!err) {
            return callback(res, body);
          }
        });
      });
    });
  };

}).call(this);
