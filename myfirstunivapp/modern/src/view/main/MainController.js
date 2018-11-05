Ext.define('MyApp.view.main.MainController', {
 	extend: 'MyApp.view.main.SharedMainController',
 	requires: [
 		"MyApp.view.edit.EditForm"
 	],
 	alias: 'controller.main',
 	onItemSelected: function(sender, record) {


 		this.getView().push({
 			xtype: 'container',
 			layout: 'fit',
 			title: 'Edit Details',
 			items: [{
 				xtype: 'editform',
 				viewModel: {
 					data: {
 						editDetails: record[0]

 					}
 				}
 			}]
 		});
 	}

 	///sefasdg
 });