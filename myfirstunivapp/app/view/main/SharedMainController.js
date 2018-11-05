/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('MyApp.view.main.SharedMainController', {
    extend: 'Ext.app.ViewController',


    onConfirm: function (choice) {
        if (choice === 'yes') {
            //
        }
    },
    deleteUser: function(button){
        var users = this.lookupReference('mainUsers');
        var rec = users.getSelection();
        users.getStore().remove(rec);
    }
});
