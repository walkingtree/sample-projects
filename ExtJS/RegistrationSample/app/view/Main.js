Ext.define("extjsExample.view.Main", {
    extend: 'Ext.Container',
    alias: 'widget.mainview',
    renderTo: Ext.getBody(),
	
	width: 500,
	height: 200,
	initComponent : function() {
		var me = this;
		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';
		
		Ext.apply(me, {
			layout: {
				type: 'card',
				activeItem: 1
			},
			items: [{
				xtype: 'container',
				data : [],
				frame: true,
				tpl: '<div class="welcome-css">Welcome, {name}</div>'
			},{
				xtype: 'form',
				frame: true,
				title: 'Registration Form',
				bodyPadding: '10 10 0',
				defaults: {
					anchor: '100%',
					allowBlank: false,
					msgTarget: 'side',
					labelWidth: 120
				},

				items: [{
					xtype: 'textfield',
					name: 'username',
					emptyText: 'Enter User Name / Mail id',
					afterLabelTextTpl: required,
					fieldLabel: 'User Name/Mail Id'
				},{
					xtype: 'textfield',
					name: 'password',
					inputType: 'password',
					afterLabelTextTpl: required,
					emptyText: 'Enter Password',
					fieldLabel: 'Password'
				},{
					xtype: 'textfield',
					name: 'retype-password',
					inputType: 'password',
					afterLabelTextTpl: required,
					emptyText: 'Re-Enter Password',
					fieldLabel: 'Re-Enter Password'
				},{
					xtype: 'combo',
					name: 'server',
					allowBlank : true,
					fieldLabel: 'Server',
					store: Ext.create('extjsExample.store.Server'),
					displayField: 'name',
					editable: false,
					valueField: 'name'
				}],

				buttons: [{
					text: 'Ok',
					handler: function(btn){
					var formFields = this.up('form').getForm().getFields();
						if( formFields ){
							var formValid = false;
							for( var i=0; i< formFields.items.length; i++) {
								
								if( formFields.items[i].name != 'server' ){
								
									if( Ext.isEmpty( formFields.items[i].getValue()) ) {
										
										Ext.Msg.alert('Error!','Some of the required fields are empty.')
										
									}else{
										var pwdField = this.up('form').getForm().findField('password').getValue();
										var retypePwdField = this.up('form').getForm().findField('retype-password').getValue();
										if( retypePwdField != pwdField ){
											Ext.Msg.alert('Passwords donot match!','Please enter Valid password');
										}else {
											formValid = true;
										}
									}
								}
							}
							if( formValid == true ) {
								me.down('container').update({
									name: me.down('form').getForm().findField('username').getValue()
								});
								me.getLayout().setActiveItem(0);
							}
						}
					}
				},{
					text: 'Cancel',
					handler: function() {
						this.up('form').getForm().reset();
					}
				}]
			
			}]
		});
		me.callParent(arguments);
	}

});