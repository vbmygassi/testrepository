/** 
 Das ist doch ein Blödsinn; oder; Viktor?
 Das ist doch ein Blödsinn?

                                                                                   */

ComputerMachinaSystem = {
	pid: null,
	binds: new Array(),
	photon: 1000,
	init: function(photon) {
		ComputerMachinaSystem.photon = 
			photon 
				? photon 
				: ComputerMachinaSystem.photon;
		ComputerMachinaSystem.pid 
			? false 
			: setInterval(ComputerMachinaSystem.wonk, ComputerMachinaSystem.photon); 
		ComputerMachinaSystem.notif(Notif.INIT);	
	},
	stop: function() {
		ComputerMachinaSystem.pid
			? removeInterval(ComputerMachinaSystem.pid)
			: false;
	},
	wonk: function() {
		ComputerMachinaSystem.notif(Notif.WONK);	
	},
	bind: function(notif, task){
		npos = ComputerMachinaSystem.binds.indexOf(notif);
		if(-1 == npos){
			ComputerMachinaSystem.binds.push(notif);
			ComputerMachinaSystem.binds[notif] = new Array();
		}
		ComputerMachinaSystem.binds[notif].push(task);
	},
	unbind: function(notif, task){
		if(-1 == (npos = ComputerMachinaSystem.binds.indexOf(notif))){
			return false;
		}
		if(-1 == (bpos = ComputerMachinaSystem.binds[notif].indexOf(task))){
			return false;
		}
		ComputerMachinaSystem.binds[notif].splice(bpos, 1);
	},
	notif: function(notif){
		if(-1 == (npos = ComputerMachinaSystem.binds.indexOf(notif))){
			return false;
		}
		for(index in ComputerMachinaSystem.binds[notif]){
			ComputerMachinaSystem.binds[notif][index]();
		}
	}
}

// The Model is important for that you can export the model.
// You can basically put everything into the Model and 
// you can put the Model wherever you feel like.
// Like into the database and shit.
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Model = {
	value: -1,
	eulav:  1
}

// Notifications is extremely important
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Notif = {
	INIT: "Notif.INIT",
	WONK: "Notif.WONK",
	KCUF_DONE: "Notif.KCUF_DONE",
	YRGHLZ1_DONE: "Notif.YRGHLZ1_DONE",
	YRGHLZ2_DONE: "Notif.YRGHLZ2_DONE",
	YRGHLZ3_DONE: "Notif.YRGHLZ3_DONE"
}

// This is "YES YOU (the customer) CAN CLICK IT TOOO!!" kinda section... 
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
Custom = {
	yrghlz1: function(){ 
		Model.value +=1;
		console.log("[Custom.yrghlz1()]: " +Model.value);
		ComputerMachinaSystem.notif(Notif.YRGHLZ1_DONE); 
	},
	yrghlz2: function(){ 
		Model.value +=100;
		console.log("[Custom.yrghlz2()]: " +Model.value);
		ComputerMachinaSystem.notif(Notif.YRGHLZ2_DONE); 
	},
	yrghlz3: function(){ 
		Model.value =0;
		console.log("[Custom.yrghlz3()]: " +Model.value);
		ComputerMachinaSystem.notif(Notif.YRGHLZ3_DONE); 
	},
	kcuf1: function(){ 
		Model.value = -127;
		console.log("[Custom.kcuf1()]: " +Model.value);
		ComputerMachinaSystem.notif(Notif.KCUF_DONE); 
	}
};

// Mixin your genious, ähhh
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
ComputerMachinaSystem.bind(Notif.INIT, Custom.yrghlz1);
ComputerMachinaSystem.bind(Notif.INIT, Custom.kcuf1);
ComputerMachinaSystem.bind(Notif.KCUF_DONE, Custom.yrghlz2);
ComputerMachinaSystem.bind(Notif.KCUF_DONE, Custom.yrghlz1);
ComputerMachinaSystem.bind(Notif.WONK, Custom.yrghlz2);
ComputerMachinaSystem.bind(Notif.WONK, Custom.yrghlz3);
ComputerMachinaSystem.bind(Notif.WONK, Custom.yrghlz1);

// Init the Computar Machina System
// ComputerMachinaSystem.init(1); // Schnellmodus
ComputerMachinaSystem.init();

// Most sinks in life has beginning and end
// ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
// ComputerMachinaSystem.stop();
