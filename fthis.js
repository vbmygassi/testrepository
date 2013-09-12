/* :::::::::: ... :::: .... ?? :::: :
   ::::::::::::::::::::::::::::::::::
   ::::::::::::::::::::::::::::......
   :: (die letzten Haare so; "Nein, wir bleiben!"


   downloads documents from an existing storage and stores them local for fun
	the view: dev_export view all function(){ emit(doc._id, doc) }

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
	main: function()
	{
		Elastical = require('elastical');
		Couchbase = require("couchbase");
		Storage.client = new Elastical.Client(Config.ELASTIC.HOST, {port: Config.ELASTIC.PORT});
		Storage.connect(Fthis.downloadDocuments);
	},
	downloadDocuments: function()
	{
		console.log("downloadDocuments()");
		http = require("http");
		options = { host: Config.DOWNLOAD.HOST, port: Config.DOWNLOAD.PORT, path: Config.DOWNLOAD.PATH };
		request = http.request(options, function(res){
			var data = "";
				res.on('data', function(chunk){
				data +=chunk;
			});
			res.on('end', function(){
				Fthis.insertDocuments(JSON.parse(data));
			});
		});
		request.on('error', function (e) {
			console.log(e.message);
		});
		request.end();
	},
	insertDocuments: function(res)
	{
		console.log("insertDocuments()");
		if(res.error){
			console.log(res.error);
			return;
		}
		for(index in res){
			docs = res[index];
			for(ii in docs){
				doc = docs[ii];
				console.log(doc);
				Storage.bucket.add({key: doc.id}, doc.value, Fthis.trace);
			}
		}
	}
	trace: function(err, result, res)
	{
		console.log("trace()");
		err ? console.log(err) : result ? console.log(result) : res ? console.log(res) : false;
	}
}

Config = {
	ELASTIC:{
		CLIENT: "127.0.0.1",
		PORT: "9200",
		INDEX: "search"
	},
	DB: {
		DEBUG: true,
		HOSTS: ["localhost:8091"],
		USER: "viktor",
		PASSWORD: "pass",
		BUCKET: "default",
		VIEW: "dev_export", 
		EMIT: "all",
		OPTS: { stale: "update_after", connection_timeout: 60000, limit: 10000, skip: 1 }
	},
	DOWNLOAD: {
		HOST: "ec2-54-216-141-253.eu-west-1.compute.amazonaws.com",
		PORT: "8092",
		PATH: "/default/_design/dev_export/_view/all?stale=false&connection_timeout=60000&limit=2000&skip=0"
	}
}
Fthis.main();
