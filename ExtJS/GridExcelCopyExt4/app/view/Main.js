Ext.define("GridExcelCopy.view.Main", {
    extend: 'Ext.Container',
    xtype : 'mainview',
    
    initComponent : function() {
	var me = this;
	
	var gRow = -1;
	
	Ext.define('Country',{
		 extend: 'Ext.data.Model',
		 fields: [
		    {name: 'id'},
		    {name: 'continent', type: 'string'},
		    {name: 'countryName', type: 'string'},
		    {name: 'capital', type: 'string'},
		    {name: 'countryCode', type: 'string'},
		    {name: 'area', type: 'string'},
		    {name: 'population', type: 'string'},
		    {name: 'gdp', type: 'string'},
		    {name: 'government', type: 'string'},
		    {name: 'id', type: 'string'},
		    {name: 'version', type: 'string'}
		 ]
		});
	
	var countryStore = Ext.create('Ext.data.Store', {
		 storeId:'simpsonsStore',
		 autoLoad : true,
		 model : 'Country',
		    proxy: {

		     type: 'ajax',
		     url: 'data/country.json',
		     reader: {
		        type: 'json',
		        idProperty: 'id',
		        root: 'data',
		        totalProperty: 'total'
		     }
		    },
		    listeners: {
		    
		      load: function(store,records) {
		           
		    	  var rowRec =  Ext.create('Country',{});
			  	  this.add(rowRec);
			  	  me.storeInitialCount = records.length;
		      }
		    }
		 });
	
	Ext.apply(me, {
	items:[{
		
	    xtype: 'gridpanel',
	    layout : 'fit',
	    height: 650,
	    forceFit : true,
	    title: 'Grid-to-excel and excel-to-grid copy-paste in ExtJS 4.x',
	    xtype : 'grid',
	    id: 'grid-pnl',
	    store: countryStore,
	    layout : 'fit',
	    multiSelect : true,
	    columns: [
	        { text: 'continent',  dataIndex: 'continent' },
	        { text: 'countryName', dataIndex: 'countryName'},
	        { text: 'capital', dataIndex: 'capital' },
	        { text: 'countryCode', dataIndex: 'countryCode' },
	        { text: 'area', dataIndex: 'area' },
	        { text: 'population', dataIndex: 'population' },
	        { text: 'gdp', dataIndex: 'gdp' },
	        { text: 'government', dataIndex: 'government' },
	        { text: 'version', dataIndex: 'version' },
	       	        
	    ],
	    listeners: {
	    	
	    	cellclick: function(grid, td, cellIndex,record,tr,rowIndex) {
	    		gRow = rowIndex;
	    	},
	    		
    		viewready: function( grid ) {
    			var map = new Ext.KeyMap(grid.getEl(), 
	    			[{
		    			key: "c",
		    			ctrl:true,
		    			fn: function(keyCode, e) {
		    				
			    			var recs = grid.getSelectionModel().getSelection();
			    			
			    			if (recs && recs.length != 0) {
			    				
				    			var clipText = grid.getCsvDataFromRecs(recs);
				    			
				    			var ta = document.createElement('textarea');
				    			
				    			ta.id = 'cliparea';
				    			ta.style.position = 'absolute';
				    			ta.style.left = '-1000px';
				    			ta.style.top = '-1000px';
				    			ta.value = clipText;
				    			document.body.appendChild(ta);
				    			document.designMode = 'off';
				    			
				    			ta.focus();
				    			ta.select();
				    			
				    			setTimeout(function(){
				    			
				    					document.body.removeChild(ta);
			
				    			}, 100);
			    			}
		    			}
	    			},
	    			{
    				
	    			key: "v",
	    			ctrl:true,
	    			fn: function() {
	    				
		    			var ta = document.createElement('textarea');
		    			ta.id = 'cliparea';
		    			
		    			ta.style.position = 'absolute';
		    			ta.style.left = '-1000px';
		    			ta.style.top = '-1000px';
		    			ta.value = '';
		    			
		    			document.body.appendChild(ta);
		    			document.designMode = 'off';
		    			
		    			setTimeout(function(){
		    				
		    				Ext.getCmp('grid-pnl').getRecsFromCsv(grid, ta);
		    			}, 100);
		    			
		    			ta.focus();
		    			ta.select();
		    		}
    			}]);

    		}
	    		
	    },
	    
	    
	    getCsvDataFromRecs: function(records) {

	    	var clipText = '';

	    	var currRow = countryStore.find('id',records[0].data.id);

	    	for (var i=0; i<records.length; i++) {
	    	
		    	var index = countryStore.find('id',records[i].data.id);
		    	
		    	var r = index;
		    	
		    	var rec = records[i];
		    	var cv = this.initialConfig.columns;
		    	
			    	for(var j=0; j < cv.length;j++) {
			    		
			    		
				    		var val = rec.data[cv[j].dataIndex];
				    		
				    		if (r === currRow) {
				    			
				    				clipText = clipText.concat(val,"\t");
				    			
				    		} else {
				    			
				    			currRow = r;
				    			
				    			clipText = clipText.concat("\n", val, "\t");
				    			
				    		}
			    	}
	
		    	}
	
		    	return clipText;

	    },

    	getRecsFromCsv: function(grid, ta) {

	    	document.body.removeChild(ta);

	    	var del = '';

	    	if (ta.value.indexOf("\r\n")) {

	    		del = "\r\n";

	    	} else if (ta.value.indexOf("\n")) {

	    		del = "\n"

	    	}

	    	var rows = ta.value.split("\n");

	    	for (var i=0; i<rows.length; i++) {

		    	var cols = rows[i].split("\t");
	
		    	var columns = grid.initialConfig.columns;
	
		    	if (cols.length > columns.length)
	
		    		cols = cols.slice(0, columns.length-1)
	
		    	if (gRow === -1 ) {
	
		    		Ext.Msg.alert('Select a cell before pasting and try again!');
	
		    		return;
	
		    	}
	
		    	var cfg = {};
	
		    	var tmpRec = countryStore.getAt(gRow);
	
		    	var existing = false;
	
		    	if ( tmpRec ) {
	
			    	cfg = tmpRec.data;
		
			    	existing = true;
	
		    	}
	
		    	var l = cols.length;
		    	
		    	if ( cols.length > columns.length )
	
		    		l = columns.length;
	
		    	for (var j=0; j<l; j++) {
	
			    	if (cols[j] === "") {
		
			    		return;
		
			    	}
			    	
			    	cfg[columns[j].dataIndex] = cols[j];
		    	}

		    	me.storeInitialCount++;
		    	
		    	cfg['id'] = me.storeInitialCount;
	
		    	var tmpRow = gRow;
	
		    	grid.getSelectionModel().clearSelections(true);
	
		    	var tmpRec = Ext.create('Country',cfg);
	
		    	if (existing)
	
		    	countryStore.removeAt(tmpRow);
	
		    	countryStore.insert(tmpRow, tmpRec);
	
		    	gRow = ++tmpRow;
	
	    	}

	    	if (gRow === countryStore.getCount()) {

		    	var RowRec = Ext.create('Country',{});
	
		    	countryStore.add(RowRec);

	    	}

	    	gRow = 0;

	    }

		}]
	});

	me.callParent(arguments);
    }
});
