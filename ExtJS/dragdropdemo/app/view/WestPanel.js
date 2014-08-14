Ext.define('DragDrop.view.WestPanel', {
    extend: 'Ext.panel.Panel',    
    xtype: 'westpanel',
	
	initComponent : function() {
    
		 var me = this;

		me.defaults = {
			xtype : 'toolbarapp',
			scale : 'large',
			iconAlign : 'top',
			handleContextMenuForApp : true,
			cls : 'stelmm-button-cls'
		};
         me.itemsToAdd = me.itemsToAdd ? me.itemsToAdd : [{
				text : 'App 1',
				badgeCount : 23,
				urlValue : 'resources/images/alerts',
				icon : 'resources/images/alerts'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 2',
				badgeCount : 19,
				urlValue : 'resources/images/chat',
				icon : 'resources/images/chat'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
			
				text : 'App 3',
				urlValue : 'resources/images/audio',
				icon : 'resources/images/audio'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 4',
				action : 'renderFeedbackWindow',
				urlValue : 'resources/images/feedback',
				icon : 'resources/images/feedback'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 5',
				urlValue : 'resources/images/reports',
				icon : 'resources/images/reports'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 6',
				badgeCount : 19,
				urlValue : 'resources/images/calendar',
				icon : 'resources/images/calendar'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
			
				text : 'App 7',
				urlValue : 'resources/images/help',
				icon : 'resources/images/help'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			}
			,{
				text : 'App 8',
				action : 'renderFeedbackWindow',
				urlValue : 'resources/images/editaccount',
				icon : 'resources/images/editaccount'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 9',
				badgeCount : 23,
				urlValue : 'resources/images/search',
				icon : 'resources/images/search'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},{
				text : 'App 10',
				urlValue : 'resources/images/favorite',
				badgeCount : 19,
				icon : 'resources/images/favorite'+'-'+ DragDrop.config.Configuration.DEFAULT_ICON_SIZE +'.png'
			},
			{
				xtype : 'subpanel',
				cls : 'drag-panel-cls',
				title : 'drag me',
				ui : 'default'
			}
			];
				
		 Ext.apply(me,{
			
			items :  me.itemsToAdd,
			autoDestroy : false,
			listeners : {
				boxready : function(){
					this.handleAppsDragDrop(this);
				}
			}
		 });
		 
		 me.callParent(arguments);
	},
	
	handleAppsDragDrop : function(){
		var me = this;
		me.dragZone = new Ext.dd.DragZone(me.getEl(), {
		   ddGroup: 'panelddgroup',
		   
		   getDragData : function(e){
			   
			   me.itemSelector = DragDrop.config.Configuration.DEFAULT_BUTTON_CLS_SELECTOR;
	
			   var sourceEl = e.getTarget(me.itemSelector, 10);
			   if( sourceEl ) {
	
				   var clonedSourceEl = sourceEl.cloneNode(true);
					clonedSourceEl.id = Ext.id();
					
				   return me.dragData = {
						   ddel: clonedSourceEl,     //mandatory
						   sourceEl: sourceEl,
						   repairXY: Ext.fly(sourceEl).getXY(),
						   sourceContainer : me
				   };
				   
			   }else {
				
					return false;
			   }
		   },
		   
		   getRepairXY: function(e) {
								
			   return me.dragData.repairXY;
		   },
		   
		   onDrag: function(){
			
		   },
		   
		   getDragEl: function(){ 
		   
		   var firstItem = me.down('subpanel');
				me.targetContainer = Ext.widget(firstItem.xtype,firstItem.cloneConfig());
				me.targetContainer.render(me.body);
				this.proxy.update( me.targetContainer.getEl().dom.outerHTML );
				
				return Ext.getDom(this.dragElId);
		   }
		});
		
	}
});