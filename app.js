(function() {
  var app, express, sendIndex, _contentDirectory;

  express = require('express');

  app = express();

  _contentDirectory = "Content";

  sendIndex = function(req, res) {
    return res.sendfile(_contentDirectory + "/index.html");
  };

  app.get('/', sendIndex);

  app.get('/index.html', sendIndex);

  app.listen(3001);

  console.log('Listening on port 3001');

}).call(this);
