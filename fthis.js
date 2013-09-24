/** 

 downloads all documents from a given couchdb instance
 to a "local" instance... "zu fuss" 
 since cbbackup and cbrestore did not work (missing ids, missing vbuckets

 it uses a couchbase view called 
 export | all
 dev_export | all (the non published view)
 function(doc, meta){
 	emit(doc.id, doc);
 }

                                  */

Storage = { 
	bucket: null,
	client: null,
	connect: function(cb)
	{
		Couchbase.connect({
			debug    : Config.DB.DEBUG,
			user     : Config.DB.USER,
			password : Config.DB.PASSWORD,
			hosts    : Config.DB.HOSTS,
			bucket   : Config.DB.BUCKET
		},
		onConnect = function(err, bucket)
		{
			if(err){ throw(err); };
			Storage.bucket = bucket;
			cb();
		});
	}
}

Fthis = {
	skip: 0,
	main: function()
	{
		Elastical = require('elastical');
		Couchbase = require("couchbase");
		Storage.connect(Fthis.downloadDocument);
	},
	downloadDocument: function()
	{
		console.log("downloadDocument()");
		http = require("http");
		options = { host: Config.DOWNLOAD.HOST, port: Config.DOWNLOAD.PORT, path: Config.DOWNLOAD.PATH };
		request = http.request(options, function(res){
			var data = "";
				res.on('data', function(chunk){
				data +=chunk;
			});
			res.on('end', function(){
				Fthis.insertDocument(JSON.parse(data));
			});
		});
		request.on('error', function (e) {
			console.log(e.message);
		});
		request.end();
	},
	insertDocument: function(res)
	{
		console.log("insertDocument():" +res);
		if(res.error){
			console.log(res.error);
			return;
		}
		for(index in res){
			docs = res[index];
			for(ii in docs){
				doc = docs[ii];
				console.log(doc);
				Storage.bucket.add({key: doc.id}, doc.value, Fthis.next);
			}
		}
	},
	next: function()
	{
		console.log(Fthis.skip);	
		Fthis.skip += 1;
		Config.DOWNLOAD.PATH =  "/default/_design/dev_export/_view/all?stale=update_after&connection_timeout=60000&limit=1&skip=" +Fthis.skip;
		Fthis.downloadDocument();		
	},
	trace: function(err, result, res)
	{
		console.log("trace()");
		err ? console.log(err) : result ? console.log(result) : res ? console.log(res) : false;
	}
}

Config = {
	DB: {
		DEBUG: true,
		HOSTS: ["localhost:8091"],
		USER: "viktor",
		PASSWORD: "pass",
		BUCKET: "default"
	},
	DOWNLOAD: {
		HOST: "amazon",
		PORT: "8092",
		PATH: "/default/_design/dev_export/_view/all?stale=update_after&connection_timeout=60000&limit=1&skip=0"
	}
}

Fthis.main();
