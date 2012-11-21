class GameEngine
	constructor: () ->
		# ...
	move: (gameID, moveCode) ->
		#post move to the server
		$.ajax
			url: window.constants.BaseURL + "/api_v1/move"
			cache: false
			type: 'post'
			data:
				gameID: gameID
				moveCode: moveCode
			dataType: 'json'
			success: (data)->
				#proc response

	
