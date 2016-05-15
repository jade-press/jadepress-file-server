//local setting

'use strict'

let packageInfo = require('../package.json')
let fs = require('fs')
let path = require('path')
let cols = fs.readdirSync( path.resolve(__dirname, '../doc/db') ).map(function(v) {
	return v.replace(/\.js$/, '')
})

module.exports = {

	//mongodb url
	dbLink: 'mongodb://127.0.0.1:27017/jadepress'

	//secret
	,secret: 'szdd345fef3dsdsfer23dv1ebdasdl'
	,logOn: true
	,dbCols: cols

}
