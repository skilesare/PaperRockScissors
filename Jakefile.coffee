fs = require 'fs'
path = require 'path'


try
	shelljs = require 'shelljs/global'
catch e
	console.log 'shelljs missing.  run "npm install shelljs" from repo Directory'

try
	coffee = require 'coffee-script'
catch e
	console.log 'coffee-script missing.  run "npm install coffee-script" from repo Directory'
	
try
	ugly = require 'uglify-js'
catch e
	console.log 'uglify-js missing.  run "npm install uglify-js" from repo Directory'

try
	nodeunit = (require 'nodeunit').reporters["default"]
catch e
	console.log 'nodeunit missing.  run "npm install nodeunit" from repo Directory'

try 
	less = require 'less'
catch e
	console.log 'less is missing.  run "npm install less" from repo Directory'

desc 'build'
task 'build', ['compile','test'], (params)->
	console.log('building')
	complete()

desc 'compile'
task 'compile', ['compile-server-coffee','compile-server-less','compile-servertest-coffee','compile-client-coffee'], (params)->
	console.log('compiling')
	complete()

desc 'test'
task 'test', ['compile','testNode'], (params)->
	console.log('testingb')
	complete()

desc 'compile-server-coffee'
task 'compile-server-coffee', [], (params)->
	

	#Getting the included Coffee files
	secondlist = new jake.FileList()
	secondlist.include ls('Server/Script/*test.coffee')	
	console.log "test to not process:" + secondlist.toArray()
	list = new jake.FileList()
	list.include ls('Server/Script/*coffee')
	
	list.exclude secondlist.toArray()
	console.log "files to process:" + list.toArray()
	filestring = ""
	arglist = ""
	firstfile = ""
	#combine files
	for i,idx in list.toArray()	
		thisFile = ""
		thisFile = fs.readFileSync(i, 'utf8') + '\r\n'		
		#console.log thisFile
		filestring += thisFile
		#fs.writeFileSync path.normalize('app/Scripts/' + idx + '.coffee'),thisFile
		
	js = coffee.compile filestring
	console.log 'compiling cofeescript temp_app.coffee to app.js'
	fs.writeFileSync path.normalize('app.js'), js	
	complete()

desc 'compile-servertest-coffee'
task 'compile-servertest-coffee', [], (params)->
	

	#Getting the included Coffee files
	list = new jake.FileList()
	list.include ls('Server/Script/_*test.coffee')
	
	console.log "files to process:" + list.toArray()
	filestring = ""
	arglist = ""
	firstfile = ""
	#combine files
	for i,idx in list.toArray()
		console.log 'compiling:' + i
		thisFile = ""
		thisFile = fs.readFileSync(i, 'utf8') 	
		js = coffee.compile thisFile
		fs.writeFileSync path.normalize(i.replace('.coffee','.js')), js	
	complete()

desc 'compile-server-less'
task 'compile-server-less', [], (params)->
	

	#Getting the included Coffee files	
	list = new jake.FileList()
	list.include ls('Server/Content/styles/*less')
	
	console.log "files to process:" + list.toArray()
	filestring = ""
	arglist = ""
	firstfile = ""
	#combine files
	for i,idx in list.toArray()	
		thisFile = ""
		thisFile = fs.readFileSync(i, 'utf8') + '\r\n'		
		#console.log thisFile
		filestring += thisFile
		#fs.writeFileSync path.normalize('app/Scripts/' + idx + '.coffee'),thisFile

	parser = new(less.Parser);

	parser.parse filestring, (err, tree) ->
		if err
			console.log err	
		css = tree.toCSS()

		console.log 'compiling less app.css'
		fs.writeFileSync path.normalize('Server/Content/styles/app.css'), css	
		complete()

desc 'compile-client-coffee'
task 'compile-client-coffee', [], (params)->
	

	#Getting the included Coffee files
	secondlist = new jake.FileList()
	secondlist.include ls('Web/Script/*test.coffee')	
	console.log "test to not process:" + secondlist.toArray()
	list = new jake.FileList()
	list.include ls('Web/Script/*coffee')
	
	list.exclude secondlist.toArray()
	console.log "files to process:" + list.toArray()
	filestring = ""
	arglist = ""
	firstfile = ""
	#combine files
	for i,idx in list.toArray()	
		thisFile = ""
		thisFile = fs.readFileSync(i, 'utf8') + '\r\n'		
		#console.log thisFile
		filestring += thisFile
		#fs.writeFileSync path.normalize('app/Scripts/' + idx + '.coffee'),thisFile
		
	js = coffee.compile filestring
	console.log 'compiling cofeescript client app.js'
	fs.writeFileSync path.normalize('Server/Content/scripts/app.js'), js	
	complete()

desc "Test server code"
task "testNode", ['compile','compile-client-coffee'], ->
	console.log('testing')
	console.log(nodeTestFiles())
	nodeunit.run nodeTestFiles(), null, (failures) ->
		if (failures) 
			fail("Tests failed")
		complete()
	


nodeTestFiles = () ->
	testFiles = new jake.FileList()
	testFiles.include("Server/Script/_*_test.js")
	testFiles = testFiles.toArray()
	return testFiles

