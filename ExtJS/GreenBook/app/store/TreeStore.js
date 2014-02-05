Ext.define("PDFSplitter.store.TreeStore", {
    extend: 'Ext.data.TreeStore',
    model: 'PDFSplitter.model.TreeModel',
    autoLoad: false,
    proxy: {
        type: 'ajax',
        url: 'ReadDirectory.php',
        /*url: 'data/data.json',*/
        reader: {
            type: 'json'
        }
    },
    root: {
        text: "All Files",
        expanded: true,
        loaded:true
//         children:[]
    }
});
