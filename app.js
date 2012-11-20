(function() {
  var app, express, http, sendIndex, server, _contentDirectory;

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
    server.listen(port);
    return callback();
  };

  exports.stop = function(callback) {
    server.close();
    return callback();
  };

  sendIndex = function(req, res) {
    return res.sendfile(_contentDirectory + "/index.html");
  };

}).call(this);
