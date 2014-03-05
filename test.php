<?php 
	header('Access-Control-Allow-Origin:*');
	header("Content-Type: text/json");
	date_default_timezone_set('Asia/Tokyo');

	// 	{"day":"2014-01-31T15:00:00.000Z","angry":0,"grief":1,"vigilance":0,"joy":0,"terror":0,"amazement":2},
	$year = $_GET["year"];
	$month = $_GET["month"];
	$days = cal_days_in_month(CAL_GREGORIAN, $month, $year);
	$data = array(0, 0, 0, 0, 0, 0, 0,0,0,0,0,0,0,0,0,0,0,0, 1, 2, 3);
	$data_length = count($data)-1;

	$resp = array();
	for($i=0;$i<$days;$i++){
		$time = mktime(0, 0, 0, $month, $i, $year);
		array_push($resp, array(
			"day" => date("Y-m-d", $time) . 'T15:00:00.000Z',
			"angry" => $data[rand(0, $data_length)],
			"grief" => $data[rand(0, $data_length)],
			"vigilance" => $data[rand(0, $data_length)],
			"joy" => $data[rand(0, $data_length)],
			"terror" => $data[rand(0, $data_length)],
			"amazement" => $data[rand(0, $data_length)],
		));
	}
	echo json_encode($resp);
?>