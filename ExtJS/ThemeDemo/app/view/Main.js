Ext.define('DemoApp.view.Main', {
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
        xtype: 'panel',
        title: 'west',
        width: 150
    },{
        region: 'center',
        xtype: 'tabpanel',
        items:[{
            title: 'Center Tab 1',
			
			items: [{
				xtype : 'container',
				width : 300,
				height : 200,
				layout : {
					type : 'vbox',
					align: 'middle',
					pack : 'center'
				},
				items : [{
					xtype : 'button',
					width : 80,
					height : 80,
					text : 'Sample Test',
					iconAlign : 'top',
					icon : 'resources/images/workspace-icon-32x32.png',
					scale : 'large'
				}]
			}]
        }]
    }]
});