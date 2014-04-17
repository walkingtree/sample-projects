/**
 *	Toolbar panel contains the north view of application, which will have menu items , stelmm logo and search field.
 *
 */

Ext.define("DragDrop.view.ToolbarApp", {
	extend: 'DragDrop.view.DragDropBadgeButton',
	alias: 'widget.toolbarapp',

	initComponent: function() {

		var me = this;
		
		me.cls = 'stelmm-button-cls';

		Ext.apply(me, {
			badgeText: me.badgeCount,
			icon: me.icon,
			scale: me.scale,
			split: false,
			margin : 10,
			arrowCls: 'split',
			ui: me.ui,
			pressedCls: 'highlighttext-cls',
			iconCls: me.iconCls ? me.iconCls : 'appbutton-icon-cls',
			iconAlign: me.iconAlign,
			cls: me.cls
		});

		me.callParent(arguments);
	}
});