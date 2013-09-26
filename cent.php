<?php
/*
    a wild wild wild attempt to store price values in their "cent" representation
	to avoid the "EUR 10.00" + "EUR 10,12" f u n  
 						
										*/
class PriceFormat
{ 
	static public $decim = ".";
	static public function formatCentsToPrice($cents)
	{
		// hätte *fast* geklappt	
		// return substr_replace($cents, self::$decim, strlen($cents) -2, 0);
		$res = "";
		// bruchcente gibt es ab jetzt nicht mehr
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
function testFormatCentsToPrice($cents)
{
	$res = PriceFormat::$decim = ",";
	$res = PriceFormat::formatCentsToPrice($cents);
	print $res . PHP_EOL;
}

testFormatCentsToPrice(40 +2000);
testFormatCentsToPrice(20 +12 +4 +200);
testFormatCentsToPrice(12 +3000 -2 -50000 -120);
testFormatCentsToPrice(12 +10);
testFormatCentsToPrice(12.1 +10.11);
testFormatCentsToPrice(12.1 +10.9999888811);
testFormatCentsToPrice(12.1 +10.49 -.1 -.1);
testFormatCentsToPrice(10000 +20000);
testFormatCentsToPrice(1 +2);
testFormatCentsToPrice(1 +2 +0);
testFormatCentsToPrice(11 +24);

