class Error
	constructor: (_errorid, _error) ->
		@errorID = 0
		@error = ""
		@errorID = _errorid if _errorid?
		@error = _error if _error?
	
exports.Player = Error

ErrorHelper = 
	EmailExistsError : new Error(300, "Email Exists")
	UserNotFoundError : new Error(301, "Can't find user with that userID")

exports.ErrorHelper = ErrorHelper
