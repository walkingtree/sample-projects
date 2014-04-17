Ext.define('DragDrop.view.DragDropBadgeButton',{
	extend:'Ext.button.Button',
	alias:'widget.dragdropbadgebutton',
	
	config:{
		badgeText:null, 
		allowedScales : ['mini','small','medium','large','extralarge'],
		allowedScaleSizes : ['16x16','24x24','32x32','48x48','64x64'],
		renderTpl: [
		        '<span id="{id}-btnWrap" class="{baseCls}-wrap',
		            '<tpl if="splitCls"> {splitCls}</tpl>',
		            '{childElCls}" unselectable="on">',
			'</span>',
					'<div class="btn-text-alignment">',
		            '<span id="{id}-btnEl" class="{baseCls}-button">',
		                '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
		                    '{childElCls}" unselectable="on">',
		                	'<tpl if="disabled"> disabled="disabled"</tpl>',
				//'{text}',
				'{[values.text.length>12 ? (values.text.substr(0, 12))+"..." : values.text]}',
		                '</span>',
		                '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
		                    '{childElCls} {glyphCls}" unselectable="on" style="',
		                    '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
		                    '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
		                    '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
		                '</span>',
					'</div>',
					'<div class="badge-text-alignment">',
				      '<span id="{id}-btnPointerEl" class="{pointerCls}" ></span>',
		                      '<span id="{id}-btnbadge" class="{badgeTextCls} " reference= "badgeElement">{badgeText}</span>',
					'</div>',
				//BadgeText 
		              	//'<tpl if="badgeText"> <span id="{id}-btnbadge" class="{baseCls}-badgeCls" reference= "badgeElement",> {badgeText}</span></tpl>', 
		            '</span>',
		        
		        // if "closable" (tab) add a close element icon
		        '<tpl if="closable">',
		            '<span id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" tabIndex="0"></span>',
		        '</tpl>'
		    ]
},
childEls:[
	      'btnWrap', 'btnbadge','btnInnerEl','btnPointerEl'
	       ],
	constructor:function( config ){

		var me = this;
		Ext.apply(me,config);
		me.callParent( arguments );
	},
	

 /**
     * This method returns an object which provides substitution parameters for the {@link #renderTpl XTemplate} used to
     * create this Button's DOM structure.
     *
     * Instances or subclasses which use a different Template to create a different DOM structure may need to provide
     * their own implementation of this method.
     * @protected
     *
     * @return {Object} Substitution data for a Template. The default implementation which provides data for the default
     * {@link #template} returns an Object containing the following properties:
     * @return {String} return.innerCls A CSS class to apply to the button's text element.
     * @return {String} return.splitCls A CSS class to determine the presence and position of an arrow icon.
     * (`'x-btn-arrow'` or `'x-btn-arrow-bottom'` or `''`)
     * @return {String} return.iconUrl The url for the button icon.
     * @return {String} return.iconCls The CSS class for the button icon.
     * @return {String} return.glyph The glyph to use as the button icon.
     * @return {String} return.glyphCls The CSS class to use for the glyph element.
     * @return {String} return.glyphFontFamily The CSS font-family to use for the glyph element.
     * @return {String} return.text The {@link #text} to display ion the Button.
     */
    getTemplateArgs: function() {
        var me = this,
            glyph = me.glyph,
            glyphFontFamily = Ext._glyphFontFamily,
            glyphParts;

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1];
        }

        return {
            innerCls : me.getInnerCls(),
            splitCls : me.getSplitCls(),
            iconUrl  : me.icon,
            iconCls  : me.iconCls,
	    href     : me.getHref(),
            disabled : me.disabled,
            hrefTarget: me.hrefTarget,
	    badgeTextCls :me.baseCls+'-badgeCls' +'   ' + ( (Ext.isEmpty( me.badgeText ) || me.badgeText ==0 ) ? 'hide-badge' :' ') ,
	    pointerCls : ( (Ext.isEmpty( me.badgeText ) || me.badgeText ==0 ) ? '' :'x-btn-pointerCls ') ,
            type     : me.type,
            badgeText:me.badgeText ||  undefined,
            tabIndex : me.tabIndex,
            glyph: glyph,
            glyphCls: glyph ? me.glyphCls : '', 
            glyphFontFamily: glyphFontFamily,
            text     : me.text || '&#160;'
        };
    },
    	

	setBadgeText : function(text) {
		
		var me = this;

		if (Ext.isEmpty(text) || text == 0) {

			text = undefined;

			me.btnbadge.addCls('hide-badge');
			me.btnPointerEl.removeCls('x-btn-pointerCls');
		} else {
			me.btnPointerEl.addCls('x-btn-pointerCls');
			me.btnbadge.removeCls('hide-badge');
		}
		me.badgeText = text;
		if (me.rendered) {
			me.btnbadge.update(text);
		}
		return me;
	},
	/**
	*	
	*	Overriding default on mouse up functionality for button. Checking for existance of button element.
	*	if it exists, then only calling further.
	*
	*/
	
	onMouseUp: function(e) {
		var me = this;
		if (e.button === 0) {
			
				if ( !me.pressed && me.el ) {
		        me.removeClsWithUI(me.pressedCls);
		    }
			
		}
	}
});
