<?php
/*
    a wild wild wild attempt to store price values in their "cent" representation
	to avoid the "EUR 10.00" + "EUR 10,12" f u n  
 						
										*/
class Fuck
{ 
	static $decim = ",";
	public static function centsToCentsAOneHundredTimesRepr($cents)
	{
		// hätte *fast* geklappt	
		// return substr_replace($cents, self::$decim, strlen($cents) -2, 0);
		$res = "";
		$cents = round($cents, 0);
		$temp = str_split($cents);
		$i = count($temp);
		switch($i){
			case 0: array_unshift($temp, 0, 0, 0, 0); break;
			case 1: array_unshift($temp, 0, 0, 0); break;	
			case 2: array_unshift($temp, 0, 0); break;
			case 3: array_unshift($temp, 0); break;
		}
		$i = count($temp);
		$p = $i -3; 
		while($i--){
			if($p == $i){ $res = self::$decim . $res; }
			$res = $temp[$i] . $res;
		}
		return $res;
	}
}






// ............ 
function testCentsToCentsAOneHundredTimesRepr($cents)
{
	$res = Fuck::$decim = ",";
	$res = Fuck::centsToCentsAOneHundredTimesRepr($cents);
	print $res . PHP_EOL;
}

testCentsToCentsAOneHundredTimesRepr(40 +2000);
testCentsToCentsAOneHundredTimesRepr(20 +12 +4 +200);
testCentsToCentsAOneHundredTimesRepr(12 +3000 -2 -50000 -120);
testCentsToCentsAOneHundredTimesRepr(12 +10);
testCentsToCentsAOneHundredTimesRepr(12.1 +10.11);
testCentsToCentsAOneHundredTimesRepr(12.1 +10.9999888811);
testCentsToCentsAOneHundredTimesRepr(12.1 +10.49 -.1 -.1);
testCentsToCentsAOneHundredTimesRepr(10000 +20000);
testCentsToCentsAOneHundredTimesRepr(1 +2);
testCentsToCentsAOneHundredTimesRepr(1 +2 +0);
testCentsToCentsAOneHundredTimesRepr(11 +24);

