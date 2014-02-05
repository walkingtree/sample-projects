Ext.define("PDFSplitter.view.DocumentCategory", {
    extend: 'Ext.form.ComboBox',
    
    xtype : 'documentcategory',
    
    initComponent : function( ){
    	var me = this;
    	me.store = Ext.create('PDFSplitter.store.DocumentCategory', { autoLoad : true});
    	
    	me.store.on('load', function(store){
    		me.select(store.data.items[0])
    	},this);
    	
    	me.displayField = 'category';
	    me.valueField =  'id';
    	
    	this.callParent( arguments );
    	
    }
});