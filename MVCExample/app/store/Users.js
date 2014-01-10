Ext.define('MVC.store.Users', {
	extend: 'Ext.data.Store',
	model: 'MVC.model.User',
	autoLoad:true,
	proxy: {
		type: 'ajax',
		api: {
		read: 'data/users.json'
		},
	reader: {
		type: 'json',
		root: 'users',
		successProperty: 'success'
		}
	},
	filterUsersByDepartment: function(deptCode) {
		this.clearFilter();
		this.filter([{
			property: 'department',
			value: deptCode
		}]);
	},

	refresh: function() {
	this.clearFilter();
	}
});

