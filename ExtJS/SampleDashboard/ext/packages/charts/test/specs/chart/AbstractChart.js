describe('Ext.chart.AbstractChart', function() {
    it('is defined', function() {
        expect(Ext.chart.AbstractChart).toBeDefined();
    });

    describe('adding and removing series', function() {
        var store = Ext.create('Ext.data.Store', {
                fields: ['x', 'y', 'z'],
                data: [
                    {x: 0, y: 0, z: 0},
                    {x: 1, y: 1, z: 1}
                ]
            }),
            chart;

        beforeEach(function() {
            chart = new Ext.chart.CartesianChart({
                store: store,
                axes: [{
                    position: 'left',
                    type: 'numeric'
                }, {
                    position: 'bottom',
                    type: 'numeric'
                }]
            });
        });

        it('should start with no series', function() {
            expect(chart.getSeries().length).toBe(0);
        });

        it('should add and remove series using setSeries', function() {
            var series;

            chart.setSeries([{
                type: 'line',
                xField: 'x',
                yField: 'y',
                id: 'xySeries'
            }]);
            series = chart.getSeries();

            expect(series.length).toBe(1);
            expect(series[0].getId()).toBe('xySeries');

            chart.setSeries([{
                type: 'line',
                xField: 'x',
                yField: 'z',
                id: 'xzSeries'
            }]);
            series = chart.getSeries();

            expect(series.length).toBe(1);
            expect(series[0].getId()).toBe('xzSeries');
        });

        it('should add series using addSeries', function() {
            var series;

            chart.addSeries([{
                type: 'line',
                xField: 'x',
                yField: 'y',
                id: 'xySeries'
            }]);
            series = chart.getSeries();

            expect(series.length).toBe(1);
            expect(series[0].getId()).toBe('xySeries');

            chart.addSeries({
                type: 'line',
                xField: 'x',
                yField: 'z',
                id: 'xzSeries'
            });
            series = chart.getSeries();

            expect(series.length).toBe(2);
            expect(series[0].getId()).toBe('xySeries');
            expect(series[1].getId()).toBe('xzSeries');
        });

        it('should remove series using removeSeries', function() {
            var series;

            chart.addSeries([{
                type: 'line',
                xField: 'x',
                yField: 'y',
                id: 'xySeries'
            }, {
                type: 'line',
                xField: 'x',
                yField: 'z',
                id: 'xzSeries'
            }]);
            series = chart.getSeries();

            expect(series.length).toBe(2);
            expect(series[0].getId()).toBe('xySeries');
            expect(series[1].getId()).toBe('xzSeries');

            // Remove Series id "xySeries", should leave only "xzSeries"
            chart.removeSeries('xySeries');
            series = chart.getSeries();
            expect(series.length).toBe(1);
            expect(series[0].getId()).toBe('xzSeries');

            // Remove a Series by specifying the instance should leav no Series
            chart.removeSeries(series[0]);
            expect(chart.getSeries().length).toBe(0);
        });
    });
});
