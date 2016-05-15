/*
tools
*/

'use strict'

let setting = require('../app/setting')

exports.log = function() {
	console.log.apply(null, ['' + new Date()].concat(Array.from(arguments)))
}

exports.err = function() {
	console.error.apply(
		null, ['' + new Date()].concat(
			Array.from(arguments).map(function(v) {
				return v.stack || v
			})
		)
	)
}

exports.warn = function() {
	console.warn.apply(
		null, ['' + new Date()].concat(
			Array.from(arguments).map(function(v) {
				return v.stack || v
			})
		)
	)
}

exports.accessLog = function* (next) {

	let sess = this.session || {}

	if(setting.logOn) console.log(
		'' + new Date()
		,this.method
		,this.href
		,this.headers['x-forwarded-for'] || this.ip || this.ips
	)

	return yield next
}
