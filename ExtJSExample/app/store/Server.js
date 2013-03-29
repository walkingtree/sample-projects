Ext.define('extjsExample.store.Server', {
	extend : 'Ext.data.Store',
	requires:['extjsExample.model.Server'],
	
	model: 'extjsExample.model.Server',
		storeId : 'server',
		proxy: {
			type: 'ajax',
			url: 'data/server.json',
			reader: {
				type: 'json',
				root: 'data',
			}
		}
});