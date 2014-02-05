delete Ext.tip.Tip.prototype.minWidth;  //showing tooltip text in one line

Ext.define('PDFSplitter.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires: [
        'Ext.layout.container.Fit',
        "PDFSplitter.view.TabView",
        //'PDFSplitter.view.ReadFile',
        'PDFSplitter.view.Header'
    ],
    alias: 'widget.pdfviewport',
    layout: {
        type: 'border'
    },
    initComponent: function() {
        me = this,
                this.callParent(arguments);
    },
    items: [{
            region: 'west',
            xtype: 'treepanel',
            rootVisible: false,
            store: Ext.create("PDFSplitter.store.TreeStore", {autoLoad: false}),
            itemId: 'treestore',
            hidden: this.isSplit,
            collapsible: true,
            collapseDirection: 'left',
            width: 200,
            title: 'All Files',
            listeners: {
                itemclick: function(view, record, item, index, e, eOpts) {

                    //record.set('iconCls', 'myIcon1');
                    if (record.get('leaf') == true) {

                        me.fireEvent('showloadmask', 'Loading PDF, please wait...');
                        me.fireEvent('showpdf', record);
                        me.fireEvent('treeitemclick', record);

//                                                this.fireEvent('showloadmask',me.loadingMessage);
//                                                this.fireEvent('treeitemclick',record);
//                                                this.up('mainpage').setTitle(record.get('text')+'.pdf');
//                                                this.up('mainpage').down('thumbnailview').show();


                    }
                }
                ,afterrender: function(ths, opt) {
                    var myMask = new Ext.LoadMask(Ext.getBody(), {msg: "Loading..."})
                    myMask.show();
                    ths.store.load({
                        callback: function(rec) {
                            myMask.hide();
                        }
                    },this);    
                }
            }
        }, {
            region: 'north',
            xtype: 'pageheader'
                    //xtype   : 'readfile'
        }, {
            region: 'center',
            xtype: 'tabview'
        }]
});
