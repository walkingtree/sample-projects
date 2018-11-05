Ext.define('MyApp.model.User', {
 	extend: 'Ext.data.Model',
 	fields: [{
 		name: 'userId'
 	},{
 		name: 'userName'
 		
 	},{
 		name: 'email'
 		
 	}, {
 		name: 'password'
 		
 	},{
 		name: 'createdOn'
 
 	}],
 	proxy: {
 		type: 'ajax',
 		url: 'resources/data/Users.json',
 		reader: {
 			type: 'json',
 			rootProperty: 'users'
 		}
 	}
 });