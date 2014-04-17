Ext.define('DragDrop.view.SubPanel', {
    extend: 'Ext.panel.Panel',    
    xtype: 'subpanel',
	
	initComponent : function() {
    
		 var me = this;
		me.draggable = true;
		
		 Ext.apply(me,{
				
			draggable : true,
			constrain : true,
			width : 300,
			autoDestroy : false,
			height : 300,
			items : [{
					xtype : 'toolbarapp',
					scale : 'large',
					iconAlign : 'top',
					handleContextMenuForApp : true,
					cls : 'stelmm-button-cls',
					text : 'App 11',
					urlValue : 'resources/images/favorite',
					icon : 'resources/images/favorite'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			}],
			listeners : {
				boxready : function(){
					this.handleAppDrop(this);
				}
			}
			
		});	 
    me.callParent(arguments);
	},
	
	handleAppDrop : function(){
		
		var me = this;
		me.dropTarget = Ext.create('Ext.dd.DropTarget', me.getEl(), {
							ddGroup: 'panelddgroup',
							constrain : true,
							notifyOver : function( source, e, dropData ){
					
								return Ext.dd.DropZone.prototype.dropAllowed; 
							},
							
						   notifyDrop: function (source, e, dropData) {
						   
								var sourceBtn = Ext.getCmp( dropData.sourceEl.id );
								if( sourceBtn ){
									var btn = Ext.widget( sourceBtn.xtype,sourceBtn.cloneConfig() );
									
									btn.floating = true;
									btn.shadow = false;
									btn.draggable = true;
									
									btn.showAt(e.getXY());
								}
							}
					});
	}
});