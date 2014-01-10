Ext.define('MVC.view.user.Edit', {
	extend: 'Ext.window.Window',
	alias : 'widget.useredit',
	requires: ['Ext.form.Panel'],
	title : 'Edit User',
	layout: 'fit',
	autoShow: true,
	height: 120,
	width: 280,
	style: 'background-color: #D2B48C',
	bodyStyle: 'background-color: #FFFACD',
	initComponent: function() {
		this.items = [
			{
				xtype: 'form',
				padding: '5 5 5 5',
				border: false,
				items: [
					{
					xtype: 'textfield',
					name : 'name',
					fieldLabel: 'Name'
					},
					{
					xtype: 'textfield',
					name : 'email',
					fieldLabel: 'Email'
					}
				]
			}
		];
	this.buttons = [
		{
		text: 'Save',
		action: 'save',
		icon:'resources/images/save.png',
		},
		{
		text: 'Cancel',
		action: 'cancel',
	    icon:'resources/images/cancel.png',
		}
	];
	this.callParent(arguments);
	}
});


