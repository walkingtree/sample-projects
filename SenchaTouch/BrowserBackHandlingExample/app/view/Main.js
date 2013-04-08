Ext.define('BrowserBackExample.view.Main', {
	extend: 'Ext.Panel',
	   xtype:'main',
	   config : {
		layout : 'fit',
		items : [{
			xtype : 'container',
			layout : 'card',
			name : 'mainpanelcard',
			activeItem : 0,
			items : [
					{
						xtype : 'list',
						itemTpl: '{listItem}',
					    data: [
					        { listItem: '1st List Item' },
					        { listItem: '2nd List Item' },
					        { listItem: '3rd List Item' },
					        { listItem: '4th List Item' }
					    ],
					    items :[{
					    	xtype : 'toolbar',
					    	title : 'Browser Back Sample',
					    	docked: 'top'
					    }]
					},{
						xtype : 'panel',
						html : 'Welcome to 2nd card.'
					},{
						
						xtype : 'titlebar',
						docked :'bottom',
						items :[{
							xtype : 'wtcbutton',
							name : 'switchToNextCard',
							text : 'Next',
							align : 'right'
						},{
							xtype : 'wtcbutton',
							name : 'switchToPreviousCard',
							hidden : true,
							text : 'Previous',
							align : 'left'
						}]
					}]
		} ]
	}

	});
