Ext.define("PDFSplitter.view.SplitContainer", {
    extend: 'Ext.panel.Panel',
    
    xtype : 'splitcontainer',
    isSplit : this.isSplit,
    
    initComponent : function(){
    	var me = this;
    	var splitItems = [];
    	if( this.isSplit == true ){
    		splitItems.push({
    			xtype : 'documentlist',
    			collapsible:true,
    			collapseDirection :'left',
    			width: 200,														
    			title : 'Documents'
    		});
    	}
    	splitItems.push({
    		xtype: 'thumbnailview',
    		allowContext : this.allowContext,
    		pageScale: 0.2,
    		border:0,
    	});
    	
    	
    	this.items = splitItems;
    	this.callParent( arguments );
    }
});