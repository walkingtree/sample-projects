Ext.define('TODO.model.Task', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    config: {
        fields: [
            {
                allowNull: false,
                name: 'description',
                type: 'string'
            },
            {
                allowNull: false,
                name: 'priority',
                type: 'string'
            },
            {
                name: 'dueDate',
                type: 'date'
            },
            {
                allowNull: false,
                defaultValue: false,
                name: 'completed',
                type: 'boolean'
            }
        ]
    }
});