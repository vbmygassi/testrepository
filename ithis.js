/*
 

 indexes all documents of a couchbase instance 
 "into" a given elasticsearch instance
 (none of the "transport" thingies worked...
  i decided to download the documents (fthis.js) 
  and then index the documents "zu fuss"
 
 it uses a couchbase view:  
 http://127.0.0.1:8092/default/_design/export/_view/all?connection_timeout=60000&limit=5000&skip=0
 export : all
	===
	function (doc, meta){
		emit(doc.id, doc);
	}

                                                     */



Elastical = require("elastical");

require("request")("http://127.0.0.1:8092/default/_design/export/_view/all?connection_timeout=500&limit=5000&skip=0",
	function(err, response, body){
		if(err){
			console.log("err: " +err);
		} 
		if(response){
			console.log("response: " +response);
		} 
		if(null == body){
			return false;
		}
		client = new Elastical.Client("127.0.0.1", { port: 9200 });
		res = JSON.parse(body);
		for(index in res.rows){
			doc = res.rows[index];
			console.log("........................................");
			console.log(doc);
			console.log("//////////////////////////////////////////");
			console.log(index);
			console.log("   .");
			if(null == doc.id){
				console.log("no doc id: ");
				console.log(doc);
				continue;
			}
			doc.value.id = doc.id;
			client.index("adminsearch", doc._type ? doc._type : "default", doc.value, function(err, result, res){
				if(err){
					console.log("error while indexing: ");
					console.log(err);
					console.log(doc);
				}
				if(result){
					// console.log("result: ");
					// console.log(result);
				}
				if(res){
					// console.log("res: ");
					// console.log(res);
				}
			});
		}
	}
);

