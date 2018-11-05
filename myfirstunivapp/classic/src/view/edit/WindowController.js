Ext.define('MyApp.view.edit.WindowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.edit-window',
    onSave: function(button) {
   		this.getViewModel().get('editDetails').commit();
   		this.getView().close();
   	},
   	onCancel: function(button) {
   		this.getViewModel().get('editDetails').reject();
   		this.getView().close();
   	}

});
