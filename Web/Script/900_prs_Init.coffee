setTimeout ->
	$ ()->	
		appVM = new PRS()
		appVM.init()
		window.appVM = appVM
, 100