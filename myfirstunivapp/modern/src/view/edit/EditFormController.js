Ext.define('MyApp.view.edit.EditFormController', {
 	extend: 'Ext.app.ViewController',
 	alias: 'controller.edit-editform',
 	requires: [
 		'Ext.MessageBox'
 	],
 	onSave: function(button) {
 		this.getViewModel().get('editDetails').commit();
 		Ext.Msg.alert('Record Saved');
 	},
 	onCancel: function(button) {
 		debugger;
 		this.getViewModel().get('editDetails').reject();
 		Ext.Msg.alert('Action Cancelled');
 	}
 	
  });