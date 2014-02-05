Ext.define("PDFSplitter.view.TabView", {
    extend: 'Ext.tab.Panel',
    
    xtype : 'tabview',
    requires : ['PDFSplitter.view.MainPage'],
    layout : 'fit',
    
    initComponent : function( ){
    	var me = this;
    	
//    	this.items = [{
//
//    		xtype : 'mainpage',
//    		itemId :'originaltab',
//    		title : 'Original Document',
//    		allowContext : true,
//    		showSplitIcon : true,
//    		splitted : false
//    			
//    	}];
    				
 
    	this.callParent( arguments );
    }
    
});
