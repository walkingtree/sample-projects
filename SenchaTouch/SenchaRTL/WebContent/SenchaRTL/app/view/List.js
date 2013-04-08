/**
 * 
 */
Ext.define('SenchaRTL.view.List', {
	extend : 'Ext.dataview.List',
	xtype	: 'employeelist',
	config	:{
		
		itemTpl :  new Ext.XTemplate(
    	    '<tpl for=".">',
    		'<div>',
    		  '<img class="profileimg" src="{profileurl}" />',
    		  '<span class="profilename">{name}</span>',
    		'</div>',
    	    '</tpl>'
    	),
		 data: [
		        { name: 'أجيت كومار',profileurl:'https://graph.facebook.com/555288006/picture?type=large&date_format=U' },
		        { name: 'ألوك رانجان',profileurl:'https://graph.facebook.com/548457439/picture?type=large&date_format=U' },
		        { name: 'براديب افينا',profileurl:'https://graph.facebook.com/672551577/picture?type=large&date_format=U' },
		        { name: 'سومان',profileurl:'https://graph.facebook.com/100000543806173/picture?type=large&date_format=U' }
		    ]
		   
		
	}
});

