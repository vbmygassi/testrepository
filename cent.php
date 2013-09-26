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
	
	static public function centsToPricelabel($cents)
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
	
	static public function pricelabelToCents($label)
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
function testCentsToPricelabel($cents)
{
	$res = PriceFormat::$odecim = ",";
	$res = PriceFormat::centsToPricelabel($cents);
	print $res . PHP_EOL;
}

// ................................................... 
function testPricelabelToCents($label)
{
	$res = PriceFormat::$idecim = ",";
	$res = PriceFormat::pricelabelToCents($label);
	print $res . PHP_EOL;
}

// ................................................... 
testCentsToPricelabel(29999 +140 +2000);
testCentsToPricelabel(20 +12 +4 +200);
testCentsToPricelabel(12 +3000 -2 -50000 -120);
testCentsToPricelabel(12 +10);
testCentsToPricelabel(12.1 +10.11);
testCentsToPricelabel(12.1 +10.9999888811);
testCentsToPricelabel(12.1 +10.49 -.1 -.1);
testCentsToPricelabel(10000 +20000);
testCentsToPricelabel(1 +2);
testCentsToPricelabel(1 +2 +0);
testCentsToPricelabel(11 +24);
testCentsToPricelabel(0);

// ................................................... 
print "---" . PHP_EOL;
testPricelabelToCents(",1");
testPricelabelToCents(",19");
testPricelabelToCents("0,21");
testPricelabelToCents("10,21");
testPricelabelToCents("100");
testPricelabelToCents("100,2");
testPricelabelToCents("100,23");
testPricelabelToCents("100,456");
testPricelabelToCents("100,09");
testPricelabelToCents("109,299,500");
testPricelabelToCents("1a9,2x9,dd00");

// ................................................... 
testPricelabelToCents("87.98");

// ................................................... 
print <<<EOD
:: input :: 
--------------------    ----------
|              1000|    |      13|
--------------------  , ----------

EOD;
