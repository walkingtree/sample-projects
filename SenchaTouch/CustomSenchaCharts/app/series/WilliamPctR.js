Ext.define('CustomSenchaCharts.series.WilliamPctR', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.williampctr',
    type: 'williampctr',
    seriesType: 'williamSeries',

    config: {

        overboughtLevel: -20,
        oversoldLevel: -80,
        highField: "high",
        lowField: "low",
        closeField: "close",
        lookBackPeriod: 14
    },

    constructor: function (config) {

        var me = this;

        var st = Ext.data.StoreManager.lookup(config.store);
        var recs = st.getRange();
        var highs = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.highField);
        var lows = Ext.Array.pluck(Ext.Array.pluck(recs, "data"), config.lowField);

        var lpPeriod = config.lookBackPeriod - 1;

        st.each(function (item, index, length) {
            if (index < lpPeriod) {
                item["pctr"] = "";
                return;
            }

            //get highest high of last 14 days
            var max14High = Ext.Array.max(Ext.Array.slice(highs, index - lpPeriod, index + 1));

            //get lowest low of last 14 days
            var min14High = Ext.Array.min(Ext.Array.slice(lows, index - lpPeriod, index + 1));

            //calculate %R and set it on the record
            var pctr = ((max14High - item.data[config.closeField])/(max14High - min14High)) * -100
            item.data.pctr = pctr;
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     */
    getDefaultSpriteConfig: function () {
        var me = this,
            parentStyleConfig = me.callParent(arguments);

        return Ext.apply(parentStyleConfig, {
            overboughtLevel: me.config.overboughtLevel,
            oversoldLevel: me.config.oversoldLevel,
            lookBackPeriod: me.config.lookBackPeriod
        });
    }

});