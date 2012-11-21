class PRSServer
	constructor: () ->
		x=1
	move : (req,res, next) ->
		res.json({result: true})
		

exports.PRSServer = PRSServer
	
