Ext.define('senchaTouchExample.store.Server', {
	extend : 'Ext.data.Store',
	requires:['senchaTouchExample.model.Server'],
	
	config: {
		model: 'senchaTouchExample.model.Server',
		proxy: {
				type: "ajax",
				url : "data/server.json",
				reader: {
					type: "json",
					rootProperty: "data"
				}
		}
	}
});