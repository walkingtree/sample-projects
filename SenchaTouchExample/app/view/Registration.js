Ext.define('senchaTouchExample.view.Registration', {
    extend: 'Ext.Container',
	requires: [
        'Ext.form.Panel',
		'Ext.form.FieldSet',
		'Ext.field.Password',
		'Ext.field.Select',
		'senchaTouchExample.store.Server',
    ],
    xtype: 'main',
		
		config: {
			layout:'card',
			activeItem: 0,
			items:[{
			xtype: 'formpanel',
			scrollable: true,
				items : [{
					xtype : 'fieldset',
					title: 'Registration Form',
					defaults : {
						xtype : 'textfield',
						labelWidth : '35%'
					},
					items : [ {
						xtype : 'textfield',
						name : 'username',
						label : 'User Name/Email Id',
						placeHolder : 'Enter User Name/Email Id',
						required : true
					},{
						xtype : 'passwordfield',
						name : 'PassWord',
						label : 'Password',
						placeHolder : 'Enter Password',
						required : true
					}, {
						xtype : 'passwordfield',
						name : 'ConfirmPassword',
						placeHolder : 'Re-Enter Password',
						label : 'Re Enter Password',
						required : true
					}, {
						xtype: 'selectfield',
						name : 'servercombo',
						label: 'Server',
						displayField: 'name',
						valueField: 'name',
						store : Ext.create("senchaTouchExample.store.Server", {			autoLoad: true
								})
					},{
						xtype : 'button',
						margin : 10,
						ui : 'confirm',
						name : 'saveButton',
						text : 'Ok',
						listeners: {
							
							/**
							 * 	when user tap the sign up button, checking weather fields entered or not
							 *  if user enter the values checking for the validation. If either of the condition
							 *  fails it shows alert to the user
							 *   
							 * 	@param button	Sign In button
							 * 	@param e		Event target
							 */
							
							tap	 : function( button,e ){
								var me = this.up('formpanel');
								var fields = me.getFields();
								var pwd = fields.PassWord.getValue();
								var confirmPwd = fields.ConfirmPassword.getValue();
								var validationErrors = false;
								
								Ext.Object.each( fields, function( fieldName, field, myself ) {
									
									if( Ext.isEmpty( field.getValue() ) && fieldName != "servercombo" ) {
										
										validationErrors = true;
										Ext.Msg.alert( 'Error!','One or more required fileds are empty' );
										return false;
										
									}
									if( fieldName == "PassWord" ) {
										
											if( !Ext.isEmpty( pwd ) && !Ext.isEmpty( confirmPwd ) ) {
											
												if( pwd != confirmPwd ) {
													
													validationErrors = true;
													Ext.Msg.alert('Passwords donot match!','Please enter Valid password');
													fields.PassWord.reset();
													fields.ConfirmPassword.reset();
													return false;
													
												}
											}
									}
								},this);
								
								if( !validationErrors ) {
									var welcomeContainer = Ext.ComponentQuery.query('container[name=welcome-container]')[0];
									
									if( welcomeContainer ) {
										
										welcomeContainer.setData({
											name : fields.username.getValue()
										})
									}
									this.up('main').setActiveItem(1);
								}

							}
						
						}
					},{
						xtype: 'button',
						text: 'Cancel',
						name : 'cancelButton',
						margin : 10,
						ui    : 'decline',
						handler: function(){
						
							this.up('formpanel').reset();
						}
					}]
				}]
			},{
				xtype: 'container',
				name : 'welcome-container',
				data: [],
				tpl: '<div class="welcome-css">Welcome, {name}</div>'
			}]
	}
});
