express = require('express')
app = express()

_contentDirectory = "Content"

sendIndex = (req, res) ->
	res.sendfile(_contentDirectory + "/index.html")

app.get '/', sendIndex
app.get '/index.html', sendIndex

app.listen 3001
console.log 'Listening on port 3001'