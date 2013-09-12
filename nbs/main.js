Express = require("express");
Storage = require("./storage").Storage;
MustacheExpress = require('mustache-express');

main = new Express();
main.engine("mustache", MustacheExpress("views", ".mustache"));
main.set("view engine", "mustache");

storage = new Storage();

main.all("*", function(req, res) {
	res.render("layout", {
		fuck: "Yes Mam. I bet he would Mam."
	});
});

storage.connect(function() {
	main.listen(3999, function(){
		console.log("listening on port:" +3999);
	});
});
