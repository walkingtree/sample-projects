Ext.define("PDFSplitter.view.PagingToolbar", {
	extend: 'Ext.toolbar.Toolbar',

	xtype: 'pagingtoolbar',

	itemId: 'pagingToolbar',
	/**
	 * @cfg{String} beforePageText
	 * The text displayed before the input item.
	 */
	beforePageText: 'Page: ',
	layout:'column',

	/**
	 * @cfg{String} afterPageText
	 * Customizable piece of the default paging text. Note that this string is formatted using
	 *{0} as a token that is replaced by the number of total pages. This token should be preserved when overriding this
	 * string if showing the total page count is desired.
	 */
	afterPageText: 'of {0}',
	/**
	 * @cfg{String} prevText
	 * The quicktip text displayed for the previous page button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	prevText: 'Previous Page',

	/**
	 * @cfg{String} nextText
	 * The quicktip text displayed for the next page button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	nextText: 'Next Page',

	/**
	 * @cfg{Number} inputItemWidth
	 * The width in pixels of the input field used to display and change the current page number.
	 */
	inputItemWidth: 30,

	/**
	 * @cfg{Number} inputItemWidth
	 * The width in pixels of the combobox used to change display scale of the PDF.
	 */
	scaleWidth: 60,

	/**
	 * @cfg{String} toggleText
	 * The quicktip text displayed for the toggleSideBar button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	toggleText: 'Toggle Sidebar',

	/**
	 * @cfg{String} findText
	 * The quicktip text displayed for the toggleSideBar button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	findText: 'Find In Document',

	/**
	 * @cfg{String} zoomOutText
	 * The quicktip text displayed for the zoomOut button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	zoomOutText: 'Zoom Out',

	/**
	 * @cfg{String} zoomInText
	 * The quicktip text displayed for the zoomIn button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	zoomInText: 'Zoom In',

	/**
	 * @cfg{String} presentationText
	 * The quicktip text displayed for the presentationMode button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	presentationText: 'Switch To Presentation Mode',

	/**
	 * @cfg{String} openFileText
	 * The quicktip text displayed for the openFile button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	openFileText: 'Open File',

	/**
	 * @cfg{String} zoomText
	 * The quicktip text displayed for the scalecombo button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	zoomText: 'Zoom',

	/**
	 * @cfg{String} editableText
	 * The quicktip text displayed for the editable button.
	 * **Note**: quick tips must be initialized for the quicktip to show.
	 */
	editableText: 'Split Document',

	showSplitIcon : this.showSplitIcon,

	initComponent: function() {

		var me = this;
		me.items = [{
			itemId: 'toggleSideBar',
			tooltip: me.toggleText,
			overflowText: me.toggleText,
			iconCls: 'sidebarToggle',
			handler: me.toggleSideBar,
			scope: me

		},/*{
			itemId: 'editableField',
			tooltip: me.editableText,
			overflowText: me.editableText,
			iconCls: 'editable',
			handler: me.changeFieldMode,
			hidden : !this.showSplitIcon,
			scope: me

		}*/,{
			xtype:'splitter',
			width:'3%'
		},{
			itemId: 'findBar',
			tooltip: me.findText,
			overflowText: me.findText,
			iconCls: 'search',
//			width: 25,
			handler:  me.findBar,
			scope: me

		},{
			itemId: 'prev',
			tooltip: me.prevText,
			overflowText: me.prevText,
			iconCls: 'prev',
			handler: me.movePrevious, 
			scope: me

		}, '-', {
			itemId: 'next',
			tooltip: me.nextText,
			overflowText: me.nextText,
			iconCls: 'next',
			handler:  me.moveNext,
			scope: me

		}, 
		me.beforePageText, {
			xtype: 'numberfield',
			itemId: 'inputItem',
			name: 'inputItem',
			cls: Ext.baseCSSPrefix + 'tbar-page-number',
			fieldCls: 'rightalign',
			allowDecimals: false,
			minValue: 1,
			width: 60,
			hideTrigger: true,
			enableKeyEvents: true,
			keyNavEnabled: false,
			selectOnFocus: true,
			submitValue: false,
			// mark it as not a field so the form will not catch it when getting fields
			isFormField: false,
			scope: me,
			//			width: me.inputItemWidth,
			margins: '-1 2 3 2',
			listeners: {
				scope: me,
				/**
				 * Focus should change to the entered page number after clicking on enter.
				 * Calling the method which will change the focus on click of Enter key
				 */
				specialkey: function(view, e) {
					if (e.getKey() == e.ENTER) {

						me.changePageNumber(view, view.value, view.oldValue);
					}
				}
			}
		}, {
			xtype: 'tbtext',
			itemId: 'afterTextItem',
			text: Ext.String.format(me.afterPageText, 0),
			margins: '0 5 0 0'
		}, {
			xtype: 'splitter',
			width: '20%'
		}, {
			itemId: 'zoomOut',
			tooltip: me.zoomOutText,
			overflowText: me.zoomOutText,
			iconCls: 'zoomout',
			handler: me.zoomOut,
			scope: me
		}, '-', {
			itemId: 'zoomIn',
			tooltip: me.zoomInText,
			overflowText: me.zoomInText,
			iconCls: 'zoomin',
			handler: me.zoomIn,
			scope: me
		}, {
			itemId: 'scaleCombo',
			xtype: 'combobox',
			editable: false,
			keyNavEnabled: true,
			selectOnFocus: false,
			submitValue: false,
			// mark it as not a field so the form will not catch it when getting fields
			autoSelect: true,
			width: 120,
			store: new Ext.data.SimpleStore({
				id: 0,
				fields: ['scale', 'text'],
				data: [[0.9, 'Automatic Zoom'], [1, 'Actual Size'], [0.56, 'Page Fit'], [1.6, 'Page Width'], [0.5, '50%'], [0.75, '75%'], [1, '100%'], [1.25, '125%'], [1.5, '150%'], [2, '200%']
				       ]
			}),
			valueField: 'scale',
			displayField: 'text',
			mode: 'local',
			isFirstLoading: false,
			listeners: {
				scope: me,
				afterrender: function(view) {
					var tip = Ext.create('Ext.tip.ToolTip', {
						target: view.el,
						html: 'Zoom'
					});
				},
				select: function(view, newValue, oldValue) {
					var me = this;
					this.scaleValue = undefined;
					this.fireEvent('changescale', view, newValue, me);

				}
			}
		},
		{
			xtype: 'tbfill'
		},
		{
			itemId: 'presentationMode',
			tooltip: me.presentationText,
			overflowText: me.presentationText,
			iconCls: 'presentationmode',
			handler: me.presentationMode,
			style:'float: right;',
			scope: me

		}
		];
		this.callParent(arguments);
	},

	/**
	 * This method will be called when the user clicks on togglesidebar icon
	 */
	toggleSideBar: function() {
		this.fireEvent('togglesidebar');

	},

	/**
	 * This method will be called when the user clicks on presentationmode icon
	 */
	presentationMode: function() {
		var me = this;
		this.fireEvent('changemode', me);

	},

	zoomIn: function() {
		var me = this;
		this.fireEvent('zoomin', me);

	},

	zoomOut: function() {
		var me = this;
		this.fireEvent('zoomout', me);

	},
	findBar: function (btn, e) {
		this.fireEvent('searchtext', btn, e);

	},
	changeFieldMode : function( btn ){
		var editable = false;
		this.fireEvent('showsplitwindow', this, editable);
	},

	/**
	 * This method will be called when the user clicks on move
	 * next button
	 */
	moveNext: function () {
		var me = this;
		me.fireEvent('movetonextpage', me );

	},

	/**
	 * This method will be called when the user clicks on move
	 * previous button
	 */
	movePrevious: function () {
		var me = this;
		me.fireEvent('movetopreviouspage', me );

	},

	/**
	 * Fires when the value of a field is changed via the
	 * setValue method.
	 * 
	 * @param view --
	 *            Ext.form.field.Field
	 * @param newValue --
	 *            The new value
	 * @param oldValue --
	 *            The original value
	 */
	changePageNumber: function (view, newValue, oldValue) {
		var me;
		var toolbar;

		me = this;
		me.fireEvent('changepagenumber', view, view.value, view.scope.oldValue, me)

	}

});
