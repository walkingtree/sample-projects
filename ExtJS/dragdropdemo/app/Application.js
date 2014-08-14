Ext.define('DragDrop.Application', {
    name: 'DragDrop',

    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
		'DragDrop.view.WestPanel',
		'DragDrop.view.CenterPanel',
		'DragDrop.view.ToolbarApp',
		'DragDrop.view.DragDropBadgeButton',
		'DragDrop.view.SubPanel'
    ],

    controllers: [
        // TODO: add controllers here
    ],

    stores: [
        // TODO: add stores here
    ]
});
