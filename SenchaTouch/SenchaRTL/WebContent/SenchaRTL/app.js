//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'SenchaRTL': 'app'
});
//</debug>

Ext.application({
    name: 'SenchaRTL',

    requires: [
        'Ext.MessageBox'
    ],

    views: ['Main','List','Form','Switch'],

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
    	
    	//var lang = localStorage.getItem("b4e39e88-994e-4393-a6f0-b696f0a35dd2_LANGUAGE_KEY");
    	//console.log("The language is: " + lang);
    	
    	/*if(lang === "rtl"){
    		this.loadJsFile("touch/sencha-rtl.js");
    	}*/
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('SenchaRTL.view.Main'));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    },
    
    loadJsFile : function ( fileName ){
    	
    	var fileReference = document.createElement('script');
    	fileReference.setAttribute("type", "text/javascript");
    	fileReference.setAttribute("src", fileName);
    	
    	document.getElementsByTagName("head")[0].appendChild(fileReference);
    	
    	console.log(fileName + " JS file loaded successfully");
    }
});
