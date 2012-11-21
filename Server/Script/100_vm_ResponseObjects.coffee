class PlayerResponse
	constructor: () ->
		@result = false
		@error = new Error()
		@player = new Player()
	
exports.PlayerResponse = PlayerResponse

