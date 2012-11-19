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
task 'build', [], (params)->
	console.log('test')