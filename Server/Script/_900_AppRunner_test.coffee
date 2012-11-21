
server = require("../../app.js")
http = require("http")
fs = require("fs")
assert = require("assert")
request = require("request")

#var TEST_HOME_PAGE = "generated/test/testHome.html"
#var TEST_404_PAGE = "generated/test/test404.html"
PORT = 3001
BASE_URL = "http://localhost:" + PORT

exports.tearDown = (done) ->
	done()

exports.test_servesHomePageFromFile = (test) ->
	expectedData = "Game"
	
	httpGet BASE_URL, (response, responseData) ->
		test.equals(200, response.statusCode, "status code")
		test.equals(true, responseData.indexOf(expectedData)>=0, "response text")
		test.done()

httpGet = (url, callback) ->
	
	server.start PORT, () ->
		
		request.get BASE_URL, (err, res, body) ->
			server.stop ->
				if !err        		
					callback(res, body)