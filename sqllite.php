<?php
/*
	wild wild wild 	
		"like" select statements and sql -like search in a given couchbase instance

		yeah: gimme five

				*/

$path_to_my_coutchbase_backup = "/Users/vico/Workspace/MyGassiBackend2/backend/vico/db-backup/loc2.backup/bucket-default/node-127.0.0.1%3A8091/data-0000.cbb";

if(!($db = new SQLite3($path_to_my_coutchbase_backup))){
	print "no such db\n";
	print_r($path_to_my_coutchbase_backup);
	exit(10);
}

// if(!($q = $db->prepare('select * from cbb_msg'))){
// if(!($q = $db->prepare('select val from cbb_msg'))){
// if(!($q = $db->prepare('select * from cbb_msg where val like "%dog%" '))){
if(!($q = $db->prepare('select * from cbb_msg where val like "%type%:%dog%" and val like "%birthday%:%11076%"'))){
	print "corrupt statement\n";
	exit(20);
}

if(!($res = $q->execute())){
	print "no res for query\n";
	print_r($q);
	exit(30);
}

$i = 0;
while($row = $res->fetchArray()){
	print "////////////////////////////////////";
	print PHP_EOL;
	print_r($row);
	print PHP_EOL;
	print "\\\\\ " . $i;
	print PHP_EOL;
	$i++;
}

exit(40);
