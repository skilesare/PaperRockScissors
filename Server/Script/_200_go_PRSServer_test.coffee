
server = require("../../app.js")
http = require("http")
fs = require("fs")
assert = require("assert")
request = require("request")

#var TEST_HOME_PAGE = "generated/test/testHome.html"
#var TEST_404_PAGE = "generated/test/test404.html"
PORT = 3001
BASE_URL = "http://localhost:" + PORT + "/move"

exports.tearDown = (done) ->
	done()

exports.test_servesMove = (test) ->
	expectedData = true
	
	httpPost BASE_URL, (response, responseData) ->
		responseJSON = JSON.parse(responseData)
		test.equals(200, response.statusCode, "status code")
		test.equals(true, responseJSON.result, "response text")
		test.done()

httpPost = (url, callback) ->
	
	server.start PORT, () ->
		
		request.post BASE_URL, (err, res, body) ->
			if !err
        		callback(res,body)