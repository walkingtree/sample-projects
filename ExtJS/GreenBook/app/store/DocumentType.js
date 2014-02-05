Ext.define("PDFSplitter.store.DocumentType", {
    extend: 'Ext.data.Store',
    
    model: 'PDFSplitter.model.DocumentType',
    proxy: {
        type: 'ajax',
        api: {
            read: 'pdf/getDocumentType'
        },
        reader: {
            type: 'json',
            root: 'data'
        }
    }
    
   
});