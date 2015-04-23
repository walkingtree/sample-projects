Ext.define('AppsBoard.view.dashboard.parts.BooksList', {
    requires: [

        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.bookslist',

    viewTemplate: {
        layout: 'fit',
        title: 'Suggested Books',
        header: false,
        items: [{
            xtype: 'dataview',
            bodyPadding: 5,
           itemTpl: [],
            store: {
                storeId: 'books',
                autoLoad: true,
                fields: ['id', 'title', 'imgurl', 'desc'],
                proxy: {
                    type: 'ajax',
                    url: 'resources/data/senchabooks.json',
                    reader: {
                        rootProperty: 'books'
                    }
                }
            },
            itemSelector: 'div.thumb-wrap'
        }]
    },

    createView: function(config) {

        var view = this.callParent(arguments);

        view.scrollable = Ext.scroll.Scroller.create({
            y: true
        });
        view.items[0].itemTpl = new Ext.XTemplate(
            '<div class="thumb-wrap">',
            '<img src="{imgurl}" height="80">',
            '<div class="detail">',
            '<span class="title">{title}</span></br>',
            '<span class="desc">{desc}</span><a class="readmore" href="{readmore}" target="_blank">Read more...</a></div>',
            '</div>');

        return view;
    }
});