<?php
/*
    a wild wild wild attempt to store price values in their "cent" representation
	to avoid the "EUR 10.00" + "EUR 10,12" f u n 
	( wer sich wegen sowas mit seinen Freunden gestritten hat, weiss; was ich meine...
	( "kannst du mal die so machen das da dort die komma weg ist beim eingeben........ 
 						
										*/
class PriceFormat
{ 
	static public $decim = ".";
	static public function centsToPriceLabel($cents)
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

// ................................................... 
function testCentsToPriceLabel($cents)
{
	$res = PriceFormat::$decim = ",";
	$res = PriceFormat::centsToPriceLabel($cents);
	print $res . PHP_EOL;
}
// ................................................... 
testCentsToPriceLabel(29999 +140 +2000);
testCentsToPriceLabel(20 +12 +4 +200);
testCentsToPriceLabel(12 +3000 -2 -50000 -120);
testCentsToPriceLabel(12 +10);
testCentsToPriceLabel(12.1 +10.11);
testCentsToPriceLabel(12.1 +10.9999888811);
testCentsToPriceLabel(12.1 +10.49 -.1 -.1);
testCentsToPriceLabel(10000 +20000);
testCentsToPriceLabel(1 +2);
testCentsToPriceLabel(1 +2 +0);
testCentsToPriceLabel(11 +24);
testCentsToPriceLabel(0);
// ................................................... 
