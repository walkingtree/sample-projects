Ext.define("PDFSplitter.view.SplitDetailsPanel", {
	extend: 'Ext.form.Panel',

	xtype : 'splitdetailspanel',
	border : false,
	frame : true,
	isEditable : this.isEditable,
	defaults : {
		labelWidth : 150,
		anchor:'100%'
	},

	initComponent : function( ){
		var me = this;
		var required = '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>';

		me.items = [{
			xtype      : 'textfield',
			fieldLabel : PDFSPLITTER.PAGE_NUMBERS,
			itemId     : 'pages',
			readOnly   : me.isEditable,
			allowBlank : false,
			afterLabelTextTpl: required

		},{
			xtype      : 'textfield',
			fieldLabel : PDFSPLITTER.DOCUMENT_NAME,
			itemId     : 'documentName',
			allowBlank : false,
			afterLabelTextTpl: required

		},{
			xtype      : 'documentcategory',
			fieldLabel : PDFSPLITTER.DOCUMENT_CATEGORY,
			itemId     : 'documentCategory',
			allowBlank : false,
			editable : false,
			afterLabelTextTpl: required

		},{
			xtype      : 'documenttype',
			fieldLabel : PDFSPLITTER.DOCUMENT_TYPE,
			itemId     : 'documentType',
			allowBlank : false,
			editable : false,
			afterLabelTextTpl: required

		},
		{
			xtype      : 'textfield',
			fieldLabel : PDFSPLITTER.LOAN_NUMBER,
			itemId     : 'loannumber',
			allowBlank : false,
			tooltip : 'Please Enter Loan Number',
			afterLabelTextTpl: required

		},{
			xtype      : 'textfield',
			fieldLabel : PDFSPLITTER.STHREE_BUCKET_NAME,
			itemId     : 'sThreeBucketName',
			allowBlank : false,
			tooltip : 'Please Enter Amazon S3 Bucket Name ',
			afterLabelTextTpl: required

		}];

		me.buttons = [{
			xtype:'button',
			text: PDFSPLITTER.OK,
			handler : function( btn ){
				if(this.up('form').getForm().isValid()){
					me.fireEvent('savedocument', me );
				}
			}
		}];
		this.callParent( arguments );
	}

});