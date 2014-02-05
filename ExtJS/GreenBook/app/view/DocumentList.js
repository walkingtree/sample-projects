Ext.define("PDFSplitter.view.DocumentList", {
	extend : 'Ext.tree.Panel',
	alias : 'widget.documentlist',

	requires : ['PDFSplitter.store.DocumentList'],
//	autoScroll : true,
	rootVisible : true,
	useArrows : true,
	multiSelect : false,
	hideHeaders : true,
	bodyCls :'panelBody',

	listeners : {
		/**
		 * Fired after a record is selected
		 * 
		 * @param view -- Ext.selection.RowModel
		 * @param record -- The Selected record
		 * 					Ext.data.Model
		 * @param index -- The row index selected
		 * 				   Number
		 * 
		 */
		select: function( view, record, index ){
			this.fireEvent( 'nodeselected', record, index );
			
		}
//,
//		itemappend : function(view, record, index){
//			this.fireEvent( 'nodeselected', view.childNodes[0] );
//		}

	},

	initComponent : function() {
		var me = this;
		this.store = Ext.create('PDFSplitter.store.DocumentList', {autoLoad : true });
		
		this.callParent(arguments);
	}

});