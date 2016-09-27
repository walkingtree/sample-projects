Ext.define('TODO.view.FormPanel', {
    extend: 'Ext.form.Panel',
    alias: 'widget.formpanel',

    requires: [
        'Ext.form.FieldSet',
        'Ext.field.DatePicker',
        'Ext.picker.Date',
        'Ext.Button',
        'Ext.field.Toggle'
    ],

    config: {
        items: [
            {
                xtype: 'fieldset',
                itemId: 'taskFormField',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Description',
                        labelWidth: '35%',
                        name: 'description',
                        required: true
                    },
                    {
                        xtype: 'selectfield',
                        label: 'Priority',
                        labelWidth: '35%',
                        name: 'priority',
                        required: true,
                        options: [
                            {
                                text: 'Normal',
                                value: 'Normal'
                            },
                            {
                                text: 'High',
                                value: 'High'
                            },
                            {
                                text: 'Low',
                                value: 'Low'
                            }
                        ],
                        usePicker: true
                    },
                    {
                        xtype: 'datepickerfield',
                        label: 'Due Date',
                        labelWidth: '35%',
                        name: 'dueDate'
                    },
                    {
                        xtype: 'togglefield',
                        label: 'Completed',
                        labelWidth: '35%',
                        name: 'completed'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'saveButton',
                margin: 10,
                ui: 'action',
                text: 'Save'
            },
            {
                xtype: 'button',
                itemId: 'deleteButton',
                margin: 10,
                ui: 'decline',
                text: 'Delete'
            }
        ]
    }

});