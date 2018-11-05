Ext.define('MyApp.view.main.Users', {
 	extend: 'Ext.grid.Panel',
 	xtype: 'mainusers',
 	columns: [{
 		text: 'Id',
 		dataIndex: 'userId',
 		width: 100
 	}, {
 		text: 'Name',
 		dataIndex: 'userName',
 		width: 100
 	}, {
 		text: 'Email',
 		dataIndex: 'email',
 		width: 230
 	}, {
 		text: 'Password',
 		dataIndex: 'password',
 		width: 150
 	}, {
 		text: 'Created On',
 		dataIndex: 'createdOn',
 		width: 100
 	}],
 	dockedItems: [{
 		xtype: 'toolbar',
 		docked: 'top',
 		defaults: {
 			margin: 5
 		},
 		items: [{
 			xtype: 'button',
 			text: 'Delete',
 			handler: 'deleteUser'
 		}, {
 			xtype: 'button',
 			text: 'Add'
 		}, {
 			xtype: 'button',
 			text: 'Update'
 		}]
 	}]
 });