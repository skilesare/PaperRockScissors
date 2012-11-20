(function() {
  var BASE_URL, PORT, assert, fs, http, httpGet, server;

  server = require("../../app.js");

  http = require("http");

  fs = require("fs");

  assert = require("assert");

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
      var request;
      request = http.get(url);
      return request.on("response", function(response) {
        var receivedData;
        receivedData = "";
        response.setEncoding("utf8");
        response.on("data", function(chunk) {
          return receivedData += chunk;
        });
        return response.on("end", function() {
          return server.stop(function() {
            return callback(response, receivedData);
          });
        });
      });
    });
  };

}).call(this);
