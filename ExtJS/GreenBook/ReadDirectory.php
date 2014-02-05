<?php

/**
 * function to check if directory is empty
 * @param string $dir
 */
 

function check_dir_has_pdf($dir,$false)
{	
    $ffs = scandir($dir);
	$return =$false;
	if(!$return)
	foreach($ffs as $ff)
	{
	   if($ff != '.' && $ff != '..') 
	   {
                if (count(glob($dir."/*.pdf")) >= 1)
                {
                   $return = true;
                }
                else if (count(glob($dir.'/'.$ff."/*.pdf")) >= 1)
                {
                   $return = true;
                }
                else 
                {
                   if(is_dir($dir.'/'.$ff)) { $return=check_dir_has_pdf($dir.'/'.$ff,$return); }
                }
           }
       }
	
       return $return;
} 


function check_dir_empty($dir) {
    
    $files_in_directory = scandir($dir);
   
    if (count($files_in_directory) <= 2)
    {
        $empty = true;
    }
    else {
        $empty = false;
    }
    
    return $empty;
}

/**
 * function to create list of folder and files in a directory
 * @param string $dir
 */
function drawArray(DirectoryIterator $directory) {
    
    $result = array();
    foreach ($directory as $object) {
        
        if ($object->isDir() && !$object->isDot()) {
            $newFile = new stdClass();
			
        if(!check_dir_empty($object->getPathname())) 
        {
            if(check_dir_has_pdf($object->getPathname(),false))
             {
                     $newFile->text = $object->getFilename();
                     $newFile->url = $object->getPathname();
                     $newFile->leaf = false;
                     $newFile->children = drawArray(new DirectoryIterator($object->getPathname()));
                     $result[] = $newFile;
                     // $result[$object->getFilename()] = $newFile;
             }
        }
            
        } else if ($object->isFile()) {
            
            $file = explode('.', $object->getFilename());
            $extentsion = $file[1];
            if($extentsion == 'pdf') {
                $newFile = new stdClass();
                $newFile->text = $file[0];
                $newFile->url = '/'. str_replace('/'.$object->getFilename(), '', $object->getPathname());
                $newFile->leaf = true;       
                $result[] = $newFile;
            }
        }
    }
    return $result;
}

$array = drawArray(new DirectoryIterator('data'));
$array1 = json_decode(json_encode($array));
echo json_encode($array1);

?>