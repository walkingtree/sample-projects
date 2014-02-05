Ext.require("Setu.Util");

Ext.define('Setu.Ajax', {

	statics: {
		init: function() {
			Ext.Ajax.on("beforerequest", Setu.Util.showMask);
			Ext.Ajax.on("requestcomplete", Setu.Util.hideMask);
			Ext.Ajax.on("requestexception(", Setu.Util.hideMask);			
		}
	}
	
});