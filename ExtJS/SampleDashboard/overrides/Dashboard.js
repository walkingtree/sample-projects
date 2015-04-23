/**
 * Created by ajitkumar on 22/04/15.
 */

Ext.define('Ext.overrides.dashboard.Dashboard', {
    override: 'Ext.dashboard.Dashboard',

    getPart: function (type) {
        var parts = this.getParts();
        return parts.findBy(function(item, key) {
            console.log('KEY: ' + key);
            if (key === type) {
                if (item.getId() === key) {
                    return item;
                }
            }
        });
    }
});
