/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('EA.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'EA.view.main.MainController',
        'EA.view.main.MainModel',
        'EA.view.main.List'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 20,
        tabConfig: {
            plugins: 'responsive',
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Home',
        iconCls: 'fa-home',
        layout:'fit',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'mainlist'
        }]
    }, {
        title: 'D3 SVG Diagram',
        iconCls: 'fa-users',
        layout:'fit',
        items:[
          {
            xtype:'d3-svg',
            listeners:{
              scenesetup:function(comp,scene){

                var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                colors = d3.scale.category20(),
                twoPi = 2 * Math.PI,
                gap = twoPi / data.length,
                r = 100;

            scene.append('g')
                .attr('transform', 'translate(150,150)')
                .selectAll('circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('fill', function (d) {
                    return colors(d);
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 3)
                .attr('r', function (d) {
                    return d * 3;
                })
                .attr('cx', function (d, i) {
                    return r * Math.cos(gap * i);
                })
                .attr('cy', function (d, i) {
                    return r * Math.sin(gap * i);
                }).attr('rx', function (d, i) {
                    return r * Math.cos(gap * i)-d;
                })
                .attr('ry', function (d, i) {
                    return r * Math.sin(gap * i)-d;
                });

              }
            }
          }
        ]
    }, {
        title: 'D3 canvas Diagram',
        iconCls: 'fa-cog',
        layout:'fit',
        items:[{
          xtype: 'd3-canvas',
          listeners:{
            sceneresize: function (component, canvas, size) {

            var barCount = 10,
                barWidth = size.width / barCount,
                barHeight = size.height,
                context = canvas.getContext('2d'),
                colors = d3.scale.category20(),
                i = 0;

            for (; i < barCount; i++) {
                context.fillStyle = colors(i);
                context.fillRect(i * barWidth, 0, barWidth, barHeight);
            }
        }
          }
        }]
    }, {
        title: 'Settings',
        iconCls: 'fa-cog',
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
