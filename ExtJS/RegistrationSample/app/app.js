Ext.application({
    controllers: ["Main"],
	
    views: ["Main"],

    name: 'extjsExample',
	launch: function() {
		
		Ext.create('Ext.container.Viewport', {
            items: {
                xtype: 'mainview'
            }
        });
	}
});
