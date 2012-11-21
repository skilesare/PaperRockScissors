
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

exports.test_addPutsAPlayerObjectInthesystem = (test) ->
	server.PlayerManager thisPM = new server.PlayerManager()
	player = new server.Player()
	player.email = "test1@test.com"
	thisPM.add	player, (result)->	
		console.log JSON.stringify(result)
		test.equals(0, result.error.errorID, "unexpected error")
		test.equals(true, result.player?, "player didn't exist")
		test.equals(true, result.player.userID.length > 0, "userID was empty")	
		test.done()
	, (result) ->
		test.ok(false, "Player was not added")
		test.done()

exports.test_getReturnsPlayerObject = (test) ->
	server.PlayerManager thisPM = new server.PlayerManager()
	player = new server.Player()
	player.email = "test2@test.com"
	thisPM.add	player, (result)->

		presult = thisPM.get result.player.userID, (presult) ->
			test.equals(presult.player.email, player.email)
			test.done()
		, (presult) ->
			test.ok(false, "get failed")
			test.done()
	, (result) ->
		test.ok(false, "add failed")
		test.done()

exports.test_badUserIDReturnsError = (test) ->
	server.PlayerManager thisPM = new server.PlayerManager()	

	presult = thisPM.get server.GUID(), (presult) ->
		test.ok(false,"we found something that doesn't exist")
		test.done()
	, (presult) ->
		test.equals(presult.error.errorID, 301)	
		test.done()

exports.test_duplicateEmailReturnsErrorForAdd = (test) ->
	server.PlayerManager thisPM = new server.PlayerManager()
	player = new server.Player()
	player.email = "test3@test.com"
	thisPM.add	player, (result)->	
		thisPM.add player, (presult)->
			test.ok(false,"shouldn't have been able to double add")
			test.done()
		, (presult) ->
			console.log JSON.stringify(presult)
			test.equals(presult.error.errorID, 300)
			test.done()
	, (result) ->
		test.ok(false,"couldn't add user")
		test.done()

