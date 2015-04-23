/**
 * Created by ajitkumar on 22/04/15.
 */
Ext.define('AppsBoard.view.dashboard.parts.WebsiteTraffics', {
    requires: [

        'Ext.sparkline.Bar',
        'Ext.Component'
    ],
    extend: 'Ext.dashboard.Part',
    alias: 'part.websitetraffic',

    viewTemplate: {
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        header: false,
        draggable: false,
        resizable: false,
        bodyCls: 'cyanbg',
        items: [{
            xtype: 'sparklinebar',
            barColor: '#FFFFFF',
            margin: 20,
            height: 50,
            width: 90,
            values: [2, 4, 6, -3, 7, 10, 3, 5, 9, 2, 4, 6, -3, 7, 10, 3, 5, 9]
        }, {
            xtype: 'component',
            flex: 1,
            //align: 'stretch',
            html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Website Traffics</small><span class="bigtext">987,459</span></div>'
        }]
    }
});