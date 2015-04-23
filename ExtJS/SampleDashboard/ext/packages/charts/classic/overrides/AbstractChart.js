/**
 * @class Ext.chart.overrides.AbstractChart
 */
Ext.define('Ext.chart.overrides.AbstractChart', {
    override: 'Ext.chart.AbstractChart',

    updateLegend: function (legend, oldLegend) {
        var dock;
        this.callParent([legend, oldLegend]);
        if (legend) {
            dock = legend.docked;
            this.addDocked({
                dock: dock,
                xtype: 'panel',
                shrinkWrap: true,
                scrollable: true,
                layout: {
                    type: dock === 'top' || dock === 'bottom' ? 'hbox' : 'vbox',
                    pack: 'center'
                },
                items: legend,
                cls: Ext.baseCSSPrefix + 'legend-panel'
            });
        }
    },

    allowSchedule: function() {
        return this.rendered;
    }
});