Ext.define('MVC.view.Viewport', {
	extend: 'Ext.container.Viewport',
	requires: ['MVC.view.department.List', 
			   'MVC.view.user.List'
			  ],
	layout: 'border',
	config: {
		items: [{
		 	region: 'west',
		 	width: 200,
		 	xtype: 'departmentlist'
			},
			{
			 region: 'center',
			 xtype: 'userlist'
			}
		]
	}
});

