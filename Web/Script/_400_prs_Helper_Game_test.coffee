MoveCodes = window.prs.MoveCodes
GameEngine = window.prs.GameEngine


describe "Game Engine", ->
	it "can handle a valid post to move", ->
		gameEngine = new GameEngine()
		gameID = ""
		moveExecuted = false

		runs ->
			debugger
			console.log "calling move"
			gameEngine.move gameID, MoveCodes.paper, (data) ->

				console.log JSON.stringify data
				moveExecuted = true
			, (err, des) ->
				console.log "move function failed" + JSON.stringify(err)

		waitsFor ->
			return moveExecuted
		, "The move should complete", 1000

		runs ->
			expect(moveExecuted).toBe(true)