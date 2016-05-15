
//local setting
exports.local = {

	//port
	port: 7201

	//listen address can be 'localhost' or '127.0.0.1' or domain name like 'example.com', default is undefined
	//,listenAddress: 'locahost'

	,env: process.env.NODE_ENV || 'dev' //or 'production'

	,siteName: 'jade-press file server'
}

//common setting
exports.setting = {

	secret: 'szdd345fef3dsdsfer23dv1ebdasdl'

	//mongodb url, 
	//visit https://docs.mongodb.org/manual/reference/connection-string/ for more info

	,dbLink: 'mongodb://127.0.0.1:27017/jadepress'

	//bucketName
	,bucketName: 'fs'

	//access log switch
	,logOn: true

}