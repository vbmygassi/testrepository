elastical = require("elastical"),
nconf = require("nconf");
nconf.file({file:"basic.json"});

userID = 1001;
userID = 1015;
userID = 1022;
userID =  404;
userID =  627;
userID = 1242;
userID = 1032;
userID = 1099;
userID =  958;
userID =  641;
userID =  755;
userID =  878;
userID =  729;
userID =  535;
userID =  819;
userID =  402;
userID = 1051;
userID = 1168;
userID = 1197;
userID =  470;
userID = 1187;
userID = 1029;
userID = 1242;
userID = 1232;
userID =  505;
userID = 1103;
userID =  674;
userID =  455;
userID =  874;
userID =  660;
userID =  632;
userID = 1068;
userID = 1060;
userID = 1022;
userID =  579;
userID =  565;

Computerprogram = {
	getUserCreds: function() { 
		cq = Computerprogram.q.shift();
		Computerprogram.eli.search(cq, function(err, result, res) {
			err ? console.log(err) : result ? Computerprogram.l(result) : res ? console.log(res) : false;
		}); 
	},
	l: function(result) {
		for(index in result.hits){
			console.log(result.hits[index]._source);
		}
		if(1 <= Computerprogram.q.length){
			Computerprogram.getUserCreds();
		}
		else{
			Computerprogram.f();
		}
	},
	f: function() {
		console.log("Done: Creds of user: " +userID);
	},
	q: [
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"user"}},{"query_string":{"default_field":"default.id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"dog"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"notification"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"photo"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"friendship"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"gassicall"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"meetingpoint"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"receipt_data"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}},
		{"query":{"bool":{"must":[{"query_string":{"default_field":"default.type","query":"route"}},{"query_string":{"default_field":"default.user_id","query":""+userID+""}}],"must_not":[],"should":[]}},"from":0,"size":50,"sort":[],"facets":{}}
	]
};

Computerprogram.eli = new elastical.Client(nconf.get("search:host"), { port: nconf.get("search:port") }),
Computerprogram.getUserCreds();

