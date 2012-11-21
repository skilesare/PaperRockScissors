class PlayerManager
	constructor: (thisEngraveManager) ->
		@self = @
		@engraveManager = thisEngraveManager
		@localPlayerCollection = {}
		@localPlayerCollectionByEmail = {}
	get: (userID, success, error) ->
		$this = @
		setTimeout ->
			result = new PlayerResponse()
			if !$this.localPlayerCollection[userID]?
				result.result = false
				result.error = ErrorHelper.UserNotFoundError
				error(result) if error?
				return
			result.result = true
			result.player = $this.localPlayerCollection[userID]
			success(result) if success?
		, 1
		return true
	add: (playerObject, success, error) ->
		$this = @
		setTimeout ->
			#test to see if player exists
			result = new PlayerResponse()
			console.log $this.localPlayerCollectionByEmail[playerObject.email] + " " + playerObject.email
			if $this.localPlayerCollectionByEmail[playerObject.email]?
				console.log 'returning error'
				result.result = false
				result.error = ErrorHelper.EmailExistsError
				error(result) if error?
				return 

			playerObject.userID = GUID()

			$this.localPlayerCollection[playerObject.userID] = playerObject
			$this.localPlayerCollectionByEmail[playerObject.email] =playerObject.userID
			result.result = true
			result.player = playerObject
			success(result) if success?
		,1
		return true


exports.PlayerManager = PlayerManager
	
