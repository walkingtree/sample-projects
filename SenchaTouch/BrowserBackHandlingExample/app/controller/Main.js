Ext.define('BrowserBackExample.controller.Main',{
		extend: 'Ext.app.Controller',
		config:{
			views:['Main'],
			refs :{
					Main 	: 'main',
					mainCard:'container[name=mainpanelcard]'
				},
				control:{
					
					'wtcbutton' : {
					
						'redirectonbuttontap' : 'handleRedirect'
					}
				},
				routes : {
				
					':nextButtonName': 'showActiveView'
				}
		},
	
	init : function() {
	
		
	  /**
  	   * 	on history change, if there is no token available, then resetting view.
  	   * 
  	   */
	
		this.getApplication().getHistory().on('change', function(event) {
		
				if (!String(window.location.hash).substr(1) ) {

					this.getMainCard().setActiveItem(0);
				}
		      
		},this);
	},
	

	showActiveView : function(functionName) {

		var nextButton = Ext.ComponentQuery.query('button[name='+ functionName + ']');

		if (nextButton.length > 0) {

			nextButton = nextButton[0];

			if (this[functionName]) {

				this[functionName](nextButton);

			}
		}
	},
		
	handleRedirect : function(tappedButton) {

		var buttonName = tappedButton.config.name;

		this.getApplication().redirectTo(buttonName);
		
	},
	switchToNextCard : function(button){
		
		this.getMainCard().setActiveItem(1);
		button.hide(true);
		var previousButton = this.getMainCard().down('button[name=switchToPreviousCard]');
		if( !Ext.isEmpty(previousButton ) ) {
			
			previousButton.show(true);
		}
	},
	switchToPreviousCard : function(button){
		
		this.getMainCard().setActiveItem(0);
		var nextButton = this.getMainCard().down('button[name=switchToNextCard]');
		button.hide(true);
		if( !Ext.isEmpty(nextButton ) ) {
			
			nextButton.show(true);
		}
	}
});