
'use strict'

let _ = require('lodash')
,co = require('co')
,cid = require('shortid').generate
,MongoClient = require('mongodb').MongoClient
,GridFSBucket = require('mongodb').GridFSBucket
,db
,fs = require('fs')
,pack = require('../package.json')
,port = 9965
,path = require('path')
,config = require('../config-sample')
,chai = require('chai')
,assert = chai.assert
,host = 'http://127.0.0.1:' + port + '/file/'
,request = require('request')
,qr = function(args) {
	return new Promise(function(resolve, reject) {
		request(args, function(err, response, body) {
			if(err) reject(err)
			else resolve({
				response: response
				,body: body
			})
		})
	})
}

config.setting.dbLink = 'mongodb://127.0.0.1:27017/test1'
config.local.port = port

let init = require('../app/start').init

describe(pack.name, function() {

	this.timeout(20000)

	step('clear db', function(done) {

		co(function* () {
			let dd = yield MongoClient.connect(config.setting.dbLink)
			return dd.dropDatabase()
		})
		.then(function() {
			done()
		})

	})

	step('start server', function(done) {

		co(init(config))
		.then(function(app) {

			app.listen(port, config.setting.listenAddress, function() {
				console.log('' + new Date(), 'runs on port', port)
				db = require('../lib/db').db
				done()
				
			})
			
		})

	})

	step('download file', function(done) {

		co(testRun())
		.then(function(res) {
			assert(res.response.statusCode === 200)
			done()

		})

	})

})

/*run()
function run() {
	co(function*() {
		let dd = yield MongoClient.connect(config.setting.dbLink)
		yield dd.dropDatabase()
		let app = yield init(config)
		app.listen(port, config.setting.listenAddress, function() {
			console.log('' + new Date(), 'runs on port', port)	
		})
		db = require('../lib/db').db
		var obj = yield testRun()
		return Promise.resolve(obj)
	})
	.then(function(app) {
		console.log(app)
	})
}
*/

function getFid() {

	return new Promise(function(resolve, reject) {

		let bucket = new GridFSBucket(db, {
			bucketName: 'fs'
		})
		let gstream = bucket.openUploadStream('')
		let fid = cid()
		gstream.id = fid

		let part = fs.createReadStream(__dirname + '/test.jpg')
		part.pipe(gstream)
		let res = {
			_id: fid
			,ext: 'jpg'
		}
		gstream.once('finish', function() {
			resolve(res)
		})
		gstream.on('error', function(error) {
			reject(error)
		})

	})

}

function* testRun() {

	let obj = yield getFid()
	let url = host + obj._id + '.' + obj.ext
	console.log(url)
	return qr({
		url: url
		,method: 'get'
	})



}