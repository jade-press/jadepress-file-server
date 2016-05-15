
'use strict'

/**
 * catogory
 */
var _ = require('lodash')
,local = require('../app/local')
,escRegStr = require('escape-string-regexp')
,setting = require('../app/setting')
,tools = require('./tools')
,log = tools.log
,err = tools.err
,db = require('./db').db
,cid = require('shortid').generate
,multiparty = require('multiparty')
,GridFSBucket = require('mongodb').GridFSBucket
,bucket = new GridFSBucket(db, {
	bucketName: setting.bucketName
})

exports.file = function* (next) {

	try {
		var params = this.params
		,file = params.file

		if(!file) {
			return yield next
		}

		var arr = file.split('.')
		,len = arr.length

		if(len !== 2) {
			return yield next
		}

		let id = arr[0]
		let ext = arr[1]

		let indb = yield db.collection('fs.files').findOne({
			_id: id
		})

		if(!indb) {
			return yield next
		}

		//todo: anti leech
		var stream = bucket.openDownloadStream(id)

		this.type = '.' + ext
		this.body = stream

	} catch(e) {

		err(e.stack || e, 'get file fail')
		this.status = 500
		this.body = '500'

	}

	//end
}
