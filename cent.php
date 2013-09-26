<?php
/*
    a wild wild wild attempt to store price values in their "cent" representation
	to avoid the "EUR 10.00" + "EUR 10,12" f u n  


 						*/

function centsToPrice($cents, $decim, $curry)
{
	$temp = str_split($cents);
	$i = count($temp);
	switch($i){
		case 0: array_unshift($temp, 0, 0, 0, 0); break;
		case 1: array_unshift($temp, 0, 0, 0); break;	
		case 2: array_unshift($temp, 0, 0); break;
		case 3: array_unshift($temp, 0); break;
	}
	$i = count($temp);
	$res = "";
	$d = 0;
	while($i--){
		if(2 == $d){
			$res = $decim . $res;
		}
		$res = $temp[$i] . $res;
		$d++;
	}
	$res = $res . " " . $curry;	
	
	return $res;
	
	// $res = substr_replace($cents, $decim, strlen($cents) -2, 0);
	
	/*
	$res = 0; 
	$dollars = $cents /100;
	$dollars = round($dollars, 2);
	$price = array("0", "00");
	$temp = "" +$dollars;
	if(false !== strpos($temp, ".")){
		$kaki = explode(".", $temp);
		$price[0] = $kaki[0];
		if(strlen($kaki[1]) == 1){
			$price[1] = $kaki[1] . "0";
		}
		else if(strlen($kaki[1]) == 2){
			$price[1] = $kaki[1];
		}
	} 
	else {
		$price[0] = $temp;
		$price[1] = "00";
	}
	$res = join($decim, $price); 
	$res = $res . " " . "€";
	return $res;
	*/	
}

function testCentsToPrice($cents)
{
	$cents = round($cents, 0);
	
	// settings
	$decim = ",";
	$curry = "€";
	// 
	
	print centsToPrice($cents, $decim, $curry);
	print "\n";
}

testCentsToPrice(40 +2000);
testCentsToPrice(20 +12);
testCentsToPrice(12 +3000);
testCentsToPrice(12 +10);
testCentsToPrice(12.1 +10.11);
testCentsToPrice(12.1 +10.9999888811);
testCentsToPrice(12.1 +10.49);
testCentsToPrice(10000 +20000);
testCentsToPrice(1 +2);
testCentsToPrice(1 +2 +0);
testCentsToPrice(11 +24);



