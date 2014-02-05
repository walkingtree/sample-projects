Ext.define("PDFSplitter.store.DocumentCategory", {
    extend: 'Ext.data.Store',
    
    model: 'PDFSplitter.model.DocumentCategory',
    proxy: {
        type: 'ajax',
        api: {
            read: 'pdf/getDocumentCategory'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    
   
});