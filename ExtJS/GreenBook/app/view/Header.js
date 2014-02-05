Ext.define('PDFSplitter.view.Header', {
    extend: 'Ext.Container',
    xtype : 'pageheader',
    height:65,
    layout:"column",
    frame:true,	
    items: [{xtype:'image',
	     src:'pdf.png',
//	     columnWidth:0.05,
	     height:60,
	     style:{margin:'1px'}
	    },
           {
            xtype: 'component',
	    columnWidth:0.3,
            cls  : 'demo-header',
            html : 'Green Books',
	    style:{padding: '5px',
	    fontSize:"36px",
            fontFamily: 'Century Gothic, Helvetica, sans-serif-webkit-body'
            }
        }
    ]
    
});
