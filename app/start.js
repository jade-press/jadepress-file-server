
/**
 * Module dependencies.
 */

'use strict'

let
koa = require('koa')
,compress = require('koa-compress')
,mount = require('koa-mount')
,router = require('koa-router')
,path = require('path')
,fs = require('fs')
,_ = require('lodash')
,tools = require('../lib/tools')
,oneYear = 1000 * 60 * 60 * 24 * 365

//middlewares
exports.middlewares = [

	compress({
		threshold: 2048
		,flush: require('zlib').Z_SYNC_FLUSH
	})

]

exports.start = function() {

	let
	setting = require('./setting')
	,local = require('./local')
	,port = local.port

	// all environments
	,app = koa()
	,middlewares = exports.middlewares

	//middleware
	app.keys = [setting.secret]

	//routes
	let
	Router = require('koa-router')
	,apis = [
		{
			url: '/file/:file'
			,method: 'get'
			,name: 'download file'
			,desc: ''
			,lib: 'lib/file'
			,func: 'file'
		}
	]
	,route = new Router()

	middlewares.push(tools.accessLog)

	for(let i = 0, len = apis.length;i < len;i ++) {

		let api = apis[i]

		let p = path.resolve(__dirname, '../', api.lib)

		route[api.method](api.url, require(p)[api.func])

	}



	middlewares.push( route.routes() )
	middlewares.push( route.allowedMethods() )
	middlewares.push( function* (next) {
		this.status =  404
		this.body = '404'
	} )

	//now use middlewares
	for(let i = 0, len = middlewares.length;i < len;i ++) {
		app.use(middlewares[i])
	}
	
	return app
}

exports.init = function* (config) {

	let
	setting = require('./setting')
	,local = require('./local')
	Object.assign(setting, config.setting)
	Object.assign(local, config.local)

	setting.dbCols = [ setting.bucketName + '.files' ]

	let
	tools = require('../lib/tools')
	,log = tools.log
	,err = tools.err
	,dbRef = require('../lib/db')

	//load db
	yield dbRef.init()

	var db = dbRef.db

	let app = exports.start()

	return Promise.resolve(app)

}

