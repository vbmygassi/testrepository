<?php
/*
	wild wild wild 	
		"like" select statements and sql -like search in a given couchdb instance
		without jetty

				*/

$path_to_my_coutch_db_backup = "/Users/vico/Workspace/MyGassiBackend2/backend/vico/db-backup/loc2.backup/bucket-default/node-127.0.0.1%3A8091/data-0000.cbb";

if(!($db = new SQLite3($path_to_my_coutch_db_backup))){
	print "no such db\n";
	return; 
}

print_r($db);

if(!($q = $db->prepare("select * from cbb_msg"))){
	print "corrupt execute of statement\n";
	return;
}

print_r($q);

if(!($res = $q->execute())){
	print "no res for query\n";
	return;
}

print_r($res);

while($row = $res->fetchArray()){
	print "***" . PHP_EOL;
	print_r($row);
	print PHP_EOL;
}

exit(19);