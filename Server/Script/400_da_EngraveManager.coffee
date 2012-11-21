class EngraveManager
	constructor: (appToken, appSecret) ->
		@appToken = appToken
		@appSecret = appSecret
		@player = new PlayerManager()

exports.EngraveManager = EngraveManager
	