fs = require 'fs'
path = require 'path'


try
	shelljs = require 'shelljs/global'
catch e
	console.log 'shelljs missing.  run "npm install shelljs" from RestWeb Directory'

try
	coffee = require 'coffee-script'
catch e
	console.log 'coffee-script missing.  run "npm install coffee-script" from RestWeb Directory'
	
try
	ugly = require 'uglify-js'
catch e
	console.log 'uglify-js missing.  run "npm install uglify-js" from RestWeb Directory'

try
	nodeunit = require 'nodeunit'
catch e
	console.log 'nodeunit missing.  run "npm install nodeunit" from RestWeb Directory'

desc 'build'
task 'build', ['compile-server-coffee'], (params)->
	console.log('test')

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