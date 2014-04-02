Ext.define('AR.view.override.Tabpanel', {
    override: 'AR.view.Tabpanel',
        alias: 'widget.artabpanel',
    
    requires: [
        'AR.view.article.List',
        'AR.view.category.IconView',
        'AR.view.author.IconView',
        'AR.view.override.Tabpanel',
       'AR.store.ArticleStore'
    ],

    config: {
        itemId: 'mytabpanel',
        items: [
            {
                xtype: 'articlelist',
                itemId: 'home',
                disableSelection: true,
                title: AR.locale.Labels.ARTICLETAB_LABEL,
                iconCls: 'articles'
            },
            {
                xtype: 'categoryIconView',
                itemId: 'categories',
                title: AR.locale.Labels.CATEGORY_TAB_LABEL,
                iconCls: 'category'
            },
            {
                xtype: 'authorIconView',
                itemId: 'authors',
                title: AR.locale.Labels.AUTHORS_TAB_LABEL,
                iconCls: 'users'
            },
            {
                xtype: 'articlelist',
                itemId: 'myarticles',
                disableSelection: true,
                title: AR.locale.Labels.SAVEDARTI_TAB_LABEL,
                store:'articleLocalStore',
           
                iconCls: 'save'
            }
        ], 
        tabBar: {
            docked: 'bottom'
        }
        
       
    }


    
});


