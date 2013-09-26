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
		
		$cents = round($cents, 0);
		$res = "";
		$temp = str_split($cents);
		$i = count($temp);
		switch($i){
			case 0: array_unshift($temp, 0, 0, 0, 0); break;
			case 1: array_unshift($temp, 0, 0, 0); break;	
			case 2: array_unshift($temp, 0, 0); break;
			case 3: array_unshift($temp, 0); break;
		}
		$i = count($temp);
		$dp = $i -3; 
		while($i--){
			if($dp == $i){ $res = self::$decim . $res; }
			$res = $temp[$i] . $res;
		}
		return $res;
	}
}






// ............ 



function testCentsToPrice($cents)
{
	$res = Fuck::$decim = ",";
	$res = Fuck::centsToCentsAOneHundredTimesRepr($cents);
	print $res . PHP_EOL;
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



