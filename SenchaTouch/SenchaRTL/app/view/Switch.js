/**
 * 
 */
Ext.define('SenchaRTL.view.Switch', {
	extend : 'Ext.form.Panel',
	xtype	: 'switchpage',
	requires: [
	           'Ext.Img'
	           ],

	           config	:{
	        	   layout:'vbox',
	        	  
	        	   items: [
	        	           {flex:1},
	        	           {height:50,
	        	        	   layout:'hbox',
	        	        	   items:[
	        	        	          
	        	        	          {
	        	        	        	  html:'Tap to switch <B>RTL</B> mode',
	        	        	        	  flex:1,
	        	        	        	  cls:'switchtext'
	        	        	          },
	        	        	          {
	        	        	        	  html:'Tap to swith <B>LTR</B> mode',
	        	        	        	  flex:1,
	        	        	        	  cls:'switchtext'
	        	        	          }
	        	        	          ]},
	        	           
	        	           {  height:40,layout:'hbox',
	        	        	  items:[
	        	                 
	        	                  {
	        	                	  xtype: 'img',
	        	                	  src:'http://flagspot.net/images/e/eg.gif',
	        	                	  flex: 1,
	        	                	  cls:'swithflag',
	        	                	  listeners:{
	                              		tap:function( image, e, eOpts ){
	                              			
	                              			localStorage.setItem("b4e39e88-994e-4393-a6f0-b696f0a35dd2_LANGUAGE_KEY","rtl");
	                              			window.location.reload();
	                              		}
	                              	}
	        	                  },
	        	                  {
	        	                	  xtype: 'img',
	        	                	  src:'http://flagspot.net/images/i/in.gif',
	        	                	  flex: 1,
	        	                	  cls:'swithflag',
	        	                	  listeners:{
	                              		tap:function( image, e, eOpts ){
	                              			
	                              			localStorage.setItem("b4e39e88-994e-4393-a6f0-b696f0a35dd2_LANGUAGE_KEY","ltr");
	                              			window.location.reload();
	                              		}
	                              	}
	        	                  }
	        	                  ]
	        	           },
	        	           {flex:1}

	        	           ]	
	           }
});
