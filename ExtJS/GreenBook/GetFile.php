<?php
	$src=$_GET['path'];
	$name=$_GET['name'];
	$file;

	$src=dirname(__FILE__).$src;

	$dir=opendir($src);

	while(false!=($file=readdir($dir))){
		$str=explode('.',$file);

		if($str[1]=='pdf'){
  			
			if($str[0]==$name){
				
				echo $file;
				closedir($dir);
				break;
			}

		}

        }
exit;
?>

