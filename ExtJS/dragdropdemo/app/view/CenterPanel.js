Ext.define('DragDrop.view.CenterPanel', {
    extend: 'Ext.panel.Panel',    
    xtype: 'centerpanel',
	
	initComponent : function() {
    
		 var me = this;

		 Ext.apply(me,{
			
			items: [{
				html : ''
			}],
			autoDestroy : false,
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
									//var btn = Ext.widget( sourceBtn.xtype,sourceBtn.cloneConfig() );
									//btn.floating = true;
									//btn.shadow = false;
									
									//btn.showAt(e.getXY());
									me.add(sourceBtn);
									dropData.sourceContainer.remove(sourceBtn);
								}
							}
					});
	}
});