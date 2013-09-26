<?php
/*
    a wild wild wild attempt to store price values in their "cent" representation
	to avoid the "EUR 10.00" + "EUR 10,12" f u n 
	( wer sich wegen sowas mit seinen Freunden gestritten hat, weiss; was ich meine...
	( "kannst du mal die so machen das da dort die komma weg ist beim eingeben........ 
 						
										*/
class PriceFormat
{ 
	static public $odecim = ".";
	static public $idecim = ".";
	
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
			if($p == $i){ $res = self::$odecim . $res; }
			$res = $temp[$i] . $res;
		}
		return $res;
	}
	
	static public function priceLabelToCents($label)
	{
		$res = 0;
		$temp = explode(self::$idecim, $label);
		if(1 == count($temp)){
			$temp[1] = "00";
		}
		$temp[0] = preg_replace("/[^0-9]/", "", $temp[0]);
		$temp[1] = preg_replace("/[^0-9]/", "", $temp[1]);
		$temp[1] = substr($temp[1], 0, 2);	
		if(1 == strlen($temp[1])){
			$temp[1] .= "0";
		}
		$res = $temp[0] . $temp[1];
		$res = intval($res);
		return $res;
	}
}

// ................................................... 
function testCentsToPriceLabel($cents)
{
	$res = PriceFormat::$odecim = ",";
	$res = PriceFormat::centsToPriceLabel($cents);
	print $res . PHP_EOL;
}
// ................................................... 
function testPriceLabelToCents($label)
{
	$res = PriceFormat::$idecim = ",";
	$res = PriceFormat::priceLabelToCents($label);
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
print "---" . PHP_EOL;
testPriceLabelToCents(",1");
testPriceLabelToCents(",19");
testPriceLabelToCents("0,21");
testPriceLabelToCents("10,21");
testPriceLabelToCents("100");
testPriceLabelToCents("100,2");
testPriceLabelToCents("100,23");
testPriceLabelToCents("100,456");
testPriceLabelToCents("100,09");
testPriceLabelToCents("109,299,500");
testPriceLabelToCents("1a9,2x9,dd00");
