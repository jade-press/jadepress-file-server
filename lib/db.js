var MongoClient = require('mongodb').MongoClient
,setting = require('../app/setting')
,local = require('../app/local')

exports.init = function* () {

	//load db:jadepress
	exports.db = yield MongoClient.connect(setting.dbLink)

	//db init
	setting.dbCols.forEach(function(v) {
		exports.db.collection(v)
	})

	return Promise.resolve()

	//end
}