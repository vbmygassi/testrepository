couchbase = require("couchbase");
nconf = require('nconf');
nconf.file({ file: 'conf.json' });

function Storage() 
{
	this.bucket = null;
}

Storage.prototype.connect = function connect(cb)
{
	that = this;
	couchbase.connect({
		"debug" 	: nconf.get('database:debug'),
		"user" 		: nconf.get('database:user'),
		"password" 	: nconf.get('database:password'),
        	"hosts" 	: nconf.get('database:hosts'),
        	"bucket" 	: nconf.get('database:bucket')
	}, function(err, bucket) {
		if (err) { 
			throw(err); 
		}
		that.bucket = bucket;
		console.log(bucket);
		cb();
	});
}

exports.Storage = Storage;
