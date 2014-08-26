/**
 * Class to test William %R chart
 */
Ext.define("CustomSenchaCharts.view.test.WilliamPctR", {
    extend: 'Ext.Panel',
    requires: [
        'CustomSenchaCharts.view.test.CandleStick',
        'Ext.chart.axis.Time',
        'Ext.chart.axis.Numeric',
        'Ext.chart.series.Line',
        'CustomSenchaCharts.chart.WilliamPctR',
        'CustomSenchaCharts.model.Stock', 
        'CustomSenchaCharts.store.Apple'
    ],
    config: {
        items: [
            {
                xtype: 'candlestick-test-chart',
                height: 350,
            },
            {
                xclass: 'CustomSenchaCharts.chart.WilliamPctR',
                height: 250,
                insetPadding: {
                    top: 10,
                    right: 0,
                    left: 0,
                    bottom: 0
                },
                background: 'white',
                series: [
                    {
                        store: Ext.create('CustomSenchaCharts.store.Apple', {}), //'Apple',
                        type: 'williampctr',
                        xField: 'date',
                        yField: 'pctr',
                        highField: "high",
                        lowField: "low",
                        closeField: "close",
                        overboughtLevel: -20,
                        oversoldLevel: -80,
                        lookBackPeriod: 14,  //in days
                        style: {
                            stroke: 'rgba(237,123,43,0.75)',
                            fill: 'rgba(237,123,43,0.1)',
                            miterLimit: 1
                        }
                    }
                ],
                axes: [
                    {
                        type: 'numeric',
                        position: 'left',
                        style: {
                            axisLine: false
                        }
                    },
                    {
                        type: 'time',
                        position: 'bottom',
                        fields: ['date'],
                        style: {
                            strokeStyle: '#666',
                            estStepSize: 150
                        },
                        dateFormat: 'Y',
                        segmenter: {
                            type: 'time',
                            step: {
                                unit: 'y',
                                step: 1
                            }
                        },
                        label: {
                            fontSize: 10,
                            fillStyle: '#666'
                        }
                    }
                ]
            }
        ]
    }
});
