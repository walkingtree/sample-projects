Ext.define("PDFSplitter.view.SearchBar", {
	extend: 'Ext.menu.Menu',
	frame:true,
	xtype:'searchbar',
	bodyCls:'serachbar-body',
	isDisplaying : false,
	plain:true,
	initComponent : function() {
		this.items = [{
			xtype:'toolbar',
			layout:'hbox',
			items:[{
				xtype:'fieldcontainer',
				layout:'hbox',
				items:[
				       {
				    	   xtype : 'textfield',
				    	   fieldLabel : 'Find :',
				    	   name:'find',
				    	   labelWidth:50
				       },
				       {
				    	   xtype:'button',
				    	   text:'GO',
				    	   action:'searchpdf',
				    	   hidden:true,
				    	   flex:1
				       }
				       ]

			},{
				xtype:'button',
				itemId: 'prev',
				iconCls: 'findprev',
				tooltip:'Find the previous occurance of the phrase'
			},{
				itemId: 'next',
				xtype:'button',
				iconCls: 'findnext',
				tooltip:'Find the next occurance of the phrase'

			},{
				xtype : 'splitter',
				width : 10
			},{
				xtype :'checkbox',
				boxLabel : 'Highlight all',
				action:'highlightall'
			},{
				xtype : 'splitter',
				width : 15
			},{
				xtype    :'checkbox',
				boxLabel : 'Match Case',
				style:'margin-right:20px;',
				action:'casesensitive'
			}]
		}]
		this.callParent( arguments );
	},
	isHightLighAll:function(){
		return this.down('checkbox[action=highlightall]').getValue();
	},
	isCaseSensitive:function(){
		return this.down('checkbox[action=casesensitive]').getValue();
	}
});
