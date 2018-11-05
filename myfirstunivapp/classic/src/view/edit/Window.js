
Ext.define('MyApp.view.edit.Window',{
    extend: 'Ext.window.Window',

    requires: [
        'MyApp.view.edit.WindowController'
    ],

    controller: 'edit-window',
    xtype:'editwindow',
    resizable: false,
    modal: true,
    layout:'fit',
   
    items: [{
            xtype: 'form',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Name',
                bind: {
                    value: '{editDetails.name}'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Email',
                bind: {
                    value: '{editDetails.email}'
                }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Phone',
                bind: {
                    value: '{editDetails.phone}'
                }
        
            }],
           buttons: [{
    text: 'Save',
    handler: 'onSave'
   }, {
    text: 'Cancel',
    handler: 'onCancel'
   }]
        }]
});
