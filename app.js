(function() {
  var EngraveManager, Error, ErrorHelper, GUID, PRSServer, Player, PlayerManager, PlayerResponse, allowCrossDomain, app, express, http, prsServer, sendIndex, server, _contentDirectory;

  GUID = function() {
    var S4;
    S4 = function() {
      var result;
      result = Math.floor(Math.random() * 0x10000).toString(16);
      return result;
    };
    return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
  };

  exports.GUID = GUID;

  Error = (function() {

    function Error(_errorid, _error) {
      this.errorID = 0;
      this.error = "";
      if (_errorid != null) {
        this.errorID = _errorid;
      }
      if (_error != null) {
        this.error = _error;
      }
    }

    return Error;

  })();

  exports.Player = Error;

  ErrorHelper = {
    EmailExistsError: new Error(300, "Email Exists"),
    UserNotFoundError: new Error(301, "Can't find user with that userID")
  };

  exports.ErrorHelper = ErrorHelper;

  PlayerResponse = (function() {

    function PlayerResponse() {
      this.result = false;
      this.error = new Error();
      this.player = new Player();
    }

    return PlayerResponse;

  })();

  exports.PlayerResponse = PlayerResponse;

  Player = (function() {

    function Player() {
      this.userID = null;
      this.email = "";
    }

    return Player;

  })();

  exports.Player = Player;

  PRSServer = (function() {

    function PRSServer() {
      var x;
      x = 1;
    }

    PRSServer.prototype.move = function(req, res, next) {
      var result;
      result = {};
      result.result = true;
      result.gameState = {
        bComplete: true
      };
      return res.json(result);
    };

    return PRSServer;

  })();

  exports.PRSServer = PRSServer;

  EngraveManager = (function() {

    function EngraveManager(appToken, appSecret) {
      this.appToken = appToken;
      this.appSecret = appSecret;
      this.player = new PlayerManager();
    }

    return EngraveManager;

  })();

  exports.EngraveManager = EngraveManager;

  PlayerManager = (function() {

    function PlayerManager(thisEngraveManager) {
      this.self = this;
      this.engraveManager = thisEngraveManager;
      this.localPlayerCollection = {};
      this.localPlayerCollectionByEmail = {};
    }

    PlayerManager.prototype.get = function(userID, success, error) {
      var $this;
      $this = this;
      setTimeout(function() {
        var result;
        result = new PlayerResponse();
        if (!($this.localPlayerCollection[userID] != null)) {
          result.result = false;
          result.error = ErrorHelper.UserNotFoundError;
          if (error != null) {
            error(result);
          }
          return;
        }
        result.result = true;
        result.player = $this.localPlayerCollection[userID];
        if (success != null) {
          return success(result);
        }
      }, 1);
      return true;
    };

    PlayerManager.prototype.add = function(playerObject, success, error) {
      var $this;
      $this = this;
      setTimeout(function() {
        var result;
        result = new PlayerResponse();
        console.log($this.localPlayerCollectionByEmail[playerObject.email] + " " + playerObject.email);
        if ($this.localPlayerCollectionByEmail[playerObject.email] != null) {
          console.log('returning error');
          result.result = false;
          result.error = ErrorHelper.EmailExistsError;
          if (error != null) {
            error(result);
          }
          return;
        }
        playerObject.userID = GUID();
        $this.localPlayerCollection[playerObject.userID] = playerObject;
        $this.localPlayerCollectionByEmail[playerObject.email] = playerObject.userID;
        result.result = true;
        result.player = playerObject;
        if (success != null) {
          return success(result);
        }
      }, 1);
      return true;
    };

    return PlayerManager;

  })();

  exports.PlayerManager = PlayerManager;

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
