Ext.define('Ext.rtl.grid.column.Column', {
    override: 'Ext.grid.column.Column',

    isOnLeftEdge: function(e) {
        return (!this.getInherited().rtl !== !Ext.rootInheritedState.rtl) ? // jshint ignore:line
            (this.getX() + this.getWidth() - e.getXY()[0] <= this.handleWidth) :
            this.callParent(arguments);
    },

    isOnRightEdge: function(e) {
        return (!this.getInherited().rtl !== !Ext.rootInheritedState.rtl) ? // jshint ignore:line
            (e.getXY()[0] - this.getX() <= this.handleWidth) : this.callParent(arguments);
    }

});
