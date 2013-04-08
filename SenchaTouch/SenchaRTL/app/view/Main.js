Ext.define('SenchaRTL.view.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'main',
    initConfig:function(){
    	var me = this;
    	 me.loadLangFiles();
    	 me.callParent(arguments);
    	
    },
    config: {
        tabBarPosition: 'bottom',
        items : [
                 {
                	 title : 'LTR/RTL',
                	 xtype:'switchpage',
                	 iconCls:'star'
                 },
                 {
                     title : 'Data List',
                     xtype:'employeelist',
                     iconCls:'star'
                 },
                 {
                     title : 'Form Panel',
                     xtype : 'myform',
                     iconCls:'star'
                 }
                 ]
    },
    
    loadCssFile :function( fileName ){
    	
    	var fileReference = document.createElement("link");
        fileReference.setAttribute("rel", "stylesheet");
        fileReference.setAttribute("type", "text/css");
        fileReference.setAttribute("href", fileName);
        
        document.getElementsByTagName("head")[0].appendChild(fileReference);
        
        console.log(fileName + " CSS file loaded successfully");
    },
    loadJsFile : function ( fileName ){
    	
    	var fileReference = document.createElement('script');
    	fileReference.setAttribute("type", "text/javascript");
    	fileReference.setAttribute("src", fileName);
    	
    	document.getElementsByTagName("head")[0].appendChild(fileReference);
    	
    	console.log(fileName + " JS file loaded successfully");
    },
    loadLangFiles: function (){
    	
    	var lang = localStorage.getItem("b4e39e88-994e-4393-a6f0-b696f0a35dd2_LANGUAGE_KEY");
    	//console.log("The language is: " + lang);
    	
    	if(lang === "rtl"){
    		
    		this.loadJsFile("http://code.jquery.com/jquery-latest.js");
    		this.loadCssFile("touch/resources/css/sencha-touch-rtl.css");
    		this.loadCssFile("resources/css/app-rtl.css");
    	}else{
    		this.loadCssFile("resources/css/app.css");
    	}
    }
});
