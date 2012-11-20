http = require('http')
express = require('express')
app = express()
server = http.createServer(app)


_contentDirectory = "Server/Content"





exports.start = (port, callback) -> 

	app.get '/', sendIndex
	app.get '/index.html', sendIndex
	app.use('/styles', express.static(_contentDirectory + '/styles'))
	app.use('/scripts', express.static(_contentDirectory + '/scripts'))
	app.use('/img', express.static(_contentDirectory + '/img'))

	
	server.listen port
	callback()

exports.stop = (callback) ->

	server.close()
	callback()

sendIndex = (req, res) ->
	res.sendfile(_contentDirectory + "/index.html")