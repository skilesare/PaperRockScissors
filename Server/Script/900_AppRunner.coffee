http = require('http')
express = require('express')
prsServer = new PRSServer()
app = express()
server = http.createServer(app)


_contentDirectory = "Server/Content"


exports.start = (port, callback) -> 
	app.use('/styles', express.static(_contentDirectory + '/st
		yles'))
	app.use('/scripts', express.static(_contentDirectory + '/scripts'))
	app.use('/img', express.static(_contentDirectory + '/img'))
	app.use allowCrossDomain
	

	app.get '/', sendIndex
	app.get '/index.html', sendIndex
	app.post '/api_v1/move', prsServer.move
	

	
	server.listen port
	callback()

exports.stop = (callback) ->

	server.close()
	callback()

sendIndex = (req, res, next) ->
	res.sendfile(_contentDirectory + "/index.html")


allowCrossDomain = (req, res, next)  ->
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
	#intercept OPTIONS method
	if ('OPTIONS' == req.method) 
		res.send(200)
	else 
		next()