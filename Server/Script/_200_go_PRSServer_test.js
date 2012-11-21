(function() {
  var BASE_URL, PORT, assert, fs, http, httpGet, request, server;

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
    return httpGet(BASE_URL, function(response, responseData) {
      var responseJSON;
      responseJSON = JSON.parse(responseData);
      test.equals(200, response.statusCode, "status code");
      test.equals(true, responseJSON.result, "response text");
      return test.done();
    });
  };

  httpGet = function(url, callback) {
    return server.start(PORT, function() {
      return request.post(BASE_URL, function(err, res, body) {
        return server.stop(function() {
          if (!err) {
            return callback(res, body);
          }
        });
      });
    });
  };

}).call(this);
