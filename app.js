(function() {
  var PRSServer, allowCrossDomain, app, express, http, prsServer, sendIndex, server, _contentDirectory;

  PRSServer = (function() {

    function PRSServer() {
      var x;
      x = 1;
    }

    PRSServer.prototype.move = function(req, res, next) {
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
    app.use('/styles', express["static"](_contentDirectory + '/st\
		yles'));
    app.use('/scripts', express["static"](_contentDirectory + '/scripts'));
    app.use('/img', express["static"](_contentDirectory + '/img'));
    app.use(allowCrossDomain);
    app.get('/', sendIndex);
    app.get('/index.html', sendIndex);
    app.post('/api_v1/move', prsServer.move);
    server.listen(port);
    return callback();
  };

  exports.stop = function(callback) {
    server.close();
    return callback();
  };

  sendIndex = function(req, res, next) {
    return res.sendfile(_contentDirectory + "/index.html");
  };

  allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
      return res.send(200);
    } else {
      return next();
    }
  };

}).call(this);
