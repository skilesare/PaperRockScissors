(function() {
  var BASE_URL, PORT, app, assert, express, fs, http, httpGet, sendIndex, server, _contentDirectory;

  http = require('http');

  express = require('express');

  app = express();

  server = http.createServer(app);

  _contentDirectory = "Server/Content";

  exports.start = function(port, callback) {
    app.get('/', sendIndex);
    app.get('/index.html', sendIndex);
    app.use('/styles', express["static"](_contentDirectory + '/styles'));
    app.use('/scripts', express["static"](_contentDirectory + '/scripts'));
    app.use('/img', express["static"](_contentDirectory + '/img'));
    console.log(port);
    app.listen(port);
    return console.log('Listening on port ' + port);
  };

  exports.stop = function() {
    return server.close();
  };

  sendIndex = function(req, res) {
    return res.sendfile(_contentDirectory + "/index.html");
  };

  server = require("./app.js");

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
    console.log('looking fo rgame');
    return httpGet(BASE_URL, function(response, responseData) {
      test.equals(200, response.statusCode, "status code");
      test.equals(expectedData, responseData, "response text");
      return test.done();
    });
  };

  httpGet = function(url, callback) {
    console.log('port:' + PORT);
    return server.start(PORT, function() {
      var request;
      request = http.get(url);
      return request.on("response", function(response) {
        var receivedData;
        receivedData = "";
        response.setEncoding("utf8");
        response.on("data", chunk(function() {
          return receivedData += chunk;
        }));
        return response.on("end", function() {
          return server.stop(function() {
            return callback(response, receivedData);
          });
        });
      });
    });
  };

}).call(this);
