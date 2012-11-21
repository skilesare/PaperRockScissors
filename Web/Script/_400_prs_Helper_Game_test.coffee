MoveCodes = window.prs.MoveCodes
GameEngine = window.prs.GameEngine


describe "Game Engine", ->
	it "can handle a valid post to move", ->
		gameEngine = new GameEngine()
		gameID = ""
		moveExecuted = false

		runs ->
			gameEngine.move gameID, MoveCodes.paper, (data) ->
				moveExecuted = true
			, (err, des) ->
				x=1

		waitsFor ->
			return moveExecuted
		, "The move should complete", 1000

		runs ->
			expect(moveExecuted).toBe(true)