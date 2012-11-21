class PRS
	constructor: () ->
		$this = @
		@self = @
		@testObject = "test"
	init: ->
		ko.applyBindings(@)

window.prs.PRS = PRS


