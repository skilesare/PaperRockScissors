(function() {
  var BASE_URL, PORT, assert, fs, http, httpPost, request, server;

  server = require("../../app.js");

  http = require("http");

  fs = require("fs");

  assert = require("assert");

  request = require("request");

  PORT = 3001;

  BASE_URL = "http://localhost:" + PORT + "/move";

  exports.tearDown = function(done) {
    return done();
  };

  exports.test_servesMove = function(test) {
    var expectedData;
    expectedData = true;
    return httpPost(BASE_URL, function(response, responseData) {
      var responseJSON;
      responseJSON = JSON.parse(responseData);
      test.equals(200, response.statusCode, "status code");
      test.equals(true, responseJSON.result, "response text");
      return test.done();
    });
  };

  httpPost = function(url, callback) {
    return server.start(PORT, function() {
      return request.post(BASE_URL, function(err, res, body) {
        if (!err) {
          return callback(res, body);
        }
      });
    });
  };

}).call(this);
