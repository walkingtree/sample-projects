Ext.define('MyApp.view.main.Users', {
 extend: 'Ext.grid.Grid',

 xtype: 'mainusers',

 columns: [
 	{ text: 'Id',  dataIndex: 'userId', width: 100 },
 	{ text: 'Name',  dataIndex: 'userName', width: 100 },
 	{ text: 'Email', dataIndex: 'email', width: 230 },
 	{ text: 'Password', dataIndex: 'password', width: 150 },
 	{ text: 'Created On',  dataIndex: 'createdOn', width: 100 }
 ]
 });