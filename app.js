(function() {
  var PRSServer, app, express, http, prsServer, sendIndex, server, _contentDirectory;

  PRSServer = (function() {

    function PRSServer() {
      var x;
      x = 1;
    }

    PRSServer.prototype.move = function(req, res) {
      return res.json({
        result: true
      });
    };

    return PRSServer;

  })();

  exports.PRSServer = PRSServer;

  http = require('http');

  express = require('express');

  prsServer = new PRSServer();

  app = express();

  server = http.createServer(app);

  _contentDirectory = "Server/Content";

  exports.start = function(port, callback) {
    app.get('/', sendIndex);
    app.get('/index.html', sendIndex);
    app.post('/move', prsServer.move);
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
