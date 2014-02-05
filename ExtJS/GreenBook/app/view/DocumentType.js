Ext.define("PDFSplitter.view.DocumentType", {
	extend: 'Ext.form.ComboBox',

	xtype : 'documenttype',

	initComponent : function( ){
		var me = this;
		me.store = Ext.create('PDFSplitter.store.DocumentType', { autoLoad : true});
		
	  	me.store.on('load', function(store){
    		me.select(store.data.items[0])
    	},this);
		
		me.displayField = 'type';
	    me.valueField =  'id';

		this.callParent( arguments );

	}
});