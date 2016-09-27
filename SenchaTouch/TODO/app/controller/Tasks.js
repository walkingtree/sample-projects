Ext.define('TODO.controller.Tasks', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainView: 'mainview',
            addButton: 'mainview #addButton',
            taskFormField: 'formpanel #taskFormField',
            deleteButton: 'formpanel #deleteButton'
        },

        control: {
            "mainview #addButton": {
                tap: 'add'
            },
            "list": {
                itemtouchend: 'edit'
            },
            "formpanel #saveButton": {
                tap: 'save'
            },
            "tasklist": {
                show: 'onTaskListShow'
            },
            "formpanel #deleteButton": {
                tap: 'remove'
            }
        }
    },

    add: function(button, e, eOpts) {
        // Navigate to form
        this.getMainView().push({
            xtype: 'formpanel',
            title: 'Add task'
        });

        this.getAddButton().hide();
        this.getDeleteButton().hide();
    },

    edit: function(dataview, index, target, record, e, eOpts) {
        var mainView = this.getMainView();

        // Navigate to form
        mainView.push({
            xtype: 'formpanel',
            title: 'Edit Task'
        });
        this.getAddButton().hide();
        this.getDeleteButton().show();

        var taskFormField = this.getTaskFormField(),
            fields = taskFormField.getFieldsAsArray();

        Ext.each(fields, function(field) {
            var key = field.getName(),
                value = record.get(key);
            field.setValue(value);
        });

        mainView.setRecord(record);

        this.holdSelect = true;
    },

    save: function(button, e, eOpts) {
        // Build up the model's data
        var fields = this.getTaskFormField().getFieldsAsArray(),
            data = {};
        Ext.each(fields, function(field) {
            var key = field.getName(),
                value = field.getValue();
            data[key] = value;
        });

        // Save the model's data
        var mainView = this.getMainView(),
            record = mainView.getRecord(),
            store = Ext.getStore('Tasks');
        if (record) {
            record.set(data);
            mainView.setRecord(null);
        } else {
            store.add(data);
        }
        store.sort();

        // Navigate back to list
        this.getMainView().pop();
    },

    onTaskListShow: function(component, eOpts) {
        this.getAddButton().show();
    },

    remove: function(button, e, eOpts) {
        var me = this,
            title = 'Delete',
            message = 'Are you sure you want to delete this task?';

        Ext.Msg.confirm(title, message, function(response) {
            if (response == 'yes') {

        		var mainView = me.getMainView(),
        		tasks = Ext.getStore('Tasks'),
        		task = mainView.getRecord();

        		tasks.remove(task);

        		// Navigate back to list
        		mainView.pop();

            }
        });
    }

});