// Touch
Ext.define('Ext.overrides.app.Application', {
    override: 'Ext.app.Application',
    requires: ['Ext.viewport.Viewport'],

    initMainView: function() {
        var me = this,
            mainView;

        this.callParent();

        mainView = me.getMainView();

        Ext.Viewport = me.viewport = new Ext.viewport.Viewport(me.config.viewport);

        if (mainView) {
            Ext.Viewport.add(mainView);
        }
    }
});