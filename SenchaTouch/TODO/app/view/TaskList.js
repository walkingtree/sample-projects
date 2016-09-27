Ext.define('TODO.view.TaskList', {
    extend: 'Ext.dataview.List',
    alias: 'widget.tasklist',

    requires: [
        'Ext.XTemplate'
    ],

    config: {
        title: 'Task List',
        store: 'Tasks',
        itemTpl: [
            '<div>',
            '    <tpl if="completed">COMPLETED:</tpl>',
            '    {priority} -',
            '    {description}',
            '    <tpl if="dueDate"> - {dueDate:date}</tpl>',
            '</div>'
        ]
    }

});