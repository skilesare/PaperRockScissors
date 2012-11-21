
server = require("../../app.js")
http = require("http")
fs = require("fs")
assert = require("assert")
request = require("request")

#var TEST_HOME_PAGE = "generated/test/testHome.html"
#var TEST_404_PAGE = "generated/test/test404.html"
PORT = 3001
BASE_URL = "http://localhost:" + PORT + "/api_v1/move"



exports.tearDown = (done) ->
	done()

exports.test_servesMove = (test) ->
	expectedData = true
	
	httpPost 
		url: BASE_URL
	, (response, responseData) ->
		responseJSON = JSON.parse(responseData)
		test.equals(200, response.statusCode, "status code")
		test.equals(true, responseJSON.result, "response text")
		test.done()

exports.test_serverCompletesTurn = (test) ->

	httpPost 
		url: BASE_URL
		data:
			gameID : "game1"
			move: "P"
	, (response, responseData) ->
		responseJSON = JSON.parse(responseData)
		if responseJSON.gameState?
			test.equals(true,responseJSON.gameState.bComplete)
		else
			test.ok(false,"gamestate not present")

		test.done()

exports.test_moveReturnsProperMove = (test) ->

	pm = new server.PlayerManager()


	thisPlayer = new server.Player()
	thisPlayer.email = "test1@test.com"
	pm.add thisPlayer, (result) ->
		if result.player?
			thisPlayer = result.player
		else
			test.ok(false,"Could not create player")


		httpPost 
			url: BASE_URL
			data:
				gameID : "game1"
				move: "P"
		, (response, responseData) ->
			responseJSON = JSON.parse(responseData)
			if responseJSON.gameState?
				#test.equals("p",responseJSON.gameState.players[TestPlayer1.playerID].move)
			else
				test.ok(false,"gamestate not present")

			test.done()





httpPost = (options, callback) ->
	
	server.start PORT, () ->
		
		request.post options, (err, res, body) ->
			server.stop ->
				if !err        		
					callback(res, body)
				else
					callback(res, {})
			
