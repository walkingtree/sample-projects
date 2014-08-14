Ext.define('DragDrop.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border'
    ],
    
    xtype: 'app-main',

    layout: {
        type: 'border'
    },

    items: [{
        region: 'west',
        xtype: 'westpanel',
        title: 'West Panel',
        width: 650
    },{
        region: 'center',
        xtype: 'centerpanel',
        title: 'Center Panel'
    }]
});