/**
 * Created by ajitkumar on 22/04/15.
 */
Ext.define('AppsBoard.view.dashboard.parts.InventoryChart', {
    requires: [
        'Ext.chart.CartesianChart'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.inventorychart',

    viewTemplate: {
        layout: 'fit',
        title: 'Inventory',
        header: false,
        items: [{
            xtype: 'cartesian',
            width: 600,
            height: 400,
            innerPadding: '0 10 0 10',
            //background: '#F1495B',
            store: {
                fields: ['name', 'apples', 'oranges'],
                data: [
                    {name: 'Eric', apples: 10, oranges: 3},
                    {name: 'Mary', apples: 7, oranges: 2},
                    {name: 'John', apples: 5,oranges: 2},
                    {name: 'Bob', apples: 2, oranges: 3},
                    {name: 'Joe', apples: 19, oranges: 1},
                    {name: 'Macy', apples: 13, oranges: 4}
                ]
            },
            axes: [{
                type: 'numeric3d',
                position: 'left',
                fields: ['apples', 'oranges'],
                title: {
                    text: 'Inventory',
                    fontSize: 15
                },
                grid: {
                    odd: {
                        fillStyle: 'rgba(255, 255, 255, 0.06)'
                    },
                    even: {
                        fillStyle: 'rgba(0, 0, 0, 0.03)'
                    }
                }
            }, {
                type: 'category3d',
                position: 'bottom',
                title: {
                    text: 'People',
                    fontSize: 15
                },
                fields: 'name'
            }],
            series: {
                type: 'bar3d',
                xField: 'name',
                yField: ['apples', 'oranges']
            }
        }]
    }
});
