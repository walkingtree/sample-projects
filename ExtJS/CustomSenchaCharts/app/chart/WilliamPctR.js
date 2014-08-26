Ext.define("CustomSenchaCharts.chart.WilliamPctR", {
    extend: 'Ext.chart.CartesianChart',
    requires: ['CustomSenchaCharts.series.WilliamPctR', 'CustomSenchaCharts.sprite.WilliamPctR'],
    xtype: 'williampctrchart',

    initConfig: function(config) {

        var series = config.series[0];
        var obLevel = series.overboughtLevel;
        var osLevel = series.oversoldLevel;

        Ext.Array.each(config.axes, function(axis, index, recs) {
            if (axis.type === 'numeric') {
                Ext.apply(axis, {
                    fields: ['pctr'],
                    maximum: 0,
                    minimum: -100,
                    renderer: function (value, layoutContext, lastValue) {
                        if (value == osLevel || value == -50 || value == obLevel){
                            return value;
                        } else {
                            return "";
                        }
                    }
                });
            }
        });

        this.callParent(arguments);
    }
});
