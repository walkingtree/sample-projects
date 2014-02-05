Ext.define('PDFSplitter.store.DocumentList',{
	extend : 'Ext.data.TreeStore',
	storeId : 'documentlist',
	
    root: {
        expanded: true,
        text : 'Documents'
    }

});
