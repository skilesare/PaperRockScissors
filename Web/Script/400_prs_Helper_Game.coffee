class GameEngine
	constructor: () ->
		# ...
	move: (gameID, moveCode, moveSuccess, moveError) ->
		#post move to the server
		console.log "posting move"
		$.ajax
			url: window.prs.constants.BaseURL + "/api_v1/move"
			cache: false
			type: 'POST'
			data:
				gameID: gameID
				moveCode: moveCode
			dataType: 'json'
			success: (data)->
				moveSuccess(data) if moveSuccess?
			error: (err,desc) ->
				moveError(err,desc) if moveError?

window.prs.GameEngine = GameEngine
	
