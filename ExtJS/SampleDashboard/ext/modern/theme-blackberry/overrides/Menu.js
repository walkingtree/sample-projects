Ext.define('TouchThemeBlackberry.Menu', {
    override: 'Ext.Menu',
    requires: ['TouchThemeBlackberry.ux.ApplicationMenu', 'TouchThemeBlackberry.ux.ContextMenu'],
    config: {
        ui: 'context',
        layout: {
            pack: 'center'
        }
    }
});