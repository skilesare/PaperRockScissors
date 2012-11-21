class PRSServer
	constructor: () ->		x=1

	move : (req, res, next) ->
		result = {}
		#check GameManager for existing game with this ID
		result.result = true
		result.gameState = 
			bComplete: true
		res.json(result)


exports.PRSServer = PRSServer
	
