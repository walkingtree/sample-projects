Ext.define('wtc.ux.Button',{
	extend:'Ext.Button',
	alias:'widget.wtcbutton',

	initConfig:function( config ){

		Ext.apply( this.initialConfig,{
			listeners: {
					tap: function() {
						
						if( this.config.name ) {
							
							this.fireEvent('redirectonbuttontap',this);
						}
					}
			}
		});
		this.callParent( arguments );
	},
	initialize: function() {
		this.callParent(arguments);
	}
});