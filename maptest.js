/*
http = require("http");

path = 'nix/_search?pretty -d {"query":{"bool":{"must":[{"range":{"filzerbamsler.lat":{"from":"1","to":"10"}}},{"range":{"filzerbamsler.lon":{"from":"2","to":"4"}}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}}';
path = "nix/_search?pretty",

options = { 
	host: "127.0.0.1", 
	port: "9200", 
	path: path,
	method: "POST"
};

request = http.request(options, function(res){
	var data = "";
	res.on('data', function(chunk){
		data +=chunk;
	});
	res.on('end', function(){
		console.log("**************** result:"); 
		// result = JSON.parse(data);
		// console.log(result.hits.hits);
		console.log(data);
	});
	res.on("error", function(){
		console.log(e.message);
	});
}).on("error", function(err){
	console.log(err);
}).end();
*/


Elastical = require("elastical");
elli = new Elastical.Client("127.0.0.1", { port: "9200" });

q = {"query":{"bool":{"must":[{"range":{"filzerbamsler.lat":{"from":"1","to":"10"}}},{"range":{"filzerbamsler.lon":{"from":"2","to":"4"}}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}};

elli.search(q, function(err, result, res){
	err ? console.lgo(err) : result ? console.log(result) : res ? console.log(res) : false;
});
