/**
 * Sencha Blink - Development
 * @author Jacky Nguyen <jacky@sencha.com>
 */
(function() {
    function write(content) {
        document.write(content);
    }

    function meta(name, content) {
        write('<meta name="' + name + '" content="' + content + '">');
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'app.json', false);
    xhr.send(null);

    var options = eval("(" + xhr.responseText + ")"),
        scripts = options.js || [],
        styleSheets = options.css || [],
        i, ln, path;

    meta('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no');
    meta('apple-mobile-web-app-capable', 'yes');
    meta('apple-touch-fullscreen', 'yes');

    for (i = 0,ln = styleSheets.length; i < ln; i++) {
        path = styleSheets[i];

        if (typeof path != 'string') {
            path = path.path;
        }

        write('<link rel="stylesheet" href="'+path+'">');
    }

    for (i = 0,ln = scripts.length; i < ln; i++) {
        path = scripts[i];

        if (typeof path != 'string') {
            path = path.path;
        }

        write('<script src="'+path+'"></'+'script>');
    }
    
    var lang = localStorage.getItem("b4e39e88-994e-4393-a6f0-b696f0a35dd2_LANGUAGE_KEY");
	
	if(lang === "rtl"){
		
		loadJsFile("touch/sencha-rtl.js");
		loadCssFile("touch/resources/css/sencha-touch-rtl.css");
    		loadCssFile("resources/css/app-rtl.css");
	}
	
	function loadJsFile( fileName ){
	    	
	    	var fileReference = document.createElement('script');
	    	fileReference.setAttribute("type", "text/javascript");
	    	fileReference.setAttribute("src", fileName);
	    	
	    	document.getElementsByTagName("head")[0].appendChild(fileReference);
	    	
	    	console.log(fileName + " JS file loaded successfully");
	    }

 	function loadCssFile( fileName ){
    	
    	var fileReference = document.createElement("link");
        fileReference.setAttribute("rel", "stylesheet");
        fileReference.setAttribute("type", "text/css");
        fileReference.setAttribute("href", fileName);
        
        document.getElementsByTagName("head")[0].appendChild(fileReference);
        
        console.log(fileName + " CSS file loaded successfully");
    }

})();
