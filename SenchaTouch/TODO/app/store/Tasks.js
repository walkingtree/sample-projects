Ext.define('TODO.store.Tasks', {
    extend: 'Ext.data.Store',

    requires: [
        'TODO.model.Task',
        'Ext.util.Sorter'
    ],

    config: {
        data: [
            {
                description: 'Sing a song',
                priority: 'Low',
                dueDate: '1/10/2013'
            },
            {
                description: 'Give every Sencha employee $1000',
                priority: 'High',
                dueDate: '2/01/2013'
            },
            {
                description: 'Save the world',
                priority: 'High',
                dueDate: '3/12/2013'
            },
            {
                description: 'Start composting',
                priority: 'Normal',
                dueDate: '4/24/2013'
            },
            {
                description: 'Make a convincing Mona Lisa fake',
                priority: 'Low',
                dueDate: null
            }
        ],
        model: 'TODO.model.Task',
        storeId: 'Tasks',
        sorters: {
            sorterFn: function(first, second) {
                // Completed goes last
                if (first.get('completed') && !second.get('completed')) {
                    return 1;
                } else if (!first.get('completed') && second.get('completed')) {
                    return -1;
                }

                // And then date
                if (first.get('dueDate') && !second.get('dueDate')) {
                    return -1;
                } else if (!first.get('dueDate') && second.get('dueDate')) {
                    return 1;
                }
                return (first.get('dueDate') > second.get('dueDate') ? 1 : -1);
            }
        }
    }
});