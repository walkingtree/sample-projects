Ext.define('CustomSenchaCharts.series.WilliamPctR', {
    extend: 'Ext.chart.series.Cartesian',
    alias: 'series.williampctr',
    seriesType: 'williampctr',  //sprite type for this series

    config: {
        /*
         * Overbought level. Defaults to -20
         */
        overboughtLevel: -20,
        /*
         * Oversold level. Defaults to -80
         */
        oversoldLevel: -80,
        /*
         * Data field containing the high value. Defaults to "high"
         */
        highField: "high",
        /*
         * Data field containing the low value. Defaults to "low"
         */
        lowField: "low",
        /*
         * Data field containing the close value. Defaults to "close"
         */
        closeField: "close",
        /*
         * Look-back period (in days) to calculate William %R. Defaults to 14 days
         */
        lookBackPeriod: 14
    },

    /*
     * Creats a William %R series
     * @param {Object} [config] Configuration
     */
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
            var maxHigh = Ext.Array.max(Ext.Array.slice(highs, index - lpPeriod, index + 1));

            //get lowest low of last 14 days
            var minHigh = Ext.Array.min(Ext.Array.slice(lows, index - lpPeriod, index + 1));

            //calculate %R and set it on the record
            var pctr = ((maxHigh - item.data[config.closeField])/(maxHigh - minHigh)) * -100
            item.data.pctr = pctr;
        });

        this.callParent(arguments);
    },

    /**
     * @private Override {@link Ext.chart.series.Series#getDefaultSpriteConfig}
     * It gets the cartesian series config by calling the parent and then applies
     * the William %R specific configs so that they are available to the WilliamPctR
     * series
     * @return {Object} sprite config object
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