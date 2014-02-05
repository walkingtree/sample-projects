<?php

class ReadData{

	/**
	 @remotable
	 Function to raed path and read files form given path
	 **/
	private $pdf	= array();
	
	private $data	= array();

	private $all	= array();


	public function read_data( $src ) {

		$name = 'name';

		$content = 'content';

		$dir = opendir( $src );


		if(  false !== ( $file = readdir($dir))  ){
			
			$this->readDirectory($src );
		}

		closedir($dir);
		
		//return array("files"=>array($this->data));
		return array("files"=>$this->data);
	}
	
	public function readDirectory( $path ){
		$dir = opendir( $path );

		$dataObjsa = array();

		$dataObjsa=  $this->readFilesData( $path,'pdf') ;
		
		if( !empty( $dataObjsa )){
			
		$this->data = array_merge( $this->data ,$dataObjsa);

		}

	}
	public function readFilesData( $path ,$extension){
		$script = array();
		$dir = opendir( $path );
		while( false !== ( $file = readdir($dir)) ) {
		

			if ( ( $file != '.' ) && ( $file != '..' ) ) {
		

				$isdirectory = is_dir($path . '/' . $file);
//var_dump($path);
//var_dump($file);
//var_dump($path . '/' . $file);
				

				if ( $isdirectory == false ) {

					$res = explode('.',$file);

					if($res[1]==$extension){
						//$content =  file_get_contents ($path . '/' . $file, "r");
						//$content =htmlentities($content, ENT_QUOTES | ENT_IGNORE, "UTF-8");
						$contents = array('name'=>$file/*,'content'=>$content*/);

						$script[] =$contents;


		

					}

				}

			}

		}
		
		return $script;
		
	}
}



$obj = new ReadData();

$src = $_GET['path'];
$src = dirname(__FILE__).$src ;



$data = $obj->read_data( $src );

// var_dump(count( $data['pdf'] ));


echo json_encode($data);

exit;


?>

