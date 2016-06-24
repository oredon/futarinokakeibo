<?php
//header( 'Content-Type: text/javascript; charset=utf-8' );
//var_dump($allSum);
//var_dump($dannaSum);
//var_dump($yomeSum);
//var_dump($dataArr);
//print_r($res);
//print_r($catArr);

$data = array();

if($json["status"] == "1"){
	$data = $json;
	$data["list"] = $dataArr;
	$data["sum"] = $allSum;
	$data["danna"] = $dannaSum;
	$data["yome"] = $yomeSum;
	$data["detail"] = $res;
	$data["category"] = $catArr;

}else{
	$data = $json;
}

$json_value = json_encode( $data );
echo $json_value;

?>
