Ext.define('PDFSplitter.view.ErrorPanel', {
    extend : 'Ext.panel.Panel',
    
    xtype : 'errorpanel',
    
    itemId: 'errorPanel',
    cls: 'error-panel',
    
    border: 0,
    margin: '0 0 15 0',
    hidden: true,
    
    items:[{
    	xtype : 'button',
    	text : 'Cancel',
    	style:'float:right;',
    	handler:function( btn ){
    		btn.up('panel').close()
    	}
    }]
});