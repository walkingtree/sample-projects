Ext.define("PDFSplitter.view.ReadFile", {
	extend: 'Ext.form.Panel',

	xtype: 'readfile',

	/**
	 * @cfg{String} loadingMessage The text displayed when
	 *              loading the PDF.
	 */
	loadingMessage: 'Loading PDF, please wait...',
	
	itemId: 'uploadid',
	height: 30,
	frame: true,
	
	initComponent: function() {
		var me = this;

		me.items = [
			{
				xtype: 'fileuploadfield',
				style: 'float:right;',
				name: 'filedata',
				regex: /(.)+((\.pdf)?)$/i,
				buttonOnly: true,
				clearOnSubmit: false,
				buttonText: '',
				scope: me,
				buttonConfig: {
					iconCls: 'openfile',
					style: 'float:right;'
				},
				listeners: {
					afterrender: function(view) {
						var tip = Ext.create('Ext.tip.ToolTip', {
							target: view.el,
							html: 'Open File'
						});
						/**
						 * Fires when the underlying file input field's value has changed 
						 * from the user selecting a new file from the system file selection dialog.
						 */
						view.el.on('change', function(evt, selectedfile ) {

							if( selectedfile.value.indexOf('.pdf') != -1){
								me.fireEvent('showloadmask', me.loadingMessage);
								me.fireEvent('readfile', evt);

							} else {
								Ext.MessageBox.show({
									title: 'ERROR',
									msg: 'Please select pdf file',
									buttons: Ext.MessageBox.OK,
									icon: 'x-message-box-error'
								});
								return;
							}


						}, this);
					}
				}

			}];

		this.callParent( arguments );
	}

});
