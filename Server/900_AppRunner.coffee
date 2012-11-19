express = require('express')
app = express()

app.get '/alive.html', (req, res) ->
		body = "I'm Alive!"
		res.setHeader 'Content-Type', 'text/plain'
		res.setHeader 'Content-Length', body.length
		res.end body

app.listen 3000
console.log 'Listening on port 3000'