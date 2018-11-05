Ext.define('MyApp.view.main.MainController', {
	extend: 'MyApp.view.main.SharedMainController',
	requires: [
		"MyApp.view.edit.Window"
	],
	alias: 'controller.main',
	onItemSelected: function(sender, record) {

		 Ext.create("MyApp.view.edit.Window", {
			title: 'Edit Details',
			viewModel: {
					data: {
						editDetails: record
					}
			},
			autoShow: true
		});

	
	}
});