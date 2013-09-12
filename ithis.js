/* :::::::::: ... :::: .... ?? :::: :
   ::::::::::::::::::::::::::::::::::
   ::::::::::::::::::::::::::::......
   :: (die letzten Haare so; "Nein, wir bleiben!"


   transports documents stored in a Couchbase instance to an Elasticsearch instance? 

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
		Storage.connect(Fthis.transportDocuments);
	},
	transportDocuments: function()
	{
		console.log("transportDocuments()");
		Storage.bucket.view(Config.DB.VIEW, Config.DB.EMIT, Config.DB.OPTS, Fthis.indexDocuments);
	},
	indexDocuments: function(err, res)
	{
		console.log("indexDocuments()");
		if(err){
			console.log(err);
			return;
		}
		for(index in res){
			doc = res[index];
			console.log(doc);
			doc.value.id = doc.id;
			Storage.client.index(Config.ELASTIC.INDEX, doc._type ? doc._type : "default", doc.value, Fthis.trace);
		}
	},
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
		VIEW: "export",
		EMIT: "all",
		OPTS: { stale: "update_after", connection_timeout: 60000, limit: 2000, skip: 0 }
	}
}

Fthis.main();
