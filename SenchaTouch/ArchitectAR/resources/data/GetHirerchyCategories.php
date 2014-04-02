<?php


error_reporting(E_ALL);

if(is_numeric($_REQUEST['node'])){
	
 return false;	
}

$callback = $_REQUEST['callback'];
$string = file_get_contents("http://touchdemo.walkingtree.in/Training/?json=get_category_index");
$output=json_decode($string,true);




/** 
 * Filter catageories 
 * 
 * */
$leaf_name='text';
$filter_cateageory=$output['categories'];

//~ $categories = array();
//~ 
$list_categories = array();
//echo "<pre>";

function getposts_catid($catid){

//echo "http://192.168.1.125/Training/?json=get_posts&count=100&cat=".$catid."";
$string = file_get_contents("http://touchdemo.walkingtree.in/Training/?json=get_category_posts&count=100&category_id=".$catid."");
$output=json_decode($string,true);

$output =$output['posts'];


return $output;


	
}
function push_posts($d){

 $posteddata= getposts_catid($d['id']);


  if(!array_key_exists('categories',$d)){
	 $d['categories']=array(); 
  }
$d['leaf']=true;
$i=0; $n=0;
  foreach($posteddata as $k){
	  
	// $k['content'] = 'sdfafaf';
	
	 $k['tags']='';
	$k['attachments']='';
	$k['meta']='';
	$k['excerpt']= '';
	$k['leaf']= 'true';
	$k['categories']='';
	
	$k['content'] =
        preg_replace(
            array('{<a(.*?)[^>]*><img}', '{</a>}'),
            array('<img',''),
           $k['content']
        );
        
   
	$k['post_id']=$k['id'];
	unset($k['id']);
	unset($k['categories']) ; 
	
	
      if(array_key_exists('categories',$d)){

       array_push($d['categories'],$k);
       $i++;
      
      }else{
		  

		  array_push($d['categories'],$k);
	  $n++;
	  }
	  
	  }
	  
	  if($i!==0){
		  $d['leaf']="false";
		  
		  }
	  if($n!==0){
		  $d['leaf']="false";
		  
		  }
	
 return $d;	
}

function buildTree($data, $parent = 0) {
    $tree = array();
    foreach ($data as $d) {
        if ($d['parent'] == $parent) {
			
            $children = buildTree($data, $d['id']);
            
         
            // set a trivial key
            if (!empty($children)) {
			 
                $d['categories'] = $children;
                
                $d = push_posts($d);
                
                
            }else{
			
            $d = push_posts($d);
			
			}
            
            $tree[] = $d;
        }
    }
    return $tree;
}

$data[$leaf_name]="All Articals";
$data['id']="parentnode_tab";
$data['leaf']="true";
$data['categories']=buildTree($filter_cateageory,0);

//~ echo "<pre>";
//~ 
//~ print_r($data);

//~ if($callback!=""){
//~ echo $callback."(".json_encode($data).")";
//~ }else{
	//~ 
//~ echo  json_encode($data);	
	//~ }



if ($callback) {
    header('Content-Type: text/javascript');
    echo $callback . "(" . json_encode($data) . ");";
} else {
    header('Content-Type: application/x-json');
    echo json_encode($data);
}

?>
