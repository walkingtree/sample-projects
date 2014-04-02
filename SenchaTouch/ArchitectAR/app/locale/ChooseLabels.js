
Ext.define('AR.locale.ChooseLabels',{
	extend:'Ext.Base',
	singleton: true,
	
	requires:['AR.model.Setting','AR.store.Setting'], 
	
	loadlabels:function(){
 
var settinglocalstore= Ext.data.StoreManager.lookup('settingStore');

if(settinglocalstore.getCount() >= 1) { 
      
settinglocalstore.load();
var datasettings=settinglocalstore.getData().all[0].data;
 
 
   
this.loadJsFile(datasettings.language); 
   
if(!this.getQueryVariable('platform')){
   
 this.loadCssFile(datasettings.theme); 
  
       }else{
    
var p=this.getQueryVariable('platform');
      
if(p.toLowerCase()=="desktop"){
  
	this.loadCssFile('app');

}else{
this.loadCssFile(this.findtheme());  
   } 
 
   
 }

}else{
 
this.loadJsFile('en'); 

if(!this.getQueryVariable('platform')){

			if(Ext.os.deviceType=="Desktop"){
 this.loadCssFile('app');
}else{
				
this.loadCssFile(this.findtheme());		

			}
  
    

}else{
   
var p=this.getQueryVariable('platform');

if(p.toLowerCase()=="desktop" || Ext.os.deviceType == "Desktop"){
	
	this.loadCssFile('app');
   
}else{
   
this.loadCssFile(this.findtheme());
     
 }

		
 
  }
    
 }	
	
Ext.require(['AR.model.Setting','AR.store.Setting','AR.util.Utility']);
         //Ext.require(['AR.model.Setting','AR.store.Setting','AR.util.Utility','Wtc.tux.navigation.Bar']);

	},
	
	loadJsFile:function(fn){

if(Ext.isEmpty(fn)){
fn='en';
   }

		//~ var fileReference = document.createElement('script');
		//~ fileReference.setAttribute("type", "text/javascript");
//~ document.getElementsByTagName("head")[0].appendChild(fileReference);

Ext.Ajax.request({
			url: 'resources/data/'+fn+'_labels.js',
			method: 'POST',
			success: function(response){
				Ext.globalEval(response.responseText);
			},
			failure: function(response){
	window.location.reload();
			},
			scope: this,
			async: false
});
   
  
     },
     loadCssFile:function(fn){
if(Ext.isEmpty(fn)){
fn='app';
   }
		var fileReference = document.createElement('link');
		fileReference.setAttribute("rel", "stylesheet");
		fileReference.setAttribute("href", 'resources/css/'+fn+'.css');
      //  document.getElementsByTagName("head")[0].appendChild(fileReference);
 
     },
	
	getQueryVariable : function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false;
   },
   findtheme:function(){
var themefilename="app";
 
   
     if(Ext.os.deviceType=="Desktop") {

themefilename="app";

}

if(Ext.os.deviceType=="Phone") {
 
if(Ext.os.name=="Android"){
   
	themefilename='mountainview';
   
   }
if(Ext.os.name=="ios"){

	themefilename= 'Cupertino';
   
   }

 }

if(Ext.os.deviceType=="Tablet") {

if(Ext.os.name=="Android"){
   
themefilename='mountainview';
  
 }
if(Ext.os.name=="ios"){
   
themefilename= 'Cupertino';
    
 }
   
 }

   return themefilename;
   },
    removecssfiles:function(){
       
        var linkres=document.getElementsByTagName('link');
         linkres[0].parentNode.removeChild(linkres[0]);
       /* for(i=0;i<linkres.length;i++){
            
          
            linkres[i].parentNode.removeChild(linkres[i]);
            
        }*/ 
    }

	
	
	
	},function(){ this.loadlabels();});
