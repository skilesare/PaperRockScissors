class PRSServer
	constructor: () ->
		x=1
	move : (req,res) ->
		res.json({result: true})

exports.PRSServer = PRSServer
	
