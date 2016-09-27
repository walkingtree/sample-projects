Ext.define('TODO.view.MainView', {
    extend: 'Ext.navigation.View',
    alias: 'widget.mainview',

    requires: [
        'TODO.view.TaskList',
        'Ext.navigation.Bar',
        'Ext.Button',
        'Ext.dataview.List'
    ],

    config: {
        itemId: 'mainView',
        navigationBar: {
            docked: 'top',
            itemId: 'navBar',
            items: [
                {
                    xtype: 'button',
                    align: 'right',
                    itemId: 'addButton',
                    iconCls: 'add'
                }
            ]
        },
        items: [
            {
                xtype: 'tasklist'
            }
        ]
    }

});
