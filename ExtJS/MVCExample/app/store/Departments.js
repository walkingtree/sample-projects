Ext.define('MVC.store.Departments', {
	extend: 'Ext.data.Store',
	model: 'MVC.model.Department',
	proxy: {
	type: 'ajax',
	api: {
		read: 'data/departments.json'
	},
	reader: {
		type: 'json',
		root: 'departments',
		successProperty: 'success'
		}
	}
});

