/**
 * 
 */
Ext.define('SenchaRTL.view.Form', {
	extend : 'Ext.form.Panel',
	xtype	: 'myform',
	
	config	:{
		
		items: [
		        {
		            xtype: 'textfield',
		            name: 'name',
		            label: 'منظمة'
		        },
		        {
		            xtype: 'textfield',
		            name: 'name',
		            label: 'مدينة'
		        }
		       
		    ]	
	}
});
