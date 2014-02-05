<?php

// function to create json
function getContent() {
$categories='';

	$categories=  '[';
 	$categories.='{"text":"All Files","leaf":false,"expanded":true,"children":[';
 	$categories.='{"text":"HTML","leaf":true,"url":"data/HTML.pdf"},';
 	$categories.='{"text":"CSS","leaf":true,"url":"data/CSS.pdf"},';
	$categories.='{"text":"JavaScript","leaf":true,"url":"data/JavaScript.pdf"},';
	$categories.='{"text":"ExtJS","leaf":true,"url":"data/ExtJS.pdf"}';
        $categories  .=']}]';
       
	
    return $categories;
}


echo getContent();// sent to client



/*$db= mysqli_connect("localhost","root","empower","vinod_local");

$rs = $db->query("SELECT * FROM url");

$str = "[";

$arr = array();
while($row = $rs->fetch_assoc()){
	$str1 = '{"text":"'.$row['name'].'","leaf":"true","url":"'.$row['url'].'"}';
	
	array_push($arr,$str1);
}

$xtr2 = implode(",",$arr);
$str .= $xtr2;

$str .= "]";
echo $str;
*/

?>






