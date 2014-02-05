Ext.define("Setu.Util", {

	statics: {
		showMask: function() {
			Ext.getBody().mask("Loading...");
		},

		hideMask: function() {
			Ext.getBody().unmask();
		}
	}
});