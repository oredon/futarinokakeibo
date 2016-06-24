<?php
header( 'Content-Type: text/javascript; charset=utf-8' );
//var_dump($allSum);
//var_dump($dannaSum);
//var_dump($yomeSum);
//var_dump($dataArr);

$json_value = json_encode( $dataArr );
echo $json_value;

?>
