Ext.define("MyApp.view.edit.EditForm", {
    extend: 'Ext.form.Panel',
    requires: [
        "MyApp.view.edit.EditFormController",
    ],
    controller: "edit-editform",
    xtype: 'editform',
    items: [{
        xtype: 'component',
        height: 20
    }, {
        xtype: 'textfield',
        label: 'Name',
        bind: {
            value: '{editDetails.name}'
        }
    }, {
        xtype: 'component',
        height: 20
    }, {
        xtype: 'urlfield',
        label: 'Email',
        bind: {
            value: '{editDetails.email}'
        }
    }, {
        xtype: 'component',
        height: 20
    }, {
        xtype: 'textfield',
        label: 'Phone',
        bind: {
            value: '{editDetails.phone}'
        }
    }, {
        xtype: 'toolbar',
        docked: 'bottom',
        items: [{
            xtype: 'button',
            text: 'Save',
            handler: 'onSave'
        }, {
            xtype: 'button',
            text: 'Cancel',
            handler: 'onCancel'
        }]
    }]
 });